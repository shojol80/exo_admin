function flattenTree(treeStructure, childrenKey) {

    let flatten = (children) => Array.prototype.concat.apply(
        children,
        children.map(x => x[childrenKey] ? flatten(x[childrenKey]) : []))

    //todo copy object and delete children key?
    return flatten(treeStructure).map(x => x)
}

export default flattenTree;
