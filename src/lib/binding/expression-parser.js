const reserved = ["-", "=", "<", ">", "(", ")", "/", "+", "&&", "||", "==", "===", "!=", "!=="];
const stringFn = [".indexOf", ".trim", ".substring"];

export function getProperties(expression) {
    const parts = expression.split(" ");
    const properties = [];
    for (const part of parts) {
        parsePart(part, (prop) => {
            if (properties.indexOf(prop) == -1) {
                properties.push(prop)
            }
        });
    }

    if (properties.length == 0) {
        properties.push(expression);
    }

    return properties;
}

export function contextualize(expression) {
    let exp = expression;
    const properties = getProperties(expression);
    for (let property of properties) {
        exp = exp.split(property).join(`context.${property}`);
    }
    return exp;
}

function parsePart(part, propertyCallback) {
    if (reserved.indexOf(part) != -1) return;

    let cleanup = part;
    for (let token of ["${", "}", "(", ")"]) {
        cleanup = cleanup.split(token).join("");
    }

    if (isValue(cleanup) == true) return;

    for(let fn of stringFn) {
        const index = cleanup.indexOf(fn);

        if (index != -1) {
            cleanup = cleanup.substring(0, index);
            break;
        }
    }

    propertyCallback(cleanup);
}

function isValue(value) {
    if (!Number.isNaN(Number.parseInt(value))) return true;
    if (RegExp(/'|"/).test(value) == true) return true;
    return false;
}