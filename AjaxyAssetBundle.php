<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace nozzha\ajaxy;

use yii\web\View;

class AssetBundle extends \yii\web\AssetBundle {

    public $sourcePath = '@vendor/nozzha/nozzha-ajaxy/';
    public $css = [];
    public $js = [
        'ext/bootbox_v4.3.0/js/bootbox.min.js',
        'js/nozzha-ajaxy.js'
    ];
    public $depends = [
        'yii\web\JqueryAsset',
        'yii\bootstrap\BootstrapAsset',
        'yii\bootstrap\BootstrapPluginAsset',
    ];
    public $jsOptions = [
        'position' => View::POS_END,
    ];
    public $publishOptions = [
        'forceCopy' => true
    ];

}
