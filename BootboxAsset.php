<?php

/**
 * Nozzha Ajaxy 0.2-alpha
 * 
 * @link https://github.com/EmadOmar/nozzha-ajaxy/
 * @author Emad Omar <emad2030@gmail.com>
 * @license https://github.com/EmadOmar/nozzha-ajaxy/blob/master/LICENSE The MIT License (MIT)
 */

namespace nozzha\ajaxy;

/**
 * Asset bundle for the Bootbox javascript files.
 * 
 * @author Emad Omar <emad2030@gmail.com>
 * @since 1.0
 */
class BootboxAsset extends \yii\web\AssetBundle {

    public $sourcePath = '@bower/bootbox';
    public $js = [
        'bootbox.js',
    ];
    public $depends = [
        'yii\bootstrap\BootstrapPluginAsset',
    ];

}
