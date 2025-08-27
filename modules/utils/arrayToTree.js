export default function array2Tree(rows, idKey = 'id', parentKey = 'parent', childKey = 'children', rootId = null) {
    let tree = [];
    rows.forEach(function (row) {
        if (row[parentKey] === rootId) {
            let branch = Object.assign({}, row);
            branch[childKey] = array2Tree(rows, idKey, parentKey, childKey, row[idKey]);
            tree.push(branch);
        }
    }, this);
    return tree;
}