import {enableBinding} from "./../lib/binding/providers/binding-helper.js";
import {getHashParts} from "./../lib/utils/path-utils.js";

class ViewLoader extends HTMLElement {
    get viewModel() {
        return this._viewModel;
    }

    set viewModel(newValue) {
        if (this._viewModel != null) {
            binding.unbind(this.viewModel, () => {
                this._viewModel.disconnectedCallback();
                this._viewModel = null;
            });
        }

        this._viewModel = newValue;
    }

    async connectedCallback() {
        onhashchange = this._load.bind(this);
        await this._load();
    }

    disconnectedCallback() {
        this.viewModel = null;
        onhashchange = null;
    }

    async _load() {
        const parts = getHashParts();
        if (this.viewModel && this.viewModel.hash == parts.name) {
            this.viewModel.properties = parts.properties;
        }
        else {
            const name = parts.name;
            const jsFile = `/app/${name}/${name}.js`;
            const htmlFile = `/app/${name}/${name}.html`;

            return Promise.all([
                await this._loadViewModel(jsFile),
                await this._loadView(htmlFile)
            ]).then(() => {
                const timeout = setTimeout(async () => {
                    clearTimeout(timeout);
                    await binding.bind(this.viewModel, this);
                    this.viewModel.view = this;
                    this.viewModel.hash = name;
                    this.viewModel.properties = parts.properties;
                    this.viewModel.loaded && this.viewModel.loaded();
                    this.removeAttribute("aria-hidden");
                })
            });
        }
    }

    async _loadView(file) {
        return new Promise(async resolve => {
            const html = await fetch(file).then(result => result.text());
            requestAnimationFrame(() => {
                this.innerHTML = html;
                this.setAttribute("aria-hidden", true);
                resolve();
            });
        })
    }

    async _loadViewModel(file) {
        const module = await import(file);
        this.viewModel = enableBinding(new module.default());
        this.viewModel.connectedCallback();
    }
}

customElements.define("view-loader", ViewLoader);