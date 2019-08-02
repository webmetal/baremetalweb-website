export async function getValueOnPath(obj, path, includeParent = false) {
    const parts = path.split(".");
    let parent = obj;
    let result;
    let context;

    for (let part of parts) {
        context = parent;
        result = parent[part];
        parent = result;
    }

    return includeParent == false ? result : {
        parent: context,
        value: result
    };
}