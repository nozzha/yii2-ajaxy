# PHP API

## \nozzha\ajaxy\Ajaxy

### `form()`

Attaches a `submit`, and a `beforeSubmit` event listener to the form when the view is requested by an Ajaxy request.

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

### `isAjaxy()`

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

### `isSubmitted()`

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

### `registerAssets()`

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

### `response()`

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