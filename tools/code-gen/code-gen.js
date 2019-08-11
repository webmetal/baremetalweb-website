class CodeGen extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
    }

    disconnectedCallback() {
        this.innerHTML = null;
    }
}

customElements.define("code-gen", CodeGen);