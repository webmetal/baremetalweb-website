import {ViewBase} from "./../view-base.js";
import {contextualize} from "../../src/lib/binding/expression-parser.js";
import {enableBinding} from "./../../src/lib/binding/providers/binding-helper.js";

export default class Home extends ViewBase {
    constructor() {
        super();
        
        this.data = {
            name: "Pooky",
            lastName: "Rabie"
        };
    }

    contextualize() {
        const input = document.querySelector("input");
        const value = input.value;
        const exp = contextualize(value);
        input.value = exp;
    }

    doSomething() {
        let i = 0;

        let handle;
        const fn = () => {
            i++;
            this.data.name = i;
            handle = requestAnimationFrame(fn);

            if (i == 100) {
                cancelAnimationFrame(handle);
                this.data.name = "Johan"
            }
        };

        fn();
    }

    update() {
        this.data = {
            name: "Test",
            lastName: "Object"
        }
    }

    loaded() {
        binding.refresh(this).catch(error => console.error(error));
    }

    doLoaded(element) {
        console.log(element);
    }
}