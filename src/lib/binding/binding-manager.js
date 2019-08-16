import "./../idle/idleCallback.js";
import "./../idle/idleTaskManager.js";

import {parseElement} from "./binding-dom-parser.js";

class BindingManager {
    constructor() {
        this._items = new Map();
        this.binding = [];
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
        viewModel.mute = true;

        const providers = this._items.get(viewModel);
        if (providers == null) return cleanFn();

        this._items.delete(viewModel);

        for (let provider of providers) {
            provider.dispose();
            provider = null;
        }

        cleanFn();
    }

    async refresh(viewModel) {
        if (viewModel._events == null) return;

        const keys = viewModel._events.keys();
        for(let key of keys) {
            if (viewModel[key] && viewModel[key]._events) {
                await this.refresh(viewModel[key]);
            }
            else {
                viewModel.notifyPropertyChanged(key, viewModel[key]);
            }
        }
    }

    _add(provider) {
        if (this.binding == null) {
            this.binding = [];
        }

        this.binding.push(provider);
    }
}

window.binding = new BindingManager();