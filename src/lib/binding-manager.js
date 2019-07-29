import {parseElement} from "./binding-dom-parser.js";

class BindingManager {
    constructor() {
        this._items = new Map();
        this._addHandler = this._add.bind(this);
    }

    dispose() {
        this._items.clear();
        this._items = null;
        this._addHandler = null;
    }

    async bind(viewModel, view) {
        this.binding = this._items.get(viewModel) || [];
        await parseElement(view, viewModel, this._addHandler);
        this._items.set(viewModel, this.binding);
        delete this.binding;
    }

    async unbind(viewModel, cleanFn) {
        const providers = this._items.get(viewModel);
        if (providers == null) return cleanFn();

        this._items.delete(viewModel);

        for (let provider of providers) {
            provider.dispose();
        }

        cleanFn();
    }

    _add(provider) {
        this.binding.push(provider);
    }
}

window.binding = new BindingManager();