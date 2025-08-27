function findPath(items, $int_id, path = '') {
    for (let i = 0; i < items.length; i++) {
        let current_path = path === '' ? i.toString() : path + '.' + i.toString()
        if (items[i].$int_id === $int_id) {
            return current_path
        }
        if (items[i].children && items[i].children.length > 0) {
            let result = findPath(items[i].children, $int_id, current_path + '.children')
            if (result) return result
        }
    }
    return null;
}

export default findPath
