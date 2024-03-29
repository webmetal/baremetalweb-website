export class BindingProviderFactory {
    static async bind(element, attribute, context, property) {
        const module = await import("./providers/binding-provider.js");
        return new module.BindProvider(element, attribute, context, property);
    }

    static async delegate(element, attribute, context, property) {
        const module = await import("./providers/delegate-provider.js");
        return new module.DelegateProvider(element, attribute, context, property);
    }

    static async condition(element, attribute, context, property) {
        console.log("to be implemented");
    }

    static async expression(element, context) {
        const module = await import("./providers/expression-provider.js");
        return new module.ExpressionProvider(element, context);
    }
}