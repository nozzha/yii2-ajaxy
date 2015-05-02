Nozzha Ajaxy 2.0: Actions Dialog via Ajax for Yii 2
===========================================

Nozzha Ajaxy is a [Yii 2.0](http://www.yiiframework.com/) extension that provides
a simple API to show an action via a dialog box in the page using the Bootstrap plugin [Bootbox](http://bootboxjs.com/).

Ajaxy was designed to display either a create or an update actions dialog box.
In other words, an action that has a single form.

> *Note:* Ajaxy was not tested with actions that does not have a form like a `view` or `index` action.

For license information check the [LICENSE](LICENSE.md)-file.

[![Latest Stable Version](https://poser.pugx.org/nozzha/yii2-ajaxy/v/stable)](https://packagist.org/packages/nozzha/yii2-ajaxy)
[![Total Downloads](https://poser.pugx.org/nozzha/yii2-ajaxy/downloads)](https://packagist.org/packages/nozzha/yii2-ajaxy)
[![Latest Unstable Version](https://poser.pugx.org/nozzha/yii2-ajaxy/v/unstable)](https://packagist.org/packages/nozzha/yii2-ajaxy)
[![License](https://poser.pugx.org/nozzha/yii2-ajaxy/license)](https://packagist.org/packages/nozzha/yii2-ajaxy)

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require --prefer-dist nozzha/yii2-ajaxy
```

or add

```json
"nozzha/yii2-ajaxy": "~1.0"
```

to the require section of your composer.json.


Usage
-----

There are two steps for using Ajaxy

### 1. Handle Ajaxy requests
    
#### 1.1. Preparing the View

For Ajaxy to display the dialog box of the requested action, it will need
to request for the view content first, and to retrieve the view at the proper time and request

You'll first use `Ajaxy::isAjaxy()` to check if this is an Ajaxy request that
asks for the view content, and then return the content using [`Controller::renderAjax()`](http://www.yiiframework.com/doc-2.0/yii-web-controller.html#renderAjax()-detail).

Example:

in the controller

```php
if (Ajaxy::isAjaxy()) {
    return $this->renderAjax('create', $params);
}
```

and in the view (in our example `create.php`) attach Ajaxy to the form using
`Ajaxy::attachTo($view, $activeForm)`

> *Note:* You should set an id for the form to avoid duplicate ids when requesting the view via Ajax

Example:

```
<?php
$form = ActiveForm::begin([
    'enableAjaxValidation' => true, // Is up to you
    'id' => $model->formName(), // You need to set an id for the form
    'action' => ['create'] // Recommended
]);
?>
...
<?php ActiveForm::end(); ?>
<?php Ajaxy::attachTo($this, $form); ?>
```

#### 1.2. Handle the submitted form and return the response

When the submits the form, Ajaxy will post it via `ajax` to the specified `action`,
and you may need to handle this request differently to return the proper response.

Ajaxy provides to methods to do so, `Ajaxy::isSubmitted()` that checks whether
the Ajaxy form has submitted. And `Ajaxy::response()` that prepares a response for
the Ajaxy request.

Example:

```php
if (Ajaxy::isSubmitted()) {
    // Handle model validation create, update or save ...
    return Ajaxy::response($status, $data);
}
```

And now the action is ready to provide it's view and to handle the submitted form.


### 2. Display the Dialog Box

#### 1. Register Ajaxy assets

To link the JavaScript api of Ajaxy register it's asset bundle

```php
Ajaxy::registerAssets($view);
```

#### 2. Show the Dialog

and then in your JavaScript code call `$ajaxy.showModalForm(options)`
to show a dialog box of a view that you want to display

Example:

```js
$ajaxy.showModalForm({
    url: 'http://example.com/controller/action',
    data: {
        User: { displayName: 'User Name' }
    },
    onResult: function (result) {
        console.log(result.data);
        // console.log("Created User #" + result.data.ID); // Example
    }
});
```