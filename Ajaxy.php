<?php

/**
 * Nozzha Ajaxy 1.0
 * 
 * @link https://github.com/nozzha/nozzha-ajaxy/
 * @copyright (c) 2014, Nozzha (nozzha.com)
 * @license https://github.com/nozzha/nozzha-ajaxy/blob/master/LICENSE The MIT License (MIT)
 */

namespace nozzha\ajaxy;

use Exception;
use Yii;
use yii\web\Request;
use yii\web\Response;
use yii\web\View;
use yii\widgets\ActiveForm;

/**
 * TODO document this class and add a description for it
 * 
 * @author Emad Omar <emad2030@gmail.com>
 * @since 1.0
 */
class Ajaxy extends \yii\base\Object {

    /**
     * Registers the asset bundle of Ajaxy with a view.
     * 
     * @param View $view The view to be registered with
     */
    public static function registerAssets($view) {
        AjaxyAsset::register($view);
    }

    /**
     * Checks whether the current request is an Ajaxy request
     * 
     * @return boolean Whether the current request is an Ajaxy request
     */
    public static function isAjaxy() {
        /* @var $request Request */
        $request = Yii::$app->request;

        if (!$request->isAjax) {
            // If this is not an ajax request then it is not an Ajaxy request
            return false;
        }

        return !!$request->get('_nozzhaAjaxy', false);
    }

    /**
     * Checks whether the Ajaxy request is submitted
     * 
     * @deprecated since version 0.2 Due to the misspelling in the function name -_- . Apologize.
     *      Use `Ajaxy::isSubmitted()` instead
     * @return boolean Whether the Ajaxy request is submitted
     */
    public static function isSubmited() {
        Yii::warning('Use of a deprecated method `Ajaxy::isSubmited()`. Please use `Ajaxy::isSubmitted()` instead.', 'nozzha/nozzha-ajaxy');

        return self::isSubmitted();
    }

    /**
     * Checks whether the Ajaxy request is submitted
     * 
     * @return boolean Whether the Ajaxy request is submitted
     */
    public static function isSubmitted() {
        /* @var $request Request */
        $request = Yii::$app->request;

        if (!$request->isAjax) {
            // If it is not an ajax request then it is not a submitted Ajaxy form
            return false;
        }

        return !!$request->post('_nozzhaAjaxySubmit', false);
    }

    /**
     * Prepares a response to return to the Ajaxy ajax request
     * 
     * @param boolean $status Whether the operation has succeeded
     * @param mixed $data The response data that you want to return
     * @param boolean $jsonFormat Whether to change the application response format to JSON format
     * @return array The prepared Ajaxy ajax response
     */
    public static function response($status, $data = [], $jsonFormat = true) {
        $response = ['status' => $status, 'data' => $data];

        if ($jsonFormat) {
            Yii::$app->response->format = Response::FORMAT_JSON;
        }

        return $response;
    }

    /**
     * Attaches a `submit` event listener to the form
     * when the view is requested by an Ajaxy request
     * 
     * @param View $view The view to be registered with
     * @param ActiveForm $form The target active form
     */
    public static function attachTo($view, ActiveForm $form) {
        if (!self::isAjaxy()) {
            return;
        }

        // The Ajaxy box id
        $id = self::getId();

        $view->registerJs("\$ajaxy.attachTo(\$('form#{$form->id}'), '{$id}');");
    }

    /**
     * Returns the Ajaxy box id that was sent by the Ajaxy JavaScript API
     * when it requested the view
     * 
     * @return string The sent id
     * @throws Exception If no id was found when Ajaxy requested the view
     */
    protected static function getId() {
        /* @var $request Request */
        $request = Yii::$app->request;
        // Ajaxy box id
        $id = $request->get('_nozzhaAjaxyId', null);

        // Checks whether the box id was sent
        if ($id === null) {
            throw new Exception('Callback id of `nozzha/yii2-ajaxy` was not sent with the ajaxy request');
        }

        return $id;
    }

}
