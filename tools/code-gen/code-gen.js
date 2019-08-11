class CodeGen extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        await binding.bind(this, this);
    }

    disconnectedCallback() {
        binding.unbind(this, () => {
            this.innerHTML = null;
        });
    }

    generate() {
        console.log("test");
    }
}

customElements.define("code-gen", CodeGen);