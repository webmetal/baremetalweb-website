import {createCodeGroup} from "./code-group.js";

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

    _loadArticle() {
        const article = this.article;
        if (article == null) return;

        this.innerHTML = "";

        fetch(`/articles/${article}`)
            .then(result => result.text())
            .then(text => this._processMd(text))
            .catch(error => console.error(error));
    }

    async _processMd(text) {
        this.array = text.match(/^.*((\r\n|\n|\r)|$)/gm);
        this.index = 0;

        this.fragment = document.createDocumentFragment();

        await this._process();

        this.appendChild(this.fragment);

        this.fragment = null;
        this.array = null;
        this.index = null;
        this.callback = null;
    }

    async _process() {
        let line = this.array[this.index];

        if (line.indexOf("[") != -1) {
            line = await this._processLink();
        }

        if (line[0] == "#") {
            await this._processHeader();
        }
        else if (line.indexOf("\n") == 0 || line.indexOf("\n") == 1) {
            this.fragment.appendChild(document.createElement("br"));
        }
        else if (line.indexOf("1.") == 0) {
            await this._processList();
        }
        else if (line.indexOf("```") == 0) {
            await this._processCode();
        }
        else {
            const div = document.createElement("div");
            if (line[0] == "<") {
                div.innerHTML = line;
            }
            else {
                div.innerText = line.trim();
            }
            this.fragment.appendChild(div);
        }

        if (this.index < this.array.length -1) {
            this.index++;
            await this._process();
        }
    }

    async _processHeader() {
        const line = this.array[this.index];
        const count = (line.match(/#/g) || []).length;
        const element = document.createElement(`h${count}`);
        element.innerText = line.split("#").join("");
        this.fragment.appendChild(element);
    }

    async _processList() {
        const ul = document.createElement("ul");

        let line = this.array[this.index];
        while (line && line.indexOf("1.") == 0) {
            const li = document.createElement("li");
            li.innerText = line.replace("1.", "");
            ul.appendChild(li);
            this.index++;
            line = this.array[this.index];
        }

        this.fragment.appendChild(ul);
    }

    async _processCode() {
        const editor = document.createElement("code-editor");
        editor.setAttribute("readonly", true);

        let line = this.array[this.index];
        editor.setAttribute("language", line.replace("```", "").trim());

        this.index++;
        line = this.array[this.index];

        let lineCount = 1;

        while (line.trim() != '```') {
            lineCount++;
            editor.innerHTML += line;

            this.index++;
            line = this.array[this.index];
        }

        const div = document.createElement("div");
        div.dataset.lineCount = lineCount;
        div.appendChild(editor);
        div.classList.add("code-container");
        div.style.height = `${lineCount * 14}px`;
        this.fragment.appendChild(div);
    }

    async _processLink() {
        let line = this.array[this.index];
        const startIndex = line.indexOf("[");
        const endIndex = line.indexOf(")");

        const str = line.substr(startIndex + 1, endIndex - startIndex);
        const parts = str.split("]");
        const caption = parts[0];
        const url = parts[1].substr(1, parts[1].length - 2);
        const result = `<a href="${url}">${caption}</a>`;

        line = line.split(`[${str}`).join(result);
        this.array[this.index];

        return line;
    }
}

customElements.define("view-md", ViewMD);