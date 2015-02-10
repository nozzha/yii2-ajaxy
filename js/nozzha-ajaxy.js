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
     * @param {json} params parameters to be send with the get query
     * @param {function} callback called after submiting the form
     *  or canceling the dialog
     * @returns {this}
     */
    $nozzha.ajaxy.showFormDialog = function (url, _options) {
        $nozzha.ajaxy.options = $.extend({
            dialog: function (result) {
                $nozzha.ajaxy.dialog = bootbox.dialog({
                    message: result,
                    onEscape: function () {
                        $nozzha.ajaxy.options.result(null, false, -1);
                    }
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