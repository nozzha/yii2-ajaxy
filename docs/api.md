# Yii2 Ajaxy 2.0

## Ajaxy PHP API

### \nozzha\ajaxy\Ajaxy

#### `attachTo()`

Attaches a `submit` event listener to the form when the view is requested by an Ajaxy request.

```php
void form( $view, $formId )
```

<table width="100%">
    <tr>
        <td width="120px" valign="top"><code>$view</code></td>
        <td valign="top"><a href="http://www.yiiframework.com/doc-2.0/yii-web-view.html">\yii\web\View</a></td>	
        <td valign="top">The view to be registered with</td>	
    </tr>
    <tr>
        <td width="120px" valign="top"><code>$formId</code></td>
        <td valign="top"><a href="http://www.php.net/language.types.string">string</a></td>	
        <td valign="top">The form id of the view</td>	
    </tr>
</table>

#### `isAjaxy()`

Checks whether the current request is an Ajaxy request.

```php
boolean isAjaxy( )
```

<table width="100%">
    <tr>
        <td width="120px" valign="top"><b>return</b></td>
        <td valign="top"><a href="http://www.php.net/language.types.boolean">boolean</a></td>	
        <td valign="top">Whether the current request is an Ajaxy request</td>	
    </tr>
</table>

#### `isSubmitted()`

Checks whether the Ajaxy request is submitted.

```php
boolean isSubmitted( )
```

<table width="100%">
    <tr>
        <td width="120px" valign="top"><b>return</b></td>
        <td valign="top"><a href="http://www.php.net/language.types.boolean">boolean</a></td>	
        <td valign="top">Whether the Ajaxy request is submitted</td>	
    </tr>
</table>

#### `registerAssets()`

Registers the asset bundle of Ajaxy with a view.

```php
void registerAssets( $view )
```

<table width="100%">
    <tr>
        <td width="120px" valign="top"><code>$view</code></td>
        <td valign="top"><a href="http://www.yiiframework.com/doc-2.0/yii-web-view.html">\yii\web\View</a></td>	
        <td valign="top">The view to be registered with</td>	
    </tr>
</table>

#### `response()`

Prepares a response to return to the Ajaxy ajax request.

```php
array response( $status, $data = [], $jsonFormat = true )
```

<table width="100%">
    <tr>
        <td width="120px" valign="top"><code>$status</code></td>
        <td valign="top"><a href="http://www.php.net/language.types.boolean">boolean</a></td>	
        <td valign="top">Whether the operation has succeeded</td>	
    </tr>
    <tr>
        <td width="120px" valign="top"><code>$data</code><br><i><small>[Optional]</small></i></td>
        <td valign="top">mixed</td>	
        <td valign="top">The response data that you want to return</td>	
    </tr>
    <tr>
        <td width="120px" valign="top"><code>$jsonFormat</code><br><i><small>[Optional]</small></i></td>
        <td valign="top"><a href="http://www.php.net/language.types.boolean">boolean</a></td>	
        <td valign="top">Whether to change the application response format to JSON format</td>	
    </tr>
    <tr>
        <td width="120px" valign="top"><b>return</b></td>
        <td valign="top"><a href="http://www.php.net/language.types.array">array</a></td>	
        <td valign="top">The prepared Ajaxy ajax response</td>	
    </tr>
</table>


## Ajaxy JavaScript 

### `$ajaxy.attachTo()`

Prepares a response to return to the Ajaxy ajax request.

```js
void $ajaxy.attachTo( jQuery $form, String _boxId )
```

<table width="100%">
    <tr>
        <td width="120px" valign="top"><code>$view</code></td>
        <td valign="top"><a href="http://www.yiiframework.com/doc-2.0/yii-web-view.html">\yii\web\View</a></td>	
        <td valign="top">The view to be registered with</td>	
    </tr>
</table>

### `$ajaxy.showModalForm()`



## Ajaxy JavaScript 

### `$ajaxy.attachTo()`

Attaches an Ajaxy box to a form. Note: This method is usually called by the PHP Ajaxy class.

```js
void $ajaxy.attachTo( jQuery $form, String _boxId )
```

<table width="100%">
    <tr>
        <td width="120px" valign="top"><code>$form</code></td>
        <td valign="top"><a href="https://jquery.com/">jQuery</a></td>	
        <td valign="top">A jQuery object that repersents a form.</td>	
    </tr>
    <tr>
        <td width="120px" valign="top"><code>_boxId</code></td>
        <td valign="top"><a href="https://developer.mozilla.org/en-US/docs/Glossary/String">String</a></td>	
        <td valign="top">The Ajaxy box Id that was sent to the server when the view was requested from the server.</td>	
    </tr>
</table>

### `$ajaxy.showModalForm()`

Displays a Modal box of a Yii2 action (which is specified by the `url` option).

```js
void $ajaxy.showModalForm( Options _options )
```

<table width="100%">
    <tr>
        <td width="120px" valign="top"><code>_options</code></td>
        <td valign="top"><a href="#">Options</a></td>	
        <td valign="top">Ajaxy options, url and callbacks.</td>	
    </tr>
</table>

### `$ajaxy.translate()`

Translates the phrases of the dialog.

```js
void $ajaxy.translate( _phrase _phrases )
```

<table width="100%">
    <tr>
        <td width="120px" valign="top"><code>_phrases</code></td>
        <td valign="top"><a href="#">_phrase</a></td>	
        <td valign="top">The phrases that you want to translate.</td>	
    </tr>
</table>
