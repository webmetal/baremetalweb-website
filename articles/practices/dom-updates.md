# Dom update performance

## General Rules

1. Do all your dom read work, cache the results and then do the dom write work.
1. When making dom updates use setTimeout(fn, 0).
1. Use idle callback only for work you don't need to predict and does not depend on something else's lifespan.
1. Only use microtasks when you want to enforce the execution of code before the next tasks.
1. Only use request animation frame when you want to ensure a predictable rasterization process.

## Dom updates during scrolling

Using tasks for updates during scrolling provides the best predictable performance on chrome.

## Request animation frame

Using request animation frame does not give you a predictable frame count.
Most often frame requests are batched in a single task and can cause frame drop.