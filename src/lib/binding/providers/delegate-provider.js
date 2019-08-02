import {getValueOnPath} from "../object-utils.js";
import {BaseProvider} from "./base-provider.js";
import {processProperty, processAttributes} from "./delegate-helper.js";

/**
 * This is a delegate provider and enables support for binding on Dom Events
 */
export class DelegateProvider extends BaseProvider {
    constructor(element, attribute, context, property) {
        super(element, attribute, context, property);

        processProperty(this);
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

        const attributes = this.attributes == null ? [] : this.attributes.length == 0 ? [] : await processAttributes(event, this);
        callback.value.call(callback.parent || this.context, ...attributes);
    }
}