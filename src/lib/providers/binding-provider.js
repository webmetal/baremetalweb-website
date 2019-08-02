import {BaseProvider} from "./base-provider.js";

export class BindProvider extends BaseProvider {
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
