import {BaseBehaviour} from "./base-behaviour.js";

export class MenuBehaviour extends BaseBehaviour {
    constructor(attribute, context) {
        super(attribute, context);
        this.updateCollectionHandler = this._updateCollection.bind(this);
        this.clickHandler = this._click.bind(this);
        this._initialize();
    }

    dispose() {
        this._attribute.ownerElement.removeEventListener("click", this.clickHandler);
        this.updateCollectionHandler = null;
        this.displayPro = null;
        this.collectionProp = null;
        this.eventCallback = null;
        this.clickHandler = null;
        this.items = null;
        super.dispose();
    }

    _initialize() {
        const markup = this._attribute.nodeValue.split(",");
        const bindProperty = markup[0];
        this.collectionProp = markup[1];
        this.displayPro = markup[2];
        this.eventCallback = markup[3];

        this._context.on(bindProperty, this.updateCollectionHandler);
        this._attribute.ownerElement.addEventListener("click", this.clickHandler);
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
        this.items = array;
        if (array == null) return;

        return this._renderItems(array);
    }

    async _renderItems(array, backItem) {
        const fragment = document.createDocumentFragment();
        backItem && fragment.appendChild(backItem);

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
        li.setAttribute("data-path", item.id);
        li.innerText = item[this.displayPro];

        if (count > 0) {
            li.classList.add("parent");
        }

        return li;
    }

    async _click(event) {
        const target = event.target;
        const path = target.dataset.path;
        if (target.dataset.count && target.dataset.count > 0) {
            const result = await this._itemsOnPath(path, this.items);
            return this._renderItems(result);
        }

        const result = await this._itemsOnPath(path, this.items);
        this._context[this.eventCallback](result);
    }

    async _itemsOnPath(path, collection) {
        const parts = path.split(".");
        if (parts.length == 1) {
            return collection.find(item => item.id == path)[this.collectionProp];
        }

        let id = "";
        let item;
        for (let i = 0; i < parts.length; i++) {
            id = id + parts[i];
            item = collection.find(item => item.id == id);
            collection = item[this.collectionProp];
            id += "."
        }

        return item;
    }
}