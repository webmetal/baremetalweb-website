# Dom update performance

This subject is about dom updates and making them performant.

## General Rules
1. First read from the dom and cache the elements, then write all your changes to the dom.
1. When adding more than one element to the dom use document fragments to batch insert the items.
1. Make as little dom changes possible.
1. Use requestIdleCallback to execute non critical operations.
1. Strive for small tasks that execute fast independantly.
1. If you can batch several actions in your 16ms time allowence try and do that.
1. If you can afford to, make dom changes at idle time.

## Scrolling performance
1. Update the dom using tasks.
1. Use virtualization and or infinate scroll patterns for large lists.
1. Consider using intersectionObserver and requestIdleCallback for scroll performance managing the dom.
1. Prevent garbage collection, recycling elements using a element store.

## Binding
1. When performing batch updates on the UI, use micro tasks.
1. When performing cleanup do so on idle time as the GC can cause frame drop.

## Tasks
Tasks are defined using setTimeout(...)
Tasks execute in the thread one after another.
They are the best way to make updates in a changing environment like scrolling.

## Micro tasks
Micro tasks are defined as Promise.resolve().then(...)
Micro tasks will execute before the next task in queue will fire.
They are generally faster and with less overhead but will lock the thread until they are done.

## Animation Frames
Animation frames are defined as requesetAnimationFrame(...)  
They are often used when looping and updating drawing.  
Request animation frames is no garantee that you will not lock the thread as it will execute in a single task for it's duration.  
Request animation frame is more efficient and optimised in looping than setTimeout or setInterval