/**
 * Get a property value on a given path of object and sub objects
 * @param obj {Object}: The starting point fo the search
 * @param path {String}: The property path that the value is found on
 * @param includeParent {Boolean}: Should you include the parent object in the result, if not only the property is passed back
 * @returns {Promise<{parent: Object, value: Object}>}
 */
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