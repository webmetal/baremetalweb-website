import {ViewBase} from "./../view-base.js";
import {contextualize} from "../../src/lib/binding/expression-parser.js";

export default class Home extends ViewBase {
    constructor() {
        super();
        this.data = {
            name: "Christine",
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

        const fn = () => {
            const interval = setTimeout(() => {
                this.data.name = i;
                i += 1;

                if (i < 100) fn();
            }, 1);
        };

        fn();
        //this.data.name = "Johan";
    }

    loaded() {
        binding.refresh(this).catch(error => console.error(error));
    }
}