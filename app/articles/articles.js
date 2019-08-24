import {ViewBase} from "./../view-base.js";

import "./../../src/view-md/view-md.js";

export default class Articles extends ViewBase {
    get articles() {
        return this.getProperty("articles", () => []);
    }

    set articles(newValue) {
        this.setProperty("articles", newValue);
    }

    get article() {
        return this._article || this.getAttribute("article") || null;
    }

    set article(newValue) {
        this._article = newValue;
    }

    async connectedCallback() {
        super.connectedCallback();
        this.notifyPropertyChanged("articles");
        this.items = JSON.parse(await fetch(import.meta.url.replace(".js", ".json")).then(result => result.text()))
    }

    loaded() {
        this.notifyPropertyChanged("items", this.items);
    }

    handleMenuClick(item) {
        this.article = item.path;
    }
}