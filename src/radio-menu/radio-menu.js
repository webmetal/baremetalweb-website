import {getHashParts} from "./../lib/utils/path-utils.js";

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

    async connectedCallback() {
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        this.setAttribute("role", "radiogroup");
        this.addEventListener("click", this.clickHandler = this.click.bind(this));

        if (location.hash.length == 0) {
            location.replace("#home");
        }


        this.hashChangedHandler = this._hashChanged.bind(this);
        this._hashChanged();

        window.addEventListener("hashchange", this.hashChangedHandler);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.clickHandler);
        this.marker = null;
        window.removeEventListener("hashchange", this.hashChangedHandler);
        this.hashChangedHandler = null;
    }

    click(event, replace = true) {
        if (replace) {
            location.replace(`#${event.target.dataset.page}`);
        }

        let width = getComputedStyle(this).getPropertyValue('--item-width');
        width = Number(width.substr(0, width.length -2));

        this.marker.style.transform = `translateX(${width * event.target.dataset.dx}px)`;
    }

    _hashChanged() {
        const name = getHashParts().name;
        const element = this.querySelector(`[data-page="${name.replace("#", "")}"]`);

        setTimeout(() => {
            this.click({target: element}, false);
        }, 10);
    }
}

customElements.define('radio-menu', RadioMenu);