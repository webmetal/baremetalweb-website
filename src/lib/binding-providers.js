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

}

class DelegateProvider extends BaseProvider {

}