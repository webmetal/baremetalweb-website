import {ViewBase} from "./../view-base.js";

export default class Articles extends ViewBase {
    get articles() {
        return this.getProperty("articles", () => []);
    }

    set articles(newValue) {
        this.setProperty("articles", newValue);
    }

    connectedCallback() {
        super.connectedCallback();
        this.notifyPropertyChanged("articles");
    }

    loaded() {
        console.log("loaded");
        this.notifyPropertyChanged("items", "test");
    }
}