# Binding introduction

The one thing that frameworks help with is binding.
The whole notion of writing code to read data from the dom and updating the dom with value changes is not realistic.
If you had to do this for every project you will never finish.

In my opinion binding should really be something that is part of the w3c standard and optimized in the browser for best performance.
Until such time we need to rely on frameworks or binding libraries to help us streamline this common requirement.

The purpose of the binding section is to describe how you can define a binding engine.
This will include binding syntax examples and how to achieve that.
The idea here is to make it easy to use but powerful. 
It should also make as little assumptions possible.

There are a number of common binding features and then a set of more complex scenarios from a usage perspective.

## Common requirements

1. Automatically update the dom with value changes
1. Automatically update bound object properties when the input changes
1. Enable updates to both values and attributes on the dom
1. Enable easy responses to dom events such as mouse and keyboard events.

## More complex scenarios

1. Define listeners that will allow you to respond when a object property changes.
1. Define events on the bound object so that callbacks are only triggered when a expression passes.

## Note

These concepts are not theory as this website uses the baremetal binding engine for views and component binding requirements.
  