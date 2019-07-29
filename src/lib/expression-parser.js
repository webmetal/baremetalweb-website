const reserved = ["-", "=", "<", ">", "(", ")", "/", "+", "&&", "||", "==", "===", "!=", "!=="];
const stringFn = [".indexOf", ".trim", ".substring"];

export function getProperties(expression) {
    const parts = expression.split(" ");
    const properties = [];
    for (const part of parts) {
        parsePart(part, (prop) => properties.push(prop));
    }

    if (properties.length == 0) {
        properties.push(expression);
    }

    return properties;
}

function parsePart(part, propertyCallback) {
    let cleanup = part.split("${").join("").split("}").join("");

    if (reserved.indexOf(part) != -1) return;
    if (RegExp('^-?[0-9]\d*(\.\d+)?$').test(cleanup)) return;

    for(let fn of stringFn) {
        const index = cleanup.indexOf(fn);

        if (index != -1) {
            cleanup = cleanup.substring(0, index);
            break;
        }
    }

    propertyCallback(cleanup);
}