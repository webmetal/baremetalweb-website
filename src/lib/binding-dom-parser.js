import {BindingProviderFactory} from "./binding-providers.js";

export async function parseElement(element, context, callback) {
    for (let child of element.children) {
        await parseElement(child, context, callback);
    }

    const attributes = Array.from(element.attributes).filter(item => item.name.indexOf(".bind") != -1 || item.name.indexOf(".delegate") != -1);
    for (let attribute of attributes) {
        const parts = attribute.name.split(".");
        const attr = parts[0];
        const providerName = parts[1];
        const property = attribute.value;
        const provider = BindingProviderFactory[providerName](element, attr, context, property);
        callback(provider);
    }
}
