import {BindingProviderFactory} from "./binding-providers.js";

export async function parseElement(element, callback) {
    for (let child of element.children) {
        await parseElement(child, callback);
    }

    const attributes = Array.from(element.attributes).filter(item => item.name.indexOf(".bind") != -1 || item.name.indexOf(".delegate") != -1);
    for (let attr of attributes) {
        const fn = attr.name.split(".")[1];
        const provider = BindingProviderFactory[fn]();
        callback(provider);
    }
}
