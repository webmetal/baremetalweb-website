# Delegate examples
This is just a example list with short descriptions on delegate syntax.

## Simple delegate
```html
<button click.delegate="doSomething">Do Something</button>
```

```js
const context = {
    doSomething() {
        console.log("Button clicked");    
    }    
}
```

Call the doSomething function on the binding context without any parameters

##  Delegate with event attribute
```html
<button click.delegate="doSomething($event)">Do Something</button>
```

```js
const context = {
    doSomething(event) {
        console.log(event.target.id);    
    }    
}
```
Call the doSomething function on the binding context with the click event as a parameter.

## Delegate with a field value as parameter

```html
<button click.delegate="doSomething(${data.firstName})">Get First Name</button>
```

```js
const context = {
    data: {
        firstName: "Bob"
    },
    
    doSomething(firstName) {
        console.log(firstName);
    }
}
```

The above example uses a expression syntax as a parameter argument.
In these cases it will get the object value on that path and pass it on as the parameter value.

## Delegate with number argument

```html
<button click.delegate="doSomething(5)">Print 5</button>
```

```js 
const context = {
    doSomething(number) {
        console.log(number * number);    
    }    
}
```

In this case we send a number as argument and expect it to be of type Number when getting the parameter value.

## Delegate on a path

```html
<button click.delegate="data.greet('hello world')";
```

```js
const context = {
    data: {
        firstName: "bob"
    },
    
    greet(msg) {
        console.log(`${msg} ${this.firstName}`);
    }
}
```