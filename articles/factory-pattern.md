# Factories
In this section we will be looking at factories.  
In code as in real life, factories are responsible for creating objects.
That is all a factory does.

In this example we will use a factory and convention over code.

Let ssy I am writing a binding engine where I can have different binding expressions.
```html
<ul items.bind="model.collection" click.delegate="selectItem"></ul>
```

We will need two providers here:
1. BindingProvider
1. DelegateProvider

We will use the attribute name parts as the convention.
1. items attribute always means that you will parse a collection and create appropriate child items for this element.
1. .bind means that you want to investigate a property on the view model at a given path to get your data from.
1. .delegate means that this is a function you want to call on the view model.

Getting the attributes from the element you need a way to create the appropriate provider.  
Keep in mind that in future you may want to extend this to include other providers.

Consider the following code:
```js
function parseAttribute(attr, callback) {
    const parts = attr.name.split(".");
    const provider = BindingProviderFactory[parts[1]]();
    callback(provider);
}
```

1. The second item in the parts constant will be the provider type, "bind" or "delegate".
2. The convention is that the factory has a function that has the same name as the provider type.
3. The callback will send back the provider to the original caller.

The factory would look like this:

```js
class BindingProviderFactory {
    static bind() {
        return new BindingProvider();
    }
    
    static delegate() {
        return new DelegateProvider();
    }
}
``` 

There is obviously some bulletproofing required here.
The core principals here are:

1. The factory only creates providers for binding syntax.
1. The factory follows a convention eliminating conditional statements making this much faster overall when parsing a lot of attributes.
1. Making the factory functions static eliminates the requirement of having a factory instance but allowing us to execute a convention pattern.
1. If you want to support a new provider type, just add the function to the factory and you are off.

Here is a more practical example:

```js
class BindingProviderFactory {
    static async get(type) {
        const fnName = `_${type}`;
        if (BindingProviderFactory[fnName] == null) {
            throw new Error(`There is no provider available for ${type}`);
        }
        
        return BindingProviderFactory[fnName]();
    }
    
    static async _bind() {
        const module = await import("./bindingProvider.js");
        return new module.BindingProvider();
    }
    
    static async _delegate() {
        const module = await import("./delegateProvider.js");
        return new module.DelegateProvider();
    }
}

// calling ...
async function doSomething() {
    const provider = await BindingProviderFactory.get("bind");    
}
```

## Conclusion
Factories is a very useful pattern that can eliminate a lot of complexity in your code.
Though the examples above are fairly simple factories, they can be complex in nature.
Using proper conventions can reduce a lot of that complexity and  make your code scale better.
Depending on your scenario the get function may or may not make sense.

Factories allow proper separation of concern so that you don't try to over extend the ability of a class.
In the example above, instead of having one complex provider class we use the factory to create us simpler ans smaller providers that deal with only that scenario.

Factories is not a pattern that lives in isolation and should be considered holistically in context of what you are trying achieve in your code.
By using the factory pattern and separation of concern you only instantiate as much code required to execute that feature.

This benefits your use by:

1. Only loading the code that is required.
1. Reduces compile time and execution time.

It benefits you by:

1. Making your code simpler to maintain
1. Easier to debug and test
1. Reduces bug potential
