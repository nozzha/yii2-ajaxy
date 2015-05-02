<?php

/**
 * Nozzha Ajaxy 1.0
 * 
 * @link https://github.com/nozzha/nozzha-ajaxy/
 * @copyright (c) 2014, Nozzha (nozzha.com)
 * @license https://github.com/nozzha/nozzha-ajaxy/blob/master/LICENSE The MIT License (MIT)
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
