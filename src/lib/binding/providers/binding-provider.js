import {BaseProvider} from "./base-provider.js";
import {enableBindingPath} from "./binding-helper.js";
import {createBindingExpFn, releaseBindingExpFn, createBindingSetFn, releaseBppFn} from "./expression.helper.js";

export class BindProvider extends BaseProvider {
    constructor(element, attribute, context, property) {
        super(element, attribute, context, property);
        this._propertyChangedHandler = this._propertyChanged.bind(this);
        this._valueChangedHandler = this._valueChanged.bind(this);
        this.expFn = createBindingExpFn(this.property);
        this.setFn = createBindingSetFn(this.property);

        this._bindProperty(context, property);
        element.addEventListener("change", this._valueChangedHandler);
    }

    dispose() {
        this.element.removeEventListener("change", this._valueChangedHandler);

        this._propertyChangedHandler = null;
        this._valueChangedHandler = null;

        releaseBindingExpFn(this.property);
        releaseBppFn(this.property);

        this.expFn = null;
        this.setFn = null;

        super.dispose();
    }

    _valueChanged(event) {
        let value = event.target.value;

        if (event.target.type == "number") {
            value = Number(value);
        }

        this.setFn(this.context, value);
    }

    _bindProperty(context, property) {
        if (property.indexOf(".") != -1) {
            return enableBindingPath(context, property, this._propertyChangedHandler);
        }

        context.on(property, this._propertyChangedHandler);
    }

    _propertyChanged() {
         Promise.resolve().then(()=> this.element[this.attribute] = this.expFn(this.context));
    }

}
