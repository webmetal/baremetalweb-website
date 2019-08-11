import {ViewBase} from "./../view-base.js";

export default class Tools extends ViewBase {
    get toolsWindow() {
        return this.getProperty("toolsWindow", () => this.view.querySelector("#tools"));
    }

    set toolsWindow(newValue) {
        this.setProperty("toolsWindow", newValue);
    }

    handleMenuClick(event) {
        const tool = event.target.dataset.tool;
        this.toolsWindow.innerHTML = "<code-gen></code-gen>";
        import(`./../../tools/${tool}/${tool}.js`);
    }
}