export async function loadTemplate(component, url) {
    return fetch(url.split(".js").join(".html")).then(result => result.text()).then(html => requestAnimationFrame(() => component.innerHTML = html));
}