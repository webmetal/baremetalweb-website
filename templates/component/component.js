class __class__ {
    async connectedCallback() {
        await this._loadTemplate();
    }

    disconnectedCallback() {

    }

    _loadTemplate() {
        return fetch(import.meta.url.split(".js").join(".html"))
            .then(result => result.text())
            .then(html => this.innerHTML = html);
    }
}

customElements.define("__component__", __class__);