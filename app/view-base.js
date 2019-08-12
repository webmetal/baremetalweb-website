import {enableEvents, disableEvents} from "../src/mixins/event-mixin.js";

export class ViewBase {
    connectedCallback() {
        enableEvents(this);
    }

    disconnectedCallback() {
        binding.unbind(this, () => {
            disableEvents(this);
            this.view = null;
        });
    }
}