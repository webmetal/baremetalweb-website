export class BindingBehaviourFactory {
    static async menu(attribute, context) {
        const module = await import("./behaviours/menu-behaviour.js");
        return new module.MenuBehaviour(attribute, context);
    }
}