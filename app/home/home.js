import {ViewBase} from "./../view-base.js";
import {contextualize} from "../../src/lib/binding/expression-parser.js";
import {enableBinding} from "./../../src/lib/binding/providers/binding-helper.js";

export default class Home extends ViewBase {
    constructor() {
        super();
        
        // this.on("data", x);
        // this.when("click", () => )
        
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

        const fn = () => {
            const interval = setTimeout(() => {
                this.data.name = i;
                i += 1;

                if (i < 10000)
                {
                    fn()
                }
                else {
                    this.data.name = "Johan";
                    clearTimeout(interval);
                }
            }, 1);
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