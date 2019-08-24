# Convention over code

## Introduction
This is a coding strategy that has a lot of benefits too it and should be strongly considered by anyone writing code regardless of platform.
Some of it's benefits include:

1. Writing less code
1. Making code more predictable and maintainable
1. Can increase performance
1. Make extending your framework easier with less code

In a nutshell this methodology allows you to make assumptions about your application.
Conventions can include:

1. File structures
1. Naming conventions of files, classes, functions, properties...
1. Design patterns
1. Object availability

## Example
Let us use a example to demonstrate this principle.
I want to load an image based on a type.

### Given this object structure:
```js
const folder = {
    type: "folder"
};

const file = {
    type: "file"
}
```

You can have a function that will retrieve an icon to use based on the object's type.
You will often notice how conventions eliminate the requirement for if and case statements.
Less conditional evaluations means faster code, specially when dealing with large numbers of iterations.

###Consider this function
```js
function loadIcon(obj) {
    const file = `/images/icons/${obj.type || 'file'}.svg`;
    return fetch(file).then(result => result.text());
}
```

There are a number of assumptions made here based con the application's conventions:

1. The object you pass on as a parameter has a type property. If not set the default is 'file'.
1. Icons are always placed in the folder '/images/icons/';
1. Icons are always svg files.

If you did not use convention over code you would probably have had to have a custom conditional statement to load each image depending on it's type.
Each time you wanted to add a new type you had to maintain your condition or it would not work as expected.

Using these conventions simplifies the calling code and there is no additional work required when introducing a new type.
This not only limits the number of lines of code you need to write but also future proofs for any type you may need.

## Conclusion
It is important to always consider proper conventions when writing your code.
These conventions should be part of your development standards enforced during code reviews.

### Less code means:
1. Less bytes to download
1. Less parsing that is required
1. Faster compilation times in the browser
1. Faster execution times in large collections
1. More maintainable
1. Less to test

Well defined conventions just makes sense.