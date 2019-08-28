import {ViewBase} from "./../view-base.js";

export default class Tools extends ViewBase {
    get toolsWindow() {
        return this.getProperty("toolsWindow", () => document.querySelector("#tools"));
    }

    set toolsWindow(newValue) {
        this.setProperty("toolsWindow", newValue);
    }

    handleMenuClick(event) {
        if (event.target.nodeName != "LI") return;

        const tool = event.target.dataset.tool;

        if (tool == "home") return this.toolsWindow.innerHTML = "";

        this.toolsWindow.innerHTML = `<${tool}></${tool}>`;
        import(`./../../tools/${tool}/${tool}.js`);
    }
}