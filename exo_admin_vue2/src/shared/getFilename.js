import isEmpty from '@modules/isEmpty'

export default function getFilename(filename) {
    if (isEmpty(filename)) return false
    return filename.substring(filename.lastIndexOf("/")+1, filename.length);
}
