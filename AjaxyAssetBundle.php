<?php

/**
 * @link https://github.com/EmadOmar/nozzha-ajaxy/
 * @author Emad Omar <emad2030@gmail.com>
 * @license https://github.com/EmadOmar/nozzha-ajaxy/blob/master/LICENSE The MIT License (MIT)
 */

namespace nozzha\ajaxy;

use yii\web\View;

/**
 * TODO document this class (overview)
 * @since 0.1
 */
class AjaxyAssetBundle extends \yii\web\AssetBundle {

    public $sourcePath = '@vendor/nozzha/nozzha-ajaxy/';
    public $css = [];
    public $js = [
        // FIXME should be added as a dependency instead
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
