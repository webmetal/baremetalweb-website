import {BaseProvider} from "./base-provider.js";
import {enableBindingPath} from "./binding-helper.js";
import {createBindingExpFn, releaseBindingExpFn} from "./expression.helper.js";

export class BindProvider extends BaseProvider {
    constructor(element, attribute, context, property) {
        super(element, attribute, context, property);
        this._propertyChangedHandler = this._propertyChanged.bind(this);
        this._valueChangedHandler = this._valueChanged.bind(this);
        this.expFn = createBindingExpFn(this.property);

        this._bindProperty(context, property);
        element.addEventListener("change", this._valueChangedHandler);
    }

    dispose() {
        this.element.removeEventListener("change", this._valueChangedHandler);

        releaseBindingExpFn(this.property);

        this._propertyChangedHandler = null;
        this._valueChangedHandler = null;
        this.expFn = null;

        // cleanup the context.on(attribute...
        // cleanup biding

        super.dispose();
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

    _propertyChanged(name, newValue) {
         Promise.resolve().then(()=> this.element[this.attribute] = this.expFn(this.context));
    }

}
