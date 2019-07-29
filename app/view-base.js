import {enableEvents, disableEvents} from "../src/mixins/event-mixin.js";

export class ViewBase {
    connectedCallback() {
        enableEvents(this);
    }

    disconnectedCallback() {
        disableEvents(this);
    }
}