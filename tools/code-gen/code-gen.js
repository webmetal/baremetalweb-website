import {enableEvents, disableEvents} from "./../../src/mixins/event-mixin.js";
import {getTemplates, tp} from "./../../src/lib/templates/templates.js";

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
        disableEvents(this);
        binding.unbind(this, () => {
            this.innerHTML = null;
        });
    }

    async generate() {
        const parts = this.componentName.split("-");
        if (parts.length < 2) {
            throw new Error("component name should have at least one '-'");
        }

        let className = '';
        for (let part of parts) {
            className += part.replace(/^\w/, c => c.toUpperCase());;
        }

        const result = await getTemplates("component", "component", tp.js | tp.html | tp.css, {
            __component__: this.componentName,
            __class__: className
        });

        this.codeJS = result[tp.js];
        this.codeHTML = result[tp.html];
        this.codeCSS = result[tp.css];
    }
}

customElements.define("code-gen", CodeGen);