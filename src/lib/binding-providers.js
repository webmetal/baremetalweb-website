export class BindingProviderFactory {
    static bind(element, attribute, context, property) {
        return new BindProvider(element, attribute, context, property);
    }

    static delegate(element, attribute, context, property) {
        return new DelegateProvider(element, attribute, context, property);
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
        console.log(this.attributes);
    }

    _executeDelegate(event) {
        const callback = this.context[this.property];

        const eventIndex = this.attributes.indexOf("$event");
        if (eventIndex != -1) {
            this.attributes[eventIndex] = event;
        }

        callback.call(this.context, ...this.attributes);
    }
}