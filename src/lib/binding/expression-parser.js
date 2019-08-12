const reserved = ["-", "=", "<", ">", "(", ")", "/", "+", "&&", "||", "==", "===", "!=", "!=="];
const stringFn = [".indexOf", ".trim", ".substring"];

/**
 * This function parses an expression and finds the property paths in the expression
 * These are returned to the caller in an array of string.
 * There are no duplicates in the result
 * @param expression {string}: the js expression to extract the properties from
 * @returns {Array}
 */
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

/**
 * When you use a expression in a context based function, you need to prefix each property with "context.".
 * This function does that.
 * @param expression {string}
 * @returns {string}
 */
export function contextualize(expression) {
    let exp = expression;
    const properties = getProperties(expression);
    for (let property of properties) {
        exp = exp.split(property).join(`context.${property}`);
    }

    exp = exp.split("context.context.").join("context.");

    return exp;
}

/**
 * Parse each expression part in search of property strings
 * @param part {string}: the expression part to parse
 * @param propertyCallback {function}: function to call when a property is found
 */
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

/**
 * When an value is of type number or string literal it can't be a property path.
 * Check for such markers and return true if the value is a string or number value.
 * @param value {string}
 * @returns {boolean}
 */
function isValue(value) {
    if (!Number.isNaN(Number.parseInt(value))) return true;
    if (RegExp(/'|"/).test(value) == true) return true;
    return false;
}