import {BindingProviderFactory} from "./binding-providers.js";

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

async function parseElement(element, callback) {
    for (let child of element.children) {
        await parseElement(child, callback);
    }

    const attributes = Array.from(element.attributes).filter(item => item.name.indexOf(".bind") != -1 || item.name.indexOf(".delegate") != -1);
    for (let attr of attributes) {
        const fn = attr.name.split(".")[1];
        const provider = BindingProviderFactory[fn]();
        callback(provider);
    }
}

window.binding = new BindingManager();