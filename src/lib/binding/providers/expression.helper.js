import {contextualize} from "./../expression-parser.js";

if(!window.expCollection) window.expCollection = new Map();
if(!window.bexpCollection) window.bexpCollection = new Map();

export function createExpFn(exp) {
    if (expCollection.has(exp)) {
        return expCollection.get(exp).fn;
    }

    const src = ["return `", contextualize(exp), "`"].join("");
    const cache = {fn: new Function("context", src), count: 1};
    expCollection.set(exp, cache);
    return cache.fn;
}

export function createBindingExpFn(exp) {
    if (bexpCollection.has(exp)) {
        return bexpCollection.get(exp).fn;
    }

    const src = ["return ", contextualize(exp)].join("");
    const cache = {fn: new Function("context", src), count: 1};
    bexpCollection.set(exp, cache);
    return cache.fn;
}

function releaseFn(collection, exp) {
    if (collection.has(exp)) {
        const cache = collection.get(exp);
        cache.count -= 1;

        if (cache.count == 0) {
            collection.delete(exp);
        }
    }
}

export function releaseExpFn(exp) {
    releaseFn(expCollection, exp);
}

export function releaseBindingExpFn(exp) {
    releaseFn(bexpCollection, exp);
}

