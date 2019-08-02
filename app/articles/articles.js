import {ViewBase} from "./../view-base.js";

export default class Articles extends ViewBase {
    selected(event, code, number) {
        //this.notifyPropertyChanged("items", "test");
        console.log(event);
        console.log(code);
        console.log(number);
    }
}