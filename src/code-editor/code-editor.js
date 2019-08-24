import {getPathFolder} from "./../lib/utils/path-utils.js";

import "./ace/ace.js";
import "./ace/ext-language_tools.js";

class CodeEditor extends HTMLElement {
    get language() {
        return this._language || this.getAttribute("language") || "javascript";
    }

    set language(newValue) {
        this._language = newValue;
    }

    get value() {
        return this.editor.getValue();
    }

    set value(newValue) {
        this.editor.setValue(newValue, -1);
    }

    async connectedCallback() {
        const code = this.innerText;
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());

        setTimeout(() => {
            const path = getPathFolder(import.meta.url);
            ace.config.set("basePath", `${path}/ace`);
            ace.require("ace/ext/language_tools");

            this.editor = ace.edit(this.querySelector("#editor"));

            this.editor.renderer.setShowGutter(false);
            this.editor.setTheme("ace/theme/chrome");
            this.editor.session.setMode(`ace/mode/${this.language}`);

            this.editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true
            });

            this.value = code;
        }, 10)
    }
}

customElements.define("code-editor", CodeEditor);