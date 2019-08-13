import {BindingProviderFactory} from "./binding-providers-factory.js";

/**
 * Parse a element and it's children recursively.
 * Use the BindingProviderFactory to create providers are required to deal with binding expressions
 * @param element {HTMLElement}: Element to process
 * @param context {Object}: The binding context
 * @param callback {Function}: Function to call when a new provider has been created
 * @returns {Promise<void>}
 */
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
        callback(await BindingProviderFactory[providerName](element, attr, context, property));
    }

    if (element.children.length == 0 && element.innerHTML.indexOf("${") != -1) {
        callback(await BindingProviderFactory.expression(element, context));
    }
}
