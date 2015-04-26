/* 
 * TODO complete the documentation of the API
 */


/* global bootbox */

var $nozzha = {
    ajaxy: {}
};

(function ($) {
    /**
     * Shows a form dialog of a view specified by a url
     * 
     * @param {string} url The full url of the needed view
     * @param {object} _options The options to customize the request
     * and to set a callback
     * @returns {this}
     */
    $nozzha.ajaxy.showFormDialog = function (url, _options) {

        $nozzha.ajaxy.options = $.extend(true, {
            autoFocus: true,
            dialog: function (result) {
                $nozzha.ajaxy.dialog = bootbox.dialog({
                    message: result,
                    onEscape: function () {
                        $nozzha.ajaxy.options.result(null, false, -1);
                    }
                });

                if (!$nozzha.ajaxy.options.autoFocus) {
                    return;
                }

                $nozzha.ajaxy.dialog.bind('shown.bs.modal', function () {
                    // Gets the first input element in the dialog
                    var element = $nozzha.ajaxy.dialog.find("input:text, textarea").first();

                    // Checks whether the element is undefined
                    if (!element.attr('value')) {
                        return;
                    }

                    // Focuses the element
                    element.focus();
                    // Resets the caret at the end of the text
                    element.val(element.val());
                });
            },
            result: function (result, status, code) {

            },
            dialogError: function () {
                bootbox.dialog({
                    title: '<span class="text-danger">Something went wrong!</span>',
                    message: 'An error occurred while proccessing your request. '
                            + 'Please check your internet connection, '
                            + 'and contact us if you think this is an error.',
                    buttons: {
                        close: {
                            label: 'Close',
                            className: 'btn-warning'
                        }
                    }
                });
            },
            data: {
                nozzhaAjaxy: true
            }
        }, _options);

        $.get(url, $nozzha.ajaxy.options.data).done(function (result) {
            $nozzha.ajaxy.options.dialog(result);
        }).fail(function () {
            $nozzha.ajaxy.options.dialogError();
        });

        return this;
    };

    $nozzha.ajaxy.responseCallback = function (status, resp) {
        if (status) {
            $nozzha.ajaxy.dialog.modal('hide');
        }

        $nozzha.ajaxy.options.result(resp, status, status ? 0 : 1);
    };

    /**
     * Attaches a `submit`, and a `beforeSubmit` event listener to the form
     * when the view is requested by an Ajaxy request to handle it by the
     * Ajaxy api
     * 
     * @param {$} $form The form jQuery object
     * @returns {undefined}
     */
    $nozzha.ajaxy.attachToForm = function ($form) {
        $form.on('beforeSubmit', function () {
            var data = $form.serializeArray();

            data.push({name: 'nozzhaAjaxy', value: true});
            data.push({name: 'nozzhaAjaxySubmit', value: true});
            data.push({name: 'newNozzhaAjaxy', value: true});

            $.post($form.attr('action'), data)
                    .done(function (response) {
                        $nozzha.ajaxy.responseCallback(true, response);
                    }).fail(function () {
                $nozzha.ajaxy.responseCallback(false, null);
            });
        }).on('submit', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        });
    };
}(jQuery));