import {ViewBase} from "./../view-base.js";
import {contextualize} from "../../src/lib/binding/expression-parser.js";

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

    doSomething() {
        this.data.name = "Johan Rabie";
    }

    loaded() {
        binding.refresh(this).catch(error => console.error(error));
    }
}