import containerApi from '@/services/api/container'

export default {

    async loadContainer({state, commit, getters, dispatch, rootState}, {container}) {
        commit('setContainer', container)
        await dispatch('settings/loadConfig')
        await dispatch('loadItems')
    },

    loadItems({state, commit, getters, dispatch, rootState, rootGetters}) {
        return containerApi.getItemsTree(
            {
                container: state.container,
            }
        ).then(itemsTree => commit('setItemsTree', itemsTree))
    },

    async reload({dispatch}) {
        await Promise.all([
            dispatch('loadItems'),
        ])
    },

    saveItems({state, commit, getters, dispatch, rootState, rootGetters}) {
        return containerApi.setItems(
            {
                container: state.container,
                itemsTree: state.itemsTree
            }
        )
    },

    addItems({state, commit, getters, dispatch, rootState, rootGetters}, {items, isNew}) {
        return containerApi.addItems({
            container: state.container,
            items: items,
            isNew
        }).then(itemsTree => commit('setItemsTree', itemsTree))
    },

    copyItem({state, commit, getters, dispatch, rootState, rootGetters}, {item}) {
        return containerApi.copyItem({
            container: state.container,
            path: getters['getPathByIntId'](item.$int_id)
        }).then(itemsTree => commit('setItemsTree', itemsTree))
    },

    removeItem({state, commit, getters, dispatch, rootState, rootGetters}, {item}) {
        return containerApi.removeItem({
            container: state.container,
            path: getters['getPathByIntId'](item.$int_id)
        }).then(itemsTree => commit('setItemsTree', itemsTree))
    },

    sortItems({state, commit, getters, dispatch, rootState}, {key, dir}) {
        commit('sortItems', {key, dir})
        return dispatch('saveItems')
    },

};
