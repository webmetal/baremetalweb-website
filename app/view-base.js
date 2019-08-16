import {enableEvents, disableEvents} from "../src/mixins/event-mixin.js";
import {clean} from "./../src/lib/binding/clean.js";

export class ViewBase {
    connectedCallback() {
        enableEvents(this);
    }

    disconnectedCallback() {
        binding.unbind(this, () => {
            disableEvents(this);
            clean(this);
        });
    }
}