import {ViewBase} from "./../view-base.js";

export default class Articles extends ViewBase {
    selected(event) {
        console.log(event.target);
    }
}