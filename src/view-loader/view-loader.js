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
        const name = location.hash.split("#").join("");
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
                this.viewModel.loaded && this.viewModel.loaded();
            })
        });
    }

    async _loadView(file) {
        return new Promise(async resolve => {
            const html = await fetch(file).then(result => result.text());
            requestAnimationFrame(() => {
                this.innerHTML = html;
                resolve();
            });
        })
    }

    async _loadViewModel(file) {
        const module = await import(file);
        this.viewModel = new module.default();
        this.viewModel.connectedCallback();
    }
}

customElements.define("view-loader", ViewLoader);