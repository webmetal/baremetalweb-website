export function getPathFolder(file) {
    const ar = file.split("/");
    ar.splice(-1, 1);
    return ar.join("/");
}