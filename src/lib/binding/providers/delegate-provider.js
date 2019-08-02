import {getValueOnPath} from "../object-utils.js";
import {BaseProvider} from "./base-provider.js";

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

    async _executeDelegate(event) {
        const callback = await getValueOnPath(this.context, this.property, true);

        if (callback.value == null) {
            throw new Error(`function "${this.property}" does not exist on context`);
        }

        const attributes = this.attributes == null ? [] : this.attributes.length == 0 ? [] : await this._processAttributes(event);
        callback.value.call(callback.parent || this.context, ...attributes);
    }

    async _processAttributes(event) {
        const result = [];
        for (let i = 0; i < this.attributes.length; i++) {
            result[i] = await this._getAttributeValue(this.attributes[i], event);
        }
        return result;
    }

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

    async _getValueOnPath(path) {
        const p = path.split("${").join("").split("}").join("");
        return await getValueOnPath(this.context, p);
    }
}