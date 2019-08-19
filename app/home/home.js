import {ViewBase} from "./../view-base.js";
import {Process, ProcessAction} from "./../../src/lib/process/process.js";

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
        process.add(new ProcessAction("add", 0, 1, () => 1 + 3));
        process.add(new ProcessAction("log result", 1, 2, (value) => {
            console.log(`result: ${value}`);
            this.data.interval = value;
        }));
        process.add(new ProcessAction("log done", 2, 3, () => {console.log("done")}));
        await process.start();
        process.dispose();
    }
}