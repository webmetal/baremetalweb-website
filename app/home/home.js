import {ViewBase} from "./../view-base.js";
import {contextualize} from "../../src/lib/binding/expression-parser.js";
import {getTemplates, tp} from "./../../src/lib/templates/templates.js";

export default class Home extends ViewBase {
    constructor() {
        super();
        this.data = {
            name: "Hello World"
        };
    }

    contextualize() {
        const input = document.querySelector("input");
        const value = input.value;
        const exp = contextualize(value);
        input.value = exp;
    }

    async doSomething() {
        const result = await getTemplates("component", "component", tp.js | tp.html, {
            __component__: "my-component",
            __class__: "MyComponent"
        });
        console.log(result[tp.js]);
        console.log(result[tp.html]);
    }
}