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

## Ajaxy JavaScript API

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
        <td valign="top"><a href="#ajaxyoptions">Options</a></td>	
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

### `$ajaxy.Options`

The available options in Ajaxy 2.0

<table width="100%">
    <tr>
        <td width="200px" valign="top"><code>url</code></td>
        <td valign="top"><a href="https://developer.mozilla.org/en-US/docs/Glossary/String">String</a></td>	
        <td valign="top">The full url to the controller action</td>	
    </tr>
    <tr>
        <td width="200px" valign="top"><code>data</code></td>
        <td valign="top"><a href="https://developer.mozilla.org/en-US/docs/Glossary/Object">object</a></td>	
        <td valign="top">Some data to send to the server when requesting the view of the action. This can be used to fill some inputs with initial data.</td>	
    </tr>
    <tr>
        <td width="200px" valign="top"><code>autoFocus</code></td>
        <td valign="top"><a href="https://developer.mozilla.org/en-US/docs/Glossary/Boolean">boolean</a></td>	
        <td valign="top">Whether to focus the first input of the form after displaying the modal box. Default: <code>true</code></td>	
    </tr>
    <tr>
        <td width="200px" valign="top"><code>onCreateView</code><br><code>( String result )</code></td>
        <td valign="top"><a href="https://developer.mozilla.org/en-US/docs/Glossary/Function">function</a><br><i><small>[callback]</small></i></td>	
        <td valign="top">Called after receiving the content of the action view. So it can be rendered and displayed to the user.</td>	
    </tr>
    <tr>
        <td width="200px" valign="top"><code>onError</code><br><code>( Number code )</code></td>
        <td valign="top"><a href="https://developer.mozilla.org/en-US/docs/Glossary/Function">function</a><br><i><small>[callback]</small></i></td>	
        <td valign="top">Called when an error occurred while requesting the view from the server, submitting the form, the received `status` property from the server is false or when the user closes the view modal box.</td>	
    </tr>
    <tr>
        <td width="200px" valign="top"><code>onProgress</code><br><code>( Number type )</code></td>
        <td valign="top"><a href="https://developer.mozilla.org/en-US/docs/Glossary/Function">function</a><br><i><small>[callback]</small></i></td>	
        <td valign="top">Called before requesting the view and before submitting the form to indicate a background process (The ajax request).</td>	
    </tr>
    <tr>
        <td width="200px" valign="top"><code>onResult</code><br><code>( Object result )</code></td>
        <td valign="top"><a href="https://developer.mozilla.org/en-US/docs/Glossary/Function">function</a><br><i><small>[callback]</small></i></td>	
        <td valign="top">Called after submiting the form and after receiving the result from the server.</td>	
    </tr>
</table>