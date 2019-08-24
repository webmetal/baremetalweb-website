import {enableEvents, disableEventsRecursive} from "./../../src/mixins/event-mixin.js";
import {getTemplates, tp} from "./../../src/lib/templates/templates.js";
import {getClassName} from "../tools-helper.js";
import "./../../src/code-editor/code-editor.js";


class CodeGen extends HTMLElement {
    get componentName() {
        return this.getProperty("componentName", () => "");
    }

    set componentName(newValue) {
        this.setProperty("componentName", newValue);
    }

    get codeJS() {
        return this.getProperty("codeJS", () => "");
    }

    set codeJS(newValue) {
        this.setProperty("codeJS", newValue);
    }

    get codeHTML() {
        return this.getProperty("codeHTML", () => "");
    }

    set codeHTML(newValue) {
        this.setProperty("codeHTML", newValue);
    }

    get codeCSS() {
        return this.getProperty("codeCSS", () => "");
    }

    set codeCSS(newValue) {
        this.setProperty("codeCSS", newValue);
    }

    async connectedCallback() {
        enableEvents(this);
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        await binding.bind(this, this);
    }

    disconnectedCallback() {
        disableEventsRecursive(this);
        binding.unbind(this, () => {
            this.innerHTML = null;
        });
    }

    async generate() {
        const className = getClassName(this.componentName);
        const result = await getTemplates("component", "component", tp.js | tp.html | tp.css, {
            __component__: this.componentName,
            __class__: className
        });

        this.codeJS = result[tp.js];
        this.codeHTML = result[tp.html];
        this.codeCSS = result[tp.css];
    }

    async genKey(event) {
        if (event.code == "Enter") {
            this.generate();
        }
    }
}

customElements.define("code-gen", CodeGen);