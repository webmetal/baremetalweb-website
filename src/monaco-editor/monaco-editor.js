class MonacoEditor extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        this.querySelector("iframe").setAttribute("src", import.meta.url.replace(".js", ".tpl.html"));
    }
}

customElements.define("monaco-editor", MonacoEditor);

