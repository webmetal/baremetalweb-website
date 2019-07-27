import {parseElement} from "./binding-dom-parser.js";

class BindingManager {
    constructor() {
        this.list = new Map();
        this._addHandler = this._add.bind(this);
    }

    dispose() {
        this.list.clear();
        this.list = null;
        this._addHandler = null;
    }

    async bind(viewModel, view) {
        this.binding = this.list.get(viewModel) || [];
        await parseElement(view, this._addHandler);
        this.list.set(viewModel, this.binding);
        delete this.binding;
    }

    async unbind(viewModel, cleanFn) {
        const providers = this.list.get(viewModel);
        if (providers == null) return;

        this.list.delete(viewModel);
        cleanFn();

        for (let provider of providers) {
            provider.dispose();
        }
    }

    _add(provider) {
        this.binding.push(provider);
    }
}

window.binding = new BindingManager();