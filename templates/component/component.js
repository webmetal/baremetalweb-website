class __class__ {
    async connectedCallback() {
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
    }

    disconnectedCallback() {

    }
}

customElements.define("__component__", __class__);