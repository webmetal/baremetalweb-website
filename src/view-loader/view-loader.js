class ViewLoader extends HTMLElement {
    get viewModel() {
        return this._viewModel;
    }

    set viewModel(newValue) {
        if (this._viewModel != null) {
            this._viewModel.disconnectedCallback();
            this._viewModel = null;
        }

        this._viewModel = newValue;
    }

    disconnectedCallback() {
        this.viewModel = null;
    }

    async _load(name) {
        const jsFile = `/app/${name}/${name}.js`;
        const htmlFile = `/app/${name}/${name}.html`;

        return Promise.all([
            this._loadViewModel(jsFile),
            this._loadView(htmlFile)
        ])
    }

    async _loadView(file) {
        const html = await fetch(file).then(result => result.text());
        this.innerHTML = html;
    }

    async _loadViewModel(file) {
        const module = await import(file);
        this.viewModel = new module.default();
        this.viewModel.connectedCallback();
    }
}

customElements.define("view-loader", ViewLoader);