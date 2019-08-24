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
1. Intent
1. Action
1. Renderer
1. Transpiler
1. View
1. ViewModel
1. Model
1. Dataset
1. Datasource
1. Store
1. Separation of concern
1. Plugin

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

## Schema

Schema is a definition document. 
Schemas can define user interfaces but also user intent and actions.
Schemas allow runtime changes and user configuration.

## Resolver

A resolver determines what view parts to instantiates depending on what the URL and URL parts were. 
View parts would include, views, controllers and view-models.

## Transpiler

Transpilers translate between languages and expressions.
You may need the ability to expose expression functionality to the user but not use a traditional language such as javascript.
The transpiler allows you to translate between what the user typed in and a sanitised executable.

## View

The view is the part you see.
This very much depends on the technology you use but on the web this normally refers to the HTML you see.

## ViewModel

The view model is the code part of a view.
All your delegate logic and interaction with the view happens here. 

## Model

The model is the part that contains the data.
This is most often a class or object literal and may or may not contain feature functions.

## Dataset

By definition a dataset is a collection of data.
This may be a collection of records or a single record's structure.
Datasets can also be composite, a structure containing other structures.
Consider the following:

```js
const person = {
    details: {
        firstName,
        last,
        age,
    },
    phoneNumbers: [],
    addresses: [] 
}
```

## Datasource

A datasource is your connection to the server used to fetch data.

## Store

There are many types of stores and store strategies.
Stores contain and manage data on a temporary basis.
They may or may not persist the data for the long term using something like indexDB.
The type of data contained in a store is limitless.

## Separation of concern

This is a important pattern to get under the knee.  
Simply stated it means that a object of function is scoped to a single concern or task.  
This is something new developers struggle with a lot where they try and make an class or function do more than it should.

From an object perspective it would mean, "I do one thing and I do it well".
Separation of concern promotes modularity witch in turn means reuse. 

## Plugin pattern

This pattern allows the dynamic registration of functionality during runtime or load time.
This may or may not be similar with the factory pattern but can be used with the factory pattern to dynamically extend the factory's capability at runtime.
 