import {BaseBehaviour} from "./base-behaviour.js";

export class MenuBehaviour extends BaseBehaviour {
    constructor(attribute, context) {
        super(attribute, context);
        this.updateCollectionHandler = this._updateCollection.bind(this);
        this._initialize();
    }

    dispose() {
        super.dispose();
        this.updateCollectionHandler = null;
        this.displayPro = null;
        this.collectionProp = null;
    }

    _initialize() {
        const markup = this._attribute.nodeValue.split(",");
        const bindProperty = markup[0];
        this.collectionProp = markup[1];
        this.displayPro = markup[2];

        this._context.on(bindProperty, this.updateCollectionHandler)
    }

    async _updateCollection(prop, value) {
        if (value == null) return;

        if (Array.isArray(value)) {
            await this._updateArray(value);
        }
        else {
            await this._updateArray(value[this.collectionProp]);
        }
    }

    async _updateArray(array) {
        if (array == null) return;

        const fragment = document.createDocumentFragment();
        for (let item of array) {
            const listItem = await this._createMenuItem(item);
            fragment.appendChild(listItem);
        }

        this._attribute.ownerElement.innerHTML = "";
        this._attribute.ownerElement.appendChild(fragment);
    }

    async _createMenuItem(item) {
        const count = item[this.collectionProp] ? item[this.collectionProp].length : 0;

        const li = document.createElement("li");
        li.setAttribute("role", "menuitem");
        li.setAttribute("data-count", count);
        li.innerText = item[this.displayPro];

        if (count > 0) {
            li.classList.add("parent");
        }

        return li;
    }
}