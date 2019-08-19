export function getClassName(componentName) {
    const parts = componentName.split("-");
    if (parts.length < 2) {
        throw new Error("component name should have at least one '-'");
    }

    let className = '';
    for (let part of parts) {
        className += part.replace(/^\w/, c => c.toUpperCase());;
    }

    return className;
}