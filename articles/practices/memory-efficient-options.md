# Memory efficient options

Bitmask is an efficient way to define options.  
It is memory efficient and fast.
Bitmask uses binary to define if an option is (on / present) or not.
Because of it's efficiency bitmasks are often used in graphics pipelines to turn features on and off.  
Other pipelines can also make use bitmasks for the same benefits.  

# Numbering

Bitmasks use geometric sequences numbering for each option.

```js
const options = {
    option1: 1,
    option2: 2,
    option3: 4,
    option4: 8
}
```

You can also define it using hex and binary values.

```js
const options = {
    option1: 0x0001,
    option2: 0x0010,
    option3: 0x0100,
    option4: 0x1000
}
```

or

```js
const options = {
    option1: 0b0001,
    option2: 0b0010,
    option3: 0b0100,
    option4: 0b1000
}
```

## Defining the mask

If you want to create combination mask of the above options, you do so by using the binary "|" operator.

```js
const myOptions = options.option1 | options.option3
```

## Operators

You can use bit operators to check for conditions in the mask you defined.
Most commonly:

1. AND
1. OR
1. XOR
1. NOT

Using bit operators in conditions is not boolean but truthy in javascript.

```js
function doSomething(args) {
    if (args & options.option1) {
        ...
    }
}
```

You can also use it with other boolean operators.

```js
function doSomething(args) {
    return true && args & options.option1;
}
```

You can read more about it on:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators

## Common usage

You may be in a situation where you have a number of boolean values as parameters or properties.
To make this more efficient you can instead have one bitmask.
This makes the length of code needed less and still allow a great deal of flexibility.
