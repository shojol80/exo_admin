import isEmpty from '@modules/isEmpty'
import _ from 'lodash'
import Str from "laravel-js-str";
import mapItemsTree from "@modules/utils/mapItemsTree";


function getSubPath(tree, path) {
    if (path.length === 0) return tree
    let name = path.shift();
    const sub = tree.find(dir => dir.children && dir.basename === name);
    return sub ? getSubPath(sub.children, path) : [];
}

export default {
    getTreeViews: (state) => (path) => {
        if (isEmpty(path)) return state.viewTree
        let subTree = getSubPath(state.viewTree, path.split('.'))
        subTree = _.cloneDeep(subTree);
        subTree = mapItemsTree(subTree, item => {
            if (item.children && item.children.length > 0) return item
            item.id = Str.of(item.id).after(path + '.').toString()
            return item
        })
        return subTree

    }
};
