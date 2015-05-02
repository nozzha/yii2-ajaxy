/**
 * Nozzha Ajaxy 2.0
 * 
 * @link https://github.com/nozzha/nozzha-ajaxy/
 * @copyright (c) 2014, Nozzha (nozzha.com)
 * @license https://github.com/nozzha/nozzha-ajaxy/blob/master/LICENSE The MIT License (MIT)
 */

/* global bootbox */

/**
 * Declaring `$ajaxy` as a global variable
 * 
 * @param {this} global The global `this`
 * @param {_ajaxy} _ajaxy The Ajaxy initial method that returns the Ajaxy object
 */
(function (global, _ajaxy) {

    'use strict';

    // To avoid recreating the object, which will empty some important
    // private objects such as `_boxes`
    if (!!global.$ajaxy) {
        return;
    }

    // Register a browser global
    global.$ajaxy = _ajaxy(jQuery);

})(this, function ($) {

    'use strict';

    /**
     * The Ajaxy object
     * 
     * @type $ajaxy
     */
    var _ajaxy = {};

    /**
     * Boxes holder.
     * A box stores the options, callbacks and the id of each created Modal Form box,
     * which is created when calling `$ajaxy.showFormModal` method.
     * Each box is stored (with its options) to be able to retrieve it's information,
     * by its attached form.
     * 
     * @type Array
     */
    var _boxes = [];

    /**
     * Default options object
     * 
     * @type Options
     */
    var Options = {
        /**
         * The full url to the controller action
         * 
         * @type String
         */
        url: '',
        /**
         * Some data to send to the server when requesting the view of the action.
         * This can be used to fill some inputs with initial data.
         * 
         * @type object
         */
        data: {},
        /**
         * Whether to focus the first input of the form after displaying the modal box.
         * 
         * @type boolean
         */
        autoFocus: true,
        onCreateView: _onCreateView,
        onError: _onError,
        onProgress: _onProgress,
        onResult: _onResult
    };

    /**
     * The phrases that are used in the dialogs (modal boxes)
     * 
     * @type object
     */
    var _phrase = {
        loading: 'Loading...',
        submitting: 'Submitting...',
        errorTitle: 'Something went wrong!',
        errorMessage: 'Please check your internet connection or contact support.',
        successTitle: 'Done!',
        successMessage: 'The form was submitted successfully!',
        close: 'Close',
        ok: 'Ok'
    };

    // --|| API Public Methods || ----

    /**
     * Attaches an Ajaxy box to a form.
     * Note: This method is usually called by the PHP Ajaxy class.
     * 
     * Example:
     * 
     *      $ajaxy.attachTo(jQuery('#formId'), '_ajx');
     *  
     *  or by using the Ajaxy PHP API that is provided as a Yii2 extension:
     *  
     *      <?php
     *      $form = ActiveForm::begin([ 'id' => 'formId', ... ]);
     *      ActiveForm::end();
     *      Ajaxy::attachTo($view, $form);
     *      ?>
     * 
     * @param {$} $form A jQuery object that repersents a form.
     * @param {String} _boxId The Ajaxy box Id that was sent to the server when
     *  the view was requested from the server.
     */
    _ajaxy.attachTo = function ($form, _boxId) {
        $form.on('submit', function (e) {
            var box = _getBox(_boxId);
            var data = $form.serializeArray();

            // Hides the view modal dialog so no changes
            // can be applied to the form
            box._viewDialog.modal('hide');

            var progressModal = box.onProgress(2);

            // Adding this field helps the server detect that this is a submit
            // request made by Ajaxy
            data.push({name: '_nozzhaAjaxySubmit', value: true});

            $.post($form.attr('action'), data).done(function (result) {
                progressModal.modal('hide');
                _afterSubmit(box, true, result);
            }).fail(function () {
                progressModal.modal('hide');
                _afterSubmit(box, false, null);
            });

            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        });
    };

    /**
     * Displays a Modal box of a Yii2 action (which is specified by the `url` option).
     * 
     * Example:
     * 
     *      $ajaxy.showModalForm({
     *          url: 'example.com/controller/action',
     *          data: {
     *              User : { displayName : 'User Name' },
     *          },
     *          onResult: function(result) {
     *              console.log(result);
     *          }
     *      });
     * 
     * @param {Options} _options Ajaxy options, url and callbacks.
     */
    _ajaxy.showModalForm = function (_options) {
        // Gets a copy of the defaul options
        var options = $.extend({}, Options);

        // Merge the options with the default options
        $.extend(options, _options);

        var _boxId = _addBox(options);

        // Adding this field helps the server detect that this is a
        // request made by Ajaxy.
        options.data._nozzhaAjaxy = true;
        // And this to tell the server what is it's Ajaxy box id
        // so it can attach the form with it.
        options.data._nozzhaAjaxyId = _boxId;

        var progressModal = options.onProgress(1);

        $.get(options.url, options.data).done(function (result) {
            progressModal.modal('hide');
            options.onCreateView(result, _boxId);
        }).fail(function () {
            progressModal.modal('hide');
            options.onError(1);
        });
    };

    /**
     * Translates the phrases of the dialog
     * 
     * @param {_phrase} _phrases The phrases that you want to translate.
     */
    _ajaxy.translate = function (_phrases) {
        $.extend(_phrase, _phrases);
    };

    // --|| Default Callbacks || ----

    /**
     * Called after receiving the content of the action view. So it can be
     * rendered and displayed to the user.
     * 
     * @param {String} result The content of the view that was received from the server
     * @param {String} _boxId The id of the created modal box.
     */
    function _onCreateView(result, _boxId) {
        var options = _getBox(_boxId);

        options._viewDialog = bootbox.dialog({
            message: result,
            onEscape: function () {
                options.onError(3);
            }
        });

        if (!options.autoFocus) {
            return;
        }

        // FIXME this should be a local variable and should has no global access
        options._viewDialog.bind('shown.bs.modal', function () {
            // Gets the first input element in the dialog
            var element = options._viewDialog.find('input:text, textarea').first();

            // Checks whether an input exists
            if (!!element.length) {
                // Focuses the element
                element.focus();
                // Resets the caret at the end of the text
                element.val(element.val());
            }
        });
    }

    /**
     * Called when an error occurred while requesting the view from the server,
     * submitting the form, the received `status` property from the server is false
     * or when the user closes the view modal box.
     * 
     * @param {Number} code The type of the error
     *  1: The error occurred while requesting the view from the server,
     *  2: The error occurred while submitting the form to the server,
     *  3: The user has closed the modal box of the view.
     *  4: The received `status` property from the server is false.
     * @returns {bootbox}
     */
    function _onError(code) {
        // Checks whether this error created when the user has closed the dialog
        if (code === 3) {
            // No need to display the error message as the user is who canceled it
            return;
        }

        var options = {
            title: '<span class="text-danger">' + _phrase.errorTitle + '</span>',
            message: _phrase.errorMessage + ' (error-' + code + ')',
            buttons: {close: {label: _phrase.close, className: 'btn-warning'}}
        };

        return bootbox.dialog(options);
    }

    /**
     * Called before requesting the view and before submitting
     * the form to indicate a background process (The ajax request)
     * 
     * @param {Number} type of the progress dialog
     *  1: Requesting the view
     *  2: Submitting the form
     *  
     * @returns {bootbox}
     */
    function _onProgress(type) {
        var title = type === 1 ? _phrase.loading : _phrase.submitting;
        var _class = type === 1 ? 'warning' : 'info';

        return bootbox.dialog({
            title: title,
            message: '<div class="progress progress-striped active" style="margin-bottom:0;">' +
                    '<div class="progress-bar progress-bar-' + _class + '" style="width: 100%"></div>' + '</div>',
            closeButton: false
        });
    }

    /**
     * Called after submiting the form and after receiving the result from the server
     * 
     * @param {object} result The result returned from the server after submitting the form
     * @param {String} _boxId The box id provided by the server (That was sent when the view was requested)
     * @returns {bootbox}
     */
    function _onResult(result, _boxId) {
        // Checks the status returned by the server
        if (!result.status) {
            return _getBox(_boxId).onError(4);
        }

        var options = {
            title: '<span class="text-success">' + _phrase.successTitle + '</span>',
            message: _phrase.successMessage,
            buttons: {ok: {label: _phrase.ok, className: 'btn-success'}}
        };

        return bootbox.dialog(options);
    }

    // --|| Private Methods || ----

    /**
     * Invokes one of the result callback methods depending on the status
     * if the form was submitted successfuly, then it will call the onResult
     * callback function, otherwise it will call the onError callback function.
     * 
     * @param {Options} box The box object that holds the options of the modal.
     * @param {Number} status Whether the form was submitted successfully.
     * @param {object} result The result returned by the server after submitting
     * the form.
     * @returns {undefined}
     */
    function _afterSubmit(box, status, result) {
        if (status) {
            box.onResult(result, box._id);
        } else {
            box.onError(2);
        }

        // Removes the box as it will no longer be used, as Ajaxy creates
        // a new box if the user requested the dialog to be shown again
        _removeBox(box._id);
    }

    /**
     * Stores the provided box to the `boxes` array,
     * and generates a unique id for it.
     * 
     * @param {Options} options The options of the modal box.
     * @returns {String} The generated id for the box.
     */
    function _addBox(options) {
        // The allowed chars in id
        var chars = 'ABCDEFGHIJKLMnopqrstuvwxyz0123456789',
                // The generated id
                id = '_',
                // The length of the id
                length = 3;

        for (var i = 0; i < length; i++) {
            var randInt = Math.floor(Math.random() * chars.length);
            id += chars.charAt(randInt);
        }

        // Checks whether the id already exists,
        // if so then call the function again to regenerate another id
        if (id in _boxes) {
            return _addBox(options);
        }


        _boxes[id] = options;

        // storesa a copy of the box's id too
        _boxes[id]._id = id;

        return id;
    }

    /**
     * Retrieves a stored box by the provided id
     *  
     * @param {String} _boxId The id of the box to be retrieved
     * @returns {Options} The retrieved box
     * @throws {Error} If there is no box found with the provided id
     */
    function _getBox(_boxId) {
        if (!(_boxId in _boxes)) {
            throw new Error('_boxId(' + _boxId + ') does not exist');
        }

        return _boxes[_boxId];
    }


    /**
     * Removes a box if exist
     *  
     * @param {String} _boxId The id of the box to be removed
     */
    function _removeBox(_boxId) {
        for (var id in _boxes) {
            if (id === _boxId) {
                _boxes.splice(id, 1);
                break;
            }
        }
    }

    return _ajaxy;

});