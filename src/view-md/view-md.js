export class ViewMD {
    get article() {
        return this._article || this.getAttribute("article");
    }

    set article(newValue) {
        this._article = newValue;
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }
}

customElements.define("view-md", ViewMD);