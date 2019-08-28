import {enableEvents, disableEventsRecursive} from "./../../src/mixins/event-mixin.js";
import {createScene, initOrthographic, initPerspective} from "./three-helper.js";

import "./../../src/code-editor/code-editor.js";

class ThreeJSSandbox extends HTMLElement {
    get editor() {
        return this.getProperty("editor", () => this.querySelector("code-editor"));
    }

    set editor(newValue) {
        this.setProperty("editor", newValue);
    }

    get codeJS() {
        return this.editor.value;
    }

    set codeJS(newValue) {
        this.editor.value = newValue;

        if (newValue) {
            try {
                this.fn = new Function("scene", "camera", "renderer", newValue);
            }
            catch(error) {
                alert(error);
            }
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
            this.init().catch(error => alert(error));
        }, 16);
    }

    disconnectedCallback() {
        disableEventsRecursive(this);
        this.setup.scene = null;
        this.setup.camera = null;
        this.setup.rename = null;
        this.setup = null;
    }

    async init() {
        this.codeJS = InitCode[this.camType]();
        this.setup = await createScene(this.querySelector("#preview"));
        this.run();
    }

    run() {
        const scene = this.setup.scene;
        while(scene.children.length > 0){
            scene.remove(scene.children[0]);
        }

        const code = this.codeJS;
        this.codeJS = code;

        this.fn(this.setup.scene, this.setup.camera, this.setup.renderer);
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

customElements.define("threejs-sandbox", ThreeJSSandbox);