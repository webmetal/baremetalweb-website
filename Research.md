# Phrases

1. Triggers
1. Events
1. Providers
1. Factories
1. Mediators
1. Adapters
1. Mangers
1. Behaviours
1. Mixins
1. Schema
1. Resolver
1. Event aggregation

## Prelude
For the purpose of this text we will assume you are working with object instances in sone shape or form.  
These objects consist of properties and functions.

## Triggers
Triggers are callbacks executed when a given property or properties value changes.
Triggers can be registered on multiple properties.
You can have more than one trigger per property.

## Events
Events are the same as triggers but are condition based.
An event must have a expression that will trigger the event.
The event is only triggered when the expression is true.
The event expression can be acrross multiple properties.
Event evaluation uses triggers.
You need to evaluate the expression each time a property in expression changes.

## Providers
Providers allow dyanmic implementations based on a condition.
Lets say you have a schema parser feature but you want to support different schema types.
The base deals with all the common features.
For each schema and it's particular implementations is a provider.
Providers are commonly created using a factory where the base requests a provider based on the condition.
For example, when you load a text schema, it will create a text provider and when you load a binary schema, it creates a binary provider. 

## Factories
Factories are functions of classes that create other functions or classes provided a context.

## Mediators
Mediators allow seperation of concern and loose coupling.
They communicate between objects syncronising functionality without the individual components knowing about it.

## Adapters
Adapters in code fucntion much the same way as electrical plug adapters do.
When you have mishmatched interfaces the adapter allows the coupeling of those objects. 
When you have a two point plug but a three point socket, you need a adapter to work.
Adapters in code fucntion much the same way.

## Managers
Managers are used to manage multiple objects.
It does not really matter what you manage.
It can be managing life cycle, stores, suspencion and activation...

## Behaviours
Behaviours are classes that attach to another to change the behaviour of that class.
This is typically used on UI but is not limited to it.
If you have a div but you want it act and interface like a button, a behaviour allowing that transformation needs to connected to the div.
Behaviours must have the following functions:
1. connectedCallback
2. disconnectedCallback

## Mixins
Mixins are classes or functions that add additional features to any target object.
It is not always possible to use standard polymorphasism as you can't extend multiple classes.
Mixins are also not required at instanciation. You can extend functional capability using mixins when ever you need it.
This is often useful to manage memory, only adding mixins when and only if you need it.