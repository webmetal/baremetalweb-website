export class ViewMD extends HTMLElement {
    get article() {
        return this._article || this.getAttribute("article");
    }

    set article(newValue) {
        this._article = newValue;
        this._loadArticle();
    }

    connectedCallback() {
        this.setAttribute("role", "article");
        this._loadArticle();
    }

    disconnectedCallback() {

    }

    _loadArticle() {
        const article = this.article;
        if (article == null) return;

        this.innerHTML = "";

        fetch(`/articles/${article}`)
            .then(result => result.text())
            .then(text => this._processMd(text))
            .catch(error => console.error(error));
    }

    _processMd(text) {
        const array = text.match(/^.*((\r\n|\n|\r)|$)/gm);
        const fragment = document.createDocumentFragment();
        const callback = (element) => fragment.appendChild(element);

        for (let i = 0; i < array.length; i++) {
            this._processLine(array, i, callback);
        }

        this.appendChild(fragment);
    }

    _processLine(array, line, callback) {
        const text = array[line].trim();

        if (text.length == 0 && this.batch != null) {
            callback(this.batch);
            this.batch = null;
            return;
        }

        if (this[text[0]] != null) {
            this[text[0]](text, callback);
        }
        else {
            this["p"](text)
        }
    }

    "#"(text, callback) {
        const count = (text.match(/#/g) || []).length;
        const element = document.createElement(`h${count}`);
        element.innerText = text.split("#").join("");
        callback(element);
    }

    "`"(text) {
        if (this.batch == null) {
            this.batch = document.createElement("pre");
        }

        this.batch.innerText += `${text}\n`;
    }

    "1"(text) {
        if (this.batch == null) {
            this.batch = document.createElement("ul");
        }

        const li = document.createElement("li");
        li.innerText = text.replace("1.", "");
        this.batch.appendChild(li);
    }

    "p"(text) {
        if (this.batch == null) {
            this.batch = document.createElement("p");
        }

        this.batch.innerText += `${text}\n`
    }
}

customElements.define("view-md", ViewMD);