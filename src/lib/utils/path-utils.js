export function getPathFolder(file) {
    const ar = file.split("/");
    ar.splice(-1, 1);
    return ar.join("/");
}

export function getHashParts() {
    const parts = location.hash.split("?");
    const name = parts[0].replace("#", "");
    const properties = parts.length > 1 && parts[1];

    const result = {
        name: name,
        properties: {}
    };

    if (properties) {
        const pParts = properties.split("&");
        for (let prop of pParts) {
            const v = prop.split("=");
            result.properties[v[0]] = v[1];
        }
    }

    return result;
}