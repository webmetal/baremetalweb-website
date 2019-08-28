import {enableEvents, disableEventsRecursive} from "./../../src/mixins/event-mixin.js";
import "./../../src/code-editor/code-editor.js";

class ThreeJSSandbox extends HTMLElement {
    get codeJS() {
        return this.getProperty("codeJS", () => "");
    }

    set codeJS(newValue) {
        this.setProperty("codeJS", newValue);

        if (newValue) {
            this.fn = new Function("scene", "camera", "renderer", newValue);
        }
    }

    get camType() {
        return this.getProperty("camType", () => "orthographic");
    }

    set camType(newValue) {
        this.setProperty("camType", newValue);
        this.codeJS = InitCode[newValue]();
    }

    async connectedCallback() {
        enableEvents(this);
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        await binding.bind(this, this);

        setTimeout(() => {
            this.init();
        }, 16);
    }

    disconnectedCallback() {
        disableEventsRecursive(this);
    }

    init() {
        this.codeJS = InitCode[this.camType]();
    }

    run() {
        alert(this.codeJS);
    }
}

class InitCode {
    static orthographic() {
        return initOrthographic;
    }

    static perspective() {
        return initPerspective;
    }
}

const initOrthographic = `console.log(camera);
console.log(scene);
console.log(renderer);
`;

const initPerspective = `console.log(camera);
console.log(scene);
console.log(renderer);
`;

customElements.define("threejs-sandbox", ThreeJSSandbox);