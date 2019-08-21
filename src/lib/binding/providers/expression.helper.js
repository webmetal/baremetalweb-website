import {contextualize} from "./../expression-parser.js";

/**
 * Collection storing functions for a given expression
 */
if(!window.expCollection) window.expCollection = new Map();

/**
 * Collection storing functions for a given binding expression
 */
if(!window.bexpCollection) window.bexpCollection = new Map();

/**
 * Collection storing functions for setting property values on the context path
 */
if(!window.bppCollection) window.bppCollection = new Map();

/**
 * create functions will will run an expression
 * @param exp {string}: expression to run and return values from
 * @returns {Function}
 */
export function createExpFn(exp) {
    if (expCollection.has(exp)) {
        return getCollectionFn(expCollection, exp);
    }

    const src = ["return `", contextualize(exp), "`"].join("");
    const cache = {fn: new Function("context", src), count: 1};
    expCollection.set(exp, cache);
    return cache.fn;
}

/**
 * create function that will run an binding expression evaluation
 * @param exp {string}: expression to run and return vale from
 * @returns {Function}
 */
export function createBindingExpFn(exp) {
    if (bexpCollection.has(exp)) {
        return getCollectionFn(bexpCollection, exp);
    }

    const src = ["return ", contextualize(exp)].join("");
    const cache = {fn: new Function("context", src), count: 1};
    bexpCollection.set(exp, cache);
    return cache.fn;
}

/**
 * create a function that sets a property on path with a given value
 * @param propertyPath {string}: property path relative to the context
 * @returns {Function}
 */
export function createBindingSetFn(propertyPath) {
    if (bppCollection.has(propertyPath)) {
        return getCollectionFn(bppCollection, propertyPath);
    }

    const src = `context.${propertyPath} = value`;
    const cache = {fn: new Function("context", "value", src), count: 1};
    bppCollection.set(propertyPath, cache);
    return cache.fn;
}

function getCollectionFn(collection, exp) {
    const result = collection.get(exp);
    result.count++;
    return result.fn;
}

/**
 * Generic function that reduces the count or deletes it if not longer required
 * @param collection {Map}: collection to check
 * @param exp {string}: the expression used on the map.
 */
function releaseFn(collection, exp) {
    if (collection.has(exp)) {
        const cache = collection.get(exp);
        cache.count -= 1;

        if (cache.count == 0) {
            collection.delete(exp);
        }
    }
}


/**
 * Clean the expCollection
 * @param exp {string}
 */
export function releaseExpFn(exp) {
    releaseFn(expCollection, exp);
}

/**
 * Clean the bexpCollection
 * @param exp
 */
export function releaseBindingExpFn(exp) {
    releaseFn(bexpCollection, exp);
}

/**
 * Clean the bpp collection
 * @param exp {string}
 */
export function releaseBppFn(exp) {
    releaseFn(bppCollection, exp);
}

