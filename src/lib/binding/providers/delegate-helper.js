import {getExpValueOnPath} from "../object-utils.js";

/**
 * This function processes the property expression in the delegate and initializes the required parameters accordingly
 * @private
 */
export function processProperty(provider) {
    if (provider.property.indexOf("(") == -1) return;
    const fromIndex = provider.property.indexOf("(") + 1;

    if (fromIndex != -1) {
        const toIndex = provider.property.indexOf(")");
        const attributes = provider.property.substring(fromIndex, toIndex);
        provider.attributes = attributes.split(" ").join("").split(",");
        provider.property = provider.property.substring(0, fromIndex - 1);
    }
}

/**
 * Process the expression attributes and populate it with the appropriate values to be passed as parameters
 * @param event {DomEvent}: This is passed in case there is a request for $event
 * @returns {Promise<Array>}
 * @private
 */
export async function processAttributes(event, provider) {
    const result = [];
    for (let i = 0; i < provider.attributes.length; i++) {
        result[i] = await getAttributeValue(provider.attributes[i], event, provider);
    }
    return result;
}

/**
 * Get the relevant attribute value in the expression attributes.
 * @param value {Object}: what is the attribute value you want to process for special markers
 * @param event {DomEvent} event that must be used for the $event marker
 * @returns {Promise<Object>}
 * @private
 */
async function getAttributeValue(value, event, provider) {
    if (value == "$event") return event;
    if (value == "$this") return provider.element;
    if (value.indexOf("${") != -1) return await getExpValueOnPath(provider.context, value);

    const int = Number.parseInt(value);
    if (!isNaN(int)) return int;

    const float = Number.parseFloat(value);
    if (!isNaN(float)) return float;

    return value.split('"').join("").split("'").join("");
}