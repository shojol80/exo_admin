export default function mapItemsTree(items, callback, childrenProp = 'children') {
    return items.map((item, index) => {
        let out = callback(item, index, childrenProp)
        if (item[childrenProp] && item[childrenProp].length > 0) {
            out[childrenProp] = mapItemsTree(item[childrenProp], callback, childrenProp)
        }
        return out
    })
}
