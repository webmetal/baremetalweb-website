import {BaseProvider} from "./base-provider.js";

export class BindProvider extends BaseProvider {
    constructor(element, attribute, context, property) {
        super(element, attribute, context, property);
        this._propertyChangedHandler = this._propertyChanged.bind(this);
        this._valueChangedHandler = this._valueChanged.bind(this);

        context.on(property, this._propertyChangedHandler);
        element.addEventListener("change", this._valueChangedHandler);
    }

    dispose() {
        this.element.removeEventListener("change", this._valueChangedHandler);

        this._propertyChangedHandler = null;
        this._valueChangedHandler = null;

        // cleanup the context.on(attribute...

        super.dispose();
    }

    _propertyChanged(name, newValue) {
        this.element[this.attribute] = newValue;
    }

    _valueChanged(event) {
        this.context[this.property] = event.target.value;
    }
}
