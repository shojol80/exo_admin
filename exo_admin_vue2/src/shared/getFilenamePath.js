export default function getFilenamePath(filename) {
    return filename.substring(0, filename.lastIndexOf("/"));
}
