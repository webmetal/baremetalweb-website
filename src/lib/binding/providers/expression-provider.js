import {createExpFn, releaseExpFn} from "./expression.helper.js";
import {enableBindingPath} from "./binding-helper.js";
import {getProperties} from "./../expression-parser.js"

export class ExpressionProvider {
    constructor(element, context) {
        this.element = element;
        this.context = context;
        this.expression = element.innerHTML;
        this.expFn = createExpFn(this.expression);

        this._registerTriggers();
    }

    dispose() {
        releaseExpFn(this.expression);

        this.element = null;
        this.context = null;
        this.expression = null;
        this.expFn = null;
        this._triggeredHandler = null;
    }

    _registerTriggers() {
        this._triggeredHandler = this._triggered.bind(this);

        const properties = getProperties(this.expression);
        for (let property of properties) {
            enableBindingPath(this.context, property, this._triggeredHandler);
        }
    }

    _triggered() {
         Promise.resolve().then(() => this.element.innerHTML = this.expFn(this.context));
    }
}