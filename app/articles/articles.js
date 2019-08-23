import {ViewBase} from "./../view-base.js";

export default class Articles extends ViewBase {
    get articles() {
        return this.getProperty("articles", () => []);
    }

    set articles(newValue) {
        this.setProperty("articles", newValue);
    }

    async connectedCallback() {
        super.connectedCallback();
        this.notifyPropertyChanged("articles");
        this.items = JSON.parse(await fetch(import.meta.url.replace(".js", ".json")).then(result => result.text()))
    }

    loaded() {
        this.notifyPropertyChanged("items", this.items);
    }

    handleMenuClick(event) {
        console.log(event);
    }
}