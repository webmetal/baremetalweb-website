import {disableEventsRecursive} from "../../../mixins/event-mixin.js";
import {clean} from "./../clean.js";

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
        this.cleanRecursive(this);
        clean(this);
    }

    cleanRecursive(obj) {
        disableEventsRecursive(obj);
    }
}
