import {ViewBase} from "./../view-base.js";
import {Process, ProcessAction, ProcessSetVariable, ProcessCondition} from "./../../src/lib/process/process.js";

import "./../../src/monaco-editor/monaco-editor.js";

export default class Home extends ViewBase {
    connectedCallback() {
        super.connectedCallback();
        this.data = {
            interval: 0,
            process: {
                value1: 1,
                value2: 1
            }
        }
    }

    loaded() {
        binding.refresh(this).catch(error => console.error(error));
    }

    async process() {
        const process = new Process("Test Process", 0);

        process.add(new ProcessAction("add", 0, 1, () => this.data.process.value1 + this.data.process.value2));
        process.add(new ProcessSetVariable("setVar", 1, 2, "addResult"));

        process.add(new ProcessCondition("eval", 2, 3, 4, "@addResult > 5"));

        process.add(new ProcessAction("passed", 3, 5, () => this.data.interval = "value was greater than 5"));
        process.add(new ProcessAction("failed", 4, 5, () => this.data.interval = "value was less than 5 or less"));

        await process.start();
        process.dispose();
    }

    update() {
        this.data = {

        }
        
        let result = this.rotateV({x: -100, y:0}, 45);
        console.log(result);

        result = this.rotateV({x: 100, y:0}, 45);
        console.log(result);
    }

    /**
     * Rotate a vector around the zero axis by a given angle in degrees
     * @param v {Vector2}: Vector to rotate
     * @param angle {number} Degrees to rotate it by
     * @returns {{x: number, y: number}}
     */
    rotateV(v, angle) {
        const a = angle * (Math.PI / 180)
        const x = (v.x * Math.cos(a)) - (v.y * Math.sin(a));
        const y = (v.y* Math.cos(a)) + (v.x * Math.sin(a));
        return {
            x: Math.round(x * 100) / 100,
            y: Math.round(y * 100) / 100
        }
    }
}