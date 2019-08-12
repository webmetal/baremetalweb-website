import {contextualize} from "./../expression-parser.js";

export function createExpressionFn(expression) {
    const src = ["return `", contextualize(expression), "`"].join("");
    return new Function("context", src);
}