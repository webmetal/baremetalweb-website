import {ViewBase} from "./../view-base.js";
import {Process, ProcessAction} from "./../../src/lib/process/process.js";

import "./../../src/web-gl/web-gl.js";

export default class Home extends ViewBase {
    connectedCallback() {
        super.connectedCallback();
        this.data = {interval: 0}
    }

    loaded() {
        binding.refresh(this).catch(error => console.error(error));
    }

    async process() {
        const process = new Process("Test Process", 0);

        process.add(new ProcessAction("add", 0, 1, () => 1 + 30));
        process.add(new ProcessAction("log done", 2, 3, () => {console.log("done")}));
        process.add(new ProcessAction("log result", 1, 2, (value) => {
            console.log(`result: ${value}`);
            this.data.interval = value;
        }));
        await process.start();
        process.dispose();
    }
}