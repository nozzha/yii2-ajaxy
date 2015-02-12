/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var $nozzha = {
    ajaxy: {}
};

(function ($) {
    /**
     * 
     * @param {string} url
     * @param {object} _options
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
}(jQuery));