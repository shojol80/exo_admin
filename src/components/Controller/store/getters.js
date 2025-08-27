import containerIdToObject from '@modules/utils/containerIdToObject'
import findItemTreePath from '@/shared/findItemTreePath'

let flatten = (children) => Array.prototype.concat.apply(
    children,
    children.map(x => {
        return x['children'] ? flatten(x['children']) : []
    }))

export default {
    container(state) {
        return state.container
    },

    getHolderId(state, getters, rootState, rootGetters) {
        if (rootGetters['controller/settings/isLegacyContainer']) {
            switch (getters.getHolderType) {
                case 'form':
                    return +state.container.split('|')[1]
                case 'react':
                    return +state.container.split('|')[1]
                case 'page':
                    return +state.container
                default:
                    return undefined
            }
        } else {
            return containerIdToObject(state.container).holderId
        }
    },

    getHolderType(state, getters, rootState, rootGetters) {
        if (rootGetters['controller/settings/isLegacyContainer']) {
            if (!isNaN(state.container)) return 'page'
            return state.container.split('|')[0] === 'form' ? 'form' : 'react'
        } else {
            return containerIdToObject(state.container).holderType
        }
    },

    getContainerIdObject(state, getters, rootState, rootGetters) {
        if (rootGetters['controller/settings/isLegacyContainer']) {
            throw new Error('LegacyContainer container does not support')
        } else {
            return containerIdToObject(state.container)
        }
    },

    isActionContainer(state, getters, rootState, rootGetters) {
        if (rootGetters['controller/settings/isLegacyContainer']) {
            if (!isNaN(state.container)) return false
            return state.container.split('|')[0] === 'form'
        } else {
            let containerParams = containerIdToObject(state.container)
            return containerParams.holderType === 'var' && containerParams.var_type === 'form';
        }
    },

    getActionFormId(state) {

        let containerParams = containerIdToObject(state.container)
        if (containerParams.holderType === 'var' && containerParams.var_type === 'form') {
            return containerParams.var_parent
        } else {
            return undefined;
        }

    },

    itemsTree(state) {
        return state.itemsTree
    },

    getItem: state => id => {
        //TODO move outside. add test, rewrite to for()
        function findInTree(items, id) {
            let found = false
            items.forEach(item => {
                if (found) return
                if (+item.id === +id) {
                    found = item
                    return
                }
                if (item.children && item.children.length > 0) {
                    found = findInTree(items.children, id)
                }
            })
            return found
        }

        return findInTree(state.itemsTree, id)
    },

    getPathByIntId: state => $int_id => {
        return findItemTreePath(state.itemsTree, $int_id)
    },

    getPrevItem: state => id => {
        let flat = flatten(state.itemsTree).map(x => x)
        for (let i = 0; i < flat.length; i++) {
            if (+flat[i].id === +id) {
                return flat[i - 1]
            }
        }
    },

    getNextItem: state => id => {
        let flat = flatten(state.itemsTree).map(x => x)
        for (let i = 0; i < flat.length; i++) {
            if (+flat[i].id === +id) {
                return flat[i + 1]
            }
        }
    },
};
