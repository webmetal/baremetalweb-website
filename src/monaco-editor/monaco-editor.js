class MonacoEditor extends HTMLElement {
    get frame() {
        if (this._frame == null) {
            this._frame = this.querySelector("iframe");
        }
        return this._frame;
    }

    set frame(newValue) {
        this._frame = newValue;
    }

    get language() {
        return this._language || this.getAttribute("language");
    }

    set language(newValue) {
        this._language = newValue;
        this.frame.contentWindow.postMessage({language: newValue});
    }

    async connectedCallback() {
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        this.frame.onload = () => {
            this.language = "javascript";
            this.frame.onload = null;
        };
        this.frame.setAttribute("src", import.meta.url.replace(".js", ".tpl.html"));

    }

    disconnectedCallback() {
        this.frame = null;
        this.innerHTML = null;
    }
}

customElements.define("monaco-editor", MonacoEditor);

