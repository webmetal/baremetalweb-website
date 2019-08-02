import {getValueOnPath} from "./object-utils.js";

export class BindingProviderFactory {
    static bind(element, attribute, context, property) {
        return new BindProvider(element, attribute, context, property);
    }

    static delegate(element, attribute, context, property) {
        return new DelegateProvider(element, attribute, context, property);
    }

    static condition(element, attribute, context, property) {

    }
}

class BaseProvider {
    constructor(element, attribute, context, property) {
        this.element = element;
        this.attribute = attribute;
        this.context = context;
        this.property = property;
    }

    dispose() {
        this.element = null;
        this.attribute = null;
        this.context = null;
        this.property = null;
    }
}

class BindProvider extends BaseProvider {
    constructor(element, attribute, context, property) {
        super(element, attribute, context, property);
        this.propertyChangedHandler = this._propertyChanged.bind(this);
        context.on(attribute, this.propertyChangedHandler);
    }

    dispose() {
        this.propertyChangedHandler = null;
        super.dispose();
    }

    _propertyChanged(name, newValue) {
        this.element.setAttribute(this.attribute, newValue);
    }
}

class DelegateProvider extends BaseProvider {
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
        const toIndex = this.property.indexOf(")");

        const attributes = this.property.substring(fromIndex, toIndex);
        this.attributes = attributes.split(" ").join("").split(",");
        this.property = this.property.substring(0, fromIndex - 1);
    }

    async _executeDelegate(event) {
        const callback = this.context[this.property];
        const attributes = this.attributes.length == 0 ? [] : await this._processAttributes(event);
        callback.call(this.context, ...attributes);
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
        if (value.indexOf("${") != -1) return await this._getValueOnPath(value);
        return value;
    }

    async _getValueOnPath(path) {
        const p = path.split("${").join("").split("}").join("");
        return await getValueOnPath(this.context, p);
    }
}