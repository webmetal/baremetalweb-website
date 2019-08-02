import {ViewBase} from "./../view-base.js";

export default class Articles extends ViewBase {
    constructor() {
        super();
        this.data = {
            firstName: "Johan Rabie"
        }
    }

    selected(event, number) {
        console.log(event);
        console.log(number);
    }
}