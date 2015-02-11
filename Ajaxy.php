<?php

namespace nozzha\ajaxy;

use Yii;

class Ajaxy extends \yii\base\Object {

    public static function registerAssets($view) {
        AssetBundle::register($view);
    }

    public static function isAjaxy() {
        if (!Yii::$app->request->isAjax) {
            return false;
        }

        return (boolean) Yii::$app->request->get('nozzhaAjaxy', false);
    }

    public static function isSubmited() {
        if (!Yii::$app->request->isAjax) {
            return false;
        }

        return (boolean) Yii::$app->request->post('nozzhaAjaxySubmit', false);
    }

    public static function response($status, $data = []) {
        return [
            'status' => $status,
            'data' => $data
        ];
    }

    /**
     * 
     * @param \yii\web\View $view
     * @param string $formId
     */
    public static function form($view, $formId) {
        if (!self::isAjaxy()) {
            return;
        }

        $view->registerJs("
            $('form#{$formId}').on('beforeSubmit', function(e) {
                var \$form = $(this);
                var test = \$form.serializeArray();
                test.push({ name: 'nozzhaAjaxySubmit', value : '1' });
                $.post(\$form.attr('action'), test)
                    .done(function(response) {
                        \$nozzha.ajaxy.responseCallback(true, response);
                    }).fail(function(){
                        \$nozzha.ajaxy.responseCallback(false, null);
                    });
                
            }).on('submit', function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            });
        ");
    }

}
