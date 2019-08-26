#Custom Elements vs Behaviours

If you want to introduce custom features to a existing element you have two main patters to do so.

1. Custom elements 
1. Creating a behaviour

It can get fuzzy as to when should you use custom elements and when a behaviour.

## Custom element

```html
<ul as="menu">

</ul>
```

### Pros

1. This is part of of the web components standard
1. Easy to use

### Cons

1. You must target the correct element type
1. You can only have one customization on the element this way 

## Custom behaviour

```html
<ul behaviour.menu="items,articles,title,handleMenuClick">
</ul>
```

### Pros

1. You don't need to target a specific element type.
1. You can define as many customizations on a element as you need.
1. Easy to use

### Cons

1. This is not part of the w3c standards
1. You need to implement your own custom implementation to use it if your binding engine does not support it.
