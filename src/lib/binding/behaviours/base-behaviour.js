export class BaseBehaviour {
    constructor(attribute, context) {
        this._attribute = attribute;
        this._context = context;
    }

    dispose() {
        delete this._attribute;
        delete this._context;
    }
}