import {ViewBase} from "./../view-base.js";

export default class Articles extends ViewBase {
    selected(event) {
        this.notifyPropertyChanged("items", event.target.innerHTML);
    }
}