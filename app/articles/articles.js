import {ViewBase} from "./../view-base.js";

export default class Articles extends ViewBase {
    constructor() {
        super();
        this.data = {
            firstName: "Johan Rabie",
            action(...args) {
                console.log(this);
            }
        }
    }

    selected(event, number) {
        console.log(event);
        console.log(number);
    }

    performClick(...args) {
        console.log(this);
        console.log(args);
    }
}