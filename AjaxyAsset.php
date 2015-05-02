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
 * Asset bundle for the Nozzha Ajaxy javascript files.
 * 
 * @author Emad Omar <emad2030@gmail.com>
 * @since 1.0
 */
class AjaxyAsset extends \yii\web\AssetBundle {

    public $sourcePath = '@vendor/nozzha/yii2-ajaxy/';
    public $js = [
        'js/ajaxy.nozzha.js',
    ];
    public $depends = [
        'nozzha\ajaxy\BootboxAsset',
    ];

}
