import {loadTemplate} from "./../lib/load-template.js";

class RadioMenu extends HTMLElement {
    get marker() {
        if (this._marker == null) {
            this._marker = this.querySelector(".marker");
        }

        return this._marker;
    }

    set marker(newValue) {
        this.marker = newValue;
    }

    connectedCallback() {
        loadTemplate(this, import.meta.url);
        this.setAttribute("role", "radiogroup");
        this.addEventListener("click", this.clickHandler = this.click.bind(this));

        location.replace("#home");
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.clickHandler);
        this.marker = null;
    }

    click(event) {
        location.replace(`#${event.target.dataset.page}`);

        let width = getComputedStyle(this).getPropertyValue('--item-width');
        width = Number(width.substr(0, width.length -2));

        this.marker.style.transform = `translateX(${width * event.target.dataset.dx}px)`;
    }
}

customElements.define('radio-menu', RadioMenu);