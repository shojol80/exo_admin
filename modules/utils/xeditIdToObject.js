export default function xeditIdToObject(id) {
    if (!id) return {}
    return Object.fromEntries(id.split('|').map(item => {
        if (item.includes(':')) {
            return item.split(':')
        } else {
            return [item, true]
        }
    }))
}