function transformTree(tree, params, childrenName, removeEmptyChildren = false) {
    if (!Array.isArray(tree) && typeof tree === 'object') {
        tree = Object.values(tree)
    }
    return tree.map(item => {
        let newItem = {}
        Object.keys(params).map(key => {
            if (key === childrenName) {
                if (!removeEmptyChildren && item[key].length === 0) return
                return newItem[params[key]] = transformTree(item[key], params, childrenName)
            }
            return newItem[params[key]] = item[key]
        })
        return newItem
    })
}

export default transformTree;
