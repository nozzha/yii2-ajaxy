Yii2 - Nozzha Ajaxy
===================
Yii2 - Nozzha Ajaxy

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require --prefer-dist nozzha/nozzha-ajaxy "*"
```

or add

```
"nozzha/nozzha-ajaxy": "*"
```

to the require section of your `composer.json` file.


Usage
-----

Firstly you should not forget:

```php
<?php
use nozzha\ajaxy\Ajaxy;
?>
```

Start by registering the the AssetBundle in the action that you want to use Ajaxy in.
For example in a 'index.php' action:

```php
 public function actionIndex() {
    Ajaxy::registerAssets($this->getView());

    return $this->render('index');
}
```

In the create/update action you should do the following:

```php
public function actionCreate() {
    $model = new SomeModel();

    // Loading the model data
    // @var boolean $posted checks whether the model data have been sent
    $posted = $model->load(Yii::$app->request->post());

    if ($posted && Yii::$app->request->isAjax) {
        Yii::$app->response->format = Response::FORMAT_JSON;

        if ($model->validate() && Ajaxy::isSubmited()) {
            $model->save();

            // Some data to return to the js callback function
            $data = ['id' => $model->ID, 'name' => $model->name];
            return Ajaxy::response(true, $data);
        }

        // You would uncomment the following code if you set `enableAjaxValidation` to `true` in your `ActiveForm`
        //return ActiveForm::validate($model);
    }

    /**
     * Your normall Yii2 code
     */
    if ($posted && $model->save()) {
        return $this->redirect(['view', 'id' => $model->ID]);
    } else {
        // To return the form to be put in the modal
        if (Ajaxy::isAjaxy()) {
            return $this->renderAjax('create', ['model' => $model]);
        }

        return $this->render('create', ['model' => $model]);
    }
}
```

You should also consider calling the `Ajaxy::form()` function in the `_form` view.
To allow sending the form via Ajax and to call the js `callback` function after sending the form.

```php
<?php
$form = ActiveForm::begin([
    'enableAjaxValidation' => true, // Is up to you
    'id' => $model->formName(), // You need to set the id of the form
    'action' => ['create'] // Recommended
]);
?>
...
<?php ActiveForm::end(); ?>
<?php Ajaxy::form($this, $form->id); ?>
```

Now the only thing left is to call the `showFormDialog` js function in the `index.php` action

From the global js, you should be able to call:

```js
$nozzha.ajaxy.showFormDialog(url, _options);
```