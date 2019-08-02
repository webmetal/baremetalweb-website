import {getValueOnPath} from "../object-utils.js";
import {BaseProvider} from "./base-provider.js";

/**
 * This is a delegate provider and enables support for binding on Dom Events
 */
export class DelegateProvider extends BaseProvider {
    constructor(element, attribute, context, property) {
        super(element, attribute, context, property);

        this._processProperty();
        this._executeDelegateHandler = this._executeDelegate.bind(this);
        this.element.addEventListener(this.attribute, this._executeDelegateHandler);
    }

    dispose() {
        this.element.removeEventListener(this.attribute, this._executeDelegateHandler);
        this._executeDelegateHandler = null;
        super.dispose();
    }

    /**
     * When the dom event fires, this function is called.
     * The registered function on the property path will be executed relative to the context object
     * @param event {DomEvent}
     * @returns {Promise<void>}
     * @private
     */
    async _executeDelegate(event) {
        const callback = await getValueOnPath(this.context, this.property, true);

        if (callback.value == null) {
            throw new Error(`function "${this.property}" does not exist on context`);
        }

        const attributes = this.attributes == null ? [] : this.attributes.length == 0 ? [] : await this._processAttributes(event);
        callback.value.call(callback.parent || this.context, ...attributes);
    }

    /**
     * This function processes the property expression in the delegate and initializes the required parameters accordingly
     * @private
     */
    _processProperty() {
        if (this.property.indexOf("(") == -1) return;
        const fromIndex = this.property.indexOf("(") + 1;

        if (fromIndex != -1) {
            const toIndex = this.property.indexOf(")");
            const attributes = this.property.substring(fromIndex, toIndex);
            this.attributes = attributes.split(" ").join("").split(",");
            this.property = this.property.substring(0, fromIndex - 1);
        }
    }

    /**
     * Process the expression attributes and populate it with the appropriate values to be passed as parameters
     * @param event {DomEvent}: This is passed in case there is a request for $event
     * @returns {Promise<Array>}
     * @private
     */
    async _processAttributes(event) {
        const result = [];
        for (let i = 0; i < this.attributes.length; i++) {
            result[i] = await this._getAttributeValue(this.attributes[i], event);
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
    async _getAttributeValue(value, event) {
        if (value == "$event") return event;
        if (value == "$this") return this.element;
        if (value.indexOf("${") != -1) return await this._getValueOnPath(value);

        const int = Number.parseInt(value);
        if (!isNaN(int)) return int;

        const float = Number.parseFloat(value);
        if (!isNaN(float)) return float;

        return value.split('"').join("").split("'").join("");
    }

    /**
     * If a property path is defined as a attribute get the value on the defined path so we can pass it back as a parameter
     * @param path {string}: property path
     * @returns {Promise<object>}
     * @private
     */
    async _getValueOnPath(path) {
        const p = path.split("${").join("").split("}").join("");
        return await getValueOnPath(this.context, p);
    }
}