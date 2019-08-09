/**
 * Get template based on parts requested
 * @param name
 * @param parts
 */

export const tp = {
    js: 1,
    html: 2,
    css: 4
};

export async function getTemplates(type, name, parts, content) {
    const result = {};
    result[tp.js] = parts & tp.js && await fetchTemplateContent(type, name, "js", content);
    result[tp.html] = parts & tp.html && await fetchTemplateContent(type, name, "html", content);
    result[tp.css] = parts & tp.css && await fetchTemplateContent(type, name, "css", content);
    return result;
}

async function fetchTemplateContent(type, name, ext, content) {
    let result = await fetch(`./../../templates/${type}/${name}.${ext}`).then(result => result.text());

    for (const [key, value] of Object.entries(content)) {
        result = result.split(key).join(value);
    }

    return result;
}
