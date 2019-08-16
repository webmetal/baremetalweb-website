export function clean(obj) {
    if (!obj || typeof obj != "object" || Array.isArray(obj)) return;

    if (obj.proxy == true) {
        obj.mute = true;
    }

    const properties = Object.entries(obj).filter(item => item[1] && typeof item[1] == "object");

    for (let property of properties) {
        const prop = property[1];

        if (prop instanceof HTMLElement) {
            obj[prop[0]] = null;
        }
        else if (Array.isArray(prop)) {
            obj[prop[0]] = cleanArray(prop);
        }
        else {
            obj[prop[0]] = clean(prop);
        }
    }

    return null;
}

function cleanArray(array) {
    for (let item of array) {
        item = clean(item);
    }
    return null;
}