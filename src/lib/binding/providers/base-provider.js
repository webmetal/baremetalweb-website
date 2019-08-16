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
        delete this.element;
        delete this.attribute;
        delete this.context;
        delete this.property;
    }
}
