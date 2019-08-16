import {disableEventsRecursive} from "../../../mixins/event-mixin.js";

/**
 * This is the base class for binding providers
 */
export class BaseProvider {
    constructor(element, attribute, context, property) {
        this.element = element;
        this.attribute = attribute;
        this.context = context;
        this.property = property;
    }

    dispose() {
        this.element = null;
        this.attribute = null;
        this.property = null;

        this.cleanRecursive(this);
        this.context = null;
    }

    cleanRecursive(obj) {
        disableEventsRecursive(obj);
    }
}
