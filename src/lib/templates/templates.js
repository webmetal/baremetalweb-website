/**
 * Template part constants
 * @type {{css: number, js: number, html: number}}
 */
export const tp = {
    js: 1,
    html: 2,
    css: 4
};

/**
 * This function loads template parts and sends it back tot he caller as a composite
 * @param type {string}: folder that templates are in
 * @param name {string}: name of the template
 * @param parts {bitmap}: what templates to load
 * @param content {object}: object defining the content parts to inflate
 * @returns {Promise<void>}
 */
export async function getTemplates(type, name, parts, content) {
    const result = {};
    result[tp.js] = parts & tp.js && await fetchTemplateContent(type, name, "js", content);
    result[tp.html] = parts & tp.html && await fetchTemplateContent(type, name, "html", content);
    result[tp.css] = parts & tp.css && await fetchTemplateContent(type, name, "css", content);
    return result;
}

/**
 * This function fetches the content and inflates the content
 * @param type {string}: the type of content to search in, determines the sub folders
 * @param name {string}: the name of the template file
 * @param ext {string}: extension of the file being loaded
 * @param content {object}: the object used to inflate the content
 * @returns {Promise<string>}
 */
async function fetchTemplateContent(type, name, ext, content) {
    let result = await fetch(`./../../templates/${type}/${name}.${ext}`).then(result => result.text());

    if (content != null) {
        for (const [key, value] of Object.entries(content)) {
            result = result.split(key).join(value);
        }
    }

    return result;
}
