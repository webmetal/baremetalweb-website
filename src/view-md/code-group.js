const literal = `
<div style="min-height: 50px; position: relative; margin-top: 0.5rem">
    <code-editor language="__language__">
        __code__
    </code-editor>
</div>
`;

export function createCodeGroup(language, code) {
    const template = document.createElement("template");
    template.innerHTML = literal.split("__language__").join(language).split("__code__").join(code);
    const element = template.content.cloneNode(true).children[0];
    return element;
}


