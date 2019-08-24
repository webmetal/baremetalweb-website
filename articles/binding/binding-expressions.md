# Binding

For this context of this article and for that matter this site, biding refers to combining data and UI in a meaningful way.
There are a number of binding expressions we will use:

1. inflate - copy the data values into the ui target once, no updates
1. bind - trigger based updated when values change
1. delegate - execute a function on the defined path
1. condition - set attribute, class and style values based on data conditions

The bind and inflate operations are often used on an attribute.

```html
<my-element attr1.bind="data.field1" attr2.inflate="data.field2"></my-element> 
```

You can use binding and inflation on the innerText also.

###Bind expression:

```html
<div>${data.field1}</div>
```

###Inflate expression:

```html
<div>#data.field1</div>
```

As part of binding you will use one of the following:

1. path
1. expression

A path is the location of the data relevant for the binding relative the the binding context.
A expression is a composite between data and text. See the expression part for more detail.

## Expressions

Expressions follow the string literal syntax "${}".  
They can be part of an inflate or bind operation.  
The expressions between the ${} define where to get data.
It can also define any operations you want to perform.

```html
<div>${data.firstName} - ${data.lastName}</div>
<div>Total: ${data.value1 +  data.value2}</div>
<div>#data.firstName</div>
```

The above examples represent:

1. Binding that will result in "FirstNameValue - LastNameValue"
1. Binding that will result in "Total: NumberValue"
1. Inflate that will result in "FirstNameValue"

Expressions can contain javascript functions.

```html
<div>${data.firstName.substring(0, 2)}</div>
```

## Inflate

Some people call this a once only binding.

Inflate is the simples of the operations.
When the binding is initialized the values are coped from the the inflate path to the target html.
Once this happens nothing else changes.
If the value changes the UI will not be updated.

## Bind

Binding is more expensive as observers are set up.
If the data changes the UI is updated to represent those changes.
If the binding is a expression, the full expression is rebuild.
Bind operations on HTMLInputElements will update the data with the new values. 
State is by default not maintained.
If you did want to maintain state, you need to use a dataset as your data structure.
The dataset class has build in features to allow state management.

## Delegate

A delegate binds a event to an function on the context or path starting with the context.
There are a number of different delegate expressions you can use to pass data to an event callback.

```html
<button click.delegate="doClick"></button>
<button click.delegate="doClick($event)"></button>
<button click.delegate="doClick('a', 'b')"></button>
<button click.delegate="doClick(${data.field1})"></button>
```

The above examples represent calling a function doClick on the context:

1. Standard, no parameters
1. Standard, with ClickEvent as parameter
1. With hardcoded parameters
1. With expression parameters