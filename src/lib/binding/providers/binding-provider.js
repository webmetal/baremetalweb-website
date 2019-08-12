import {BaseProvider} from "./base-provider.js";
import {enableBindingPath} from "./binding-helper.js";

export class BindProvider extends BaseProvider {
    constructor(element, attribute, context, property) {
        super(element, attribute, context, property);
        this._propertyChangedHandler = this._propertyChanged.bind(this);
        this._valueChangedHandler = this._valueChanged.bind(this);

        this._bindProperty(context, property);
        element.addEventListener("change", this._valueChangedHandler);
    }

    dispose() {
        this.element.removeEventListener("change", this._valueChangedHandler);

        this._propertyChangedHandler = null;
        this._valueChangedHandler = null;

        // cleanup the context.on(attribute...
        // cleanup biding

        super.dispose();
    }

    _propertyChanged(name, newValue) {
        this.element[this.attribute] = newValue;
    }

    _valueChanged(event) {
        this.context[this.property] = event.target.value;
    }

    _bindProperty(context, property) {
        if (property.indexOf(".") != -1) {
            return enableBindingPath(context, property, this._propertyChangedHandler);
        }

        context.on(property, this._propertyChangedHandler);
    }
}
