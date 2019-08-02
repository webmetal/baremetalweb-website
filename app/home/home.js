import {ViewBase} from "./../view-base.js";
import {getProperties} from "./../../src/lib/expression-parser.js";

export default class Home extends ViewBase {
    parse() {
        const value = document.querySelector("input").value;
        const properties = getProperties(value);
        console.log(properties);

        // todo: add contexualizing of expression for binding purposes
        // context.model.property1 == 1 ....
    }
}