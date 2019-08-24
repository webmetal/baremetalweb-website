import {enableEvents, disableEventsRecursive} from "./../../src/mixins/event-mixin.js";
import {getTemplates, tp} from "./../../src/lib/templates/templates.js";
import {getClassName} from "./../tools-helper.js";
import "./../../src/code-editor/code-editor.js";

class WebGLComponent extends HTMLElement
{
    get codeJS() {
        return this.getProperty("codeJS", () => "");
    }

    set codeJS(newValue) {
        this.setProperty("codeJS", newValue);
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
        const result = await getTemplates("webgl-component", "webgl-component", tp.js, {
            __component__: this.componentName,
            __class__: className
        });

        this.codeJS = result[tp.js];
    }
    async genKey(event) {
        if (event.code == "Enter") {
            this.generate();
        }
    }
}

customElements.define("webgl-component", WebGLComponent);