export async function getValueOnPath(obj, path) {
    const parts = path.split(".");
    let parent = obj;
    let result;

    for (let part of parts) {
        result = parent[part];
        parent = result;
    }

    return result;
}