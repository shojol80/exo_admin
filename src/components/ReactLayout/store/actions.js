import rl from "@/services/api/rl";
import {REACT_LAYOUT_SCOPE_REACT} from "@modules/constants";

export default {

    async init({commit, dispatch}, {layout}) {
        commit('setBusy', true)

        commit('setLayout', layout)
        try {
            await Promise.all([
                dispatch('loadBlocks'),
                dispatch('loadTemplates'),
                dispatch('loadReactLayout')
            ])
        } finally {
            commit('setBusy', false)
        }
    },

    async loadBlocks({commit}) {
        commit('setBlocks', await rl.loadBlocks())
    },

    async loadTemplates({state, commit, getters, dispatch, rootState}) {
        commit('setTemplates', await rl.loadTemplates())
    },

    async loadReactLayout({state, commit, getters, dispatch, rootState}) {
        const response = await rl.loadReactLayout({layout: state.layout})
        commit('setReactLayout', response.react_layout)
        commit('setScopes', response.scopes)
        commit('setScope', response.scope)
    },

    async saveReactLayout({state, commit, getters, dispatch, rootState}) {
        await rl.saveReactLayout({
            scope: state.scope,
            layout: state.layout,
            react_layout: state.react_layout
        })
    },

    async updateSlotItemsAndSave({state, getters, commit, dispatch}, {slot_name, items}) {
        commit('updateSlotItems', {slot_name, items})
        //todo debounce()
        await dispatch('saveReactLayout')
    },

    async setScope({state, getters, commit, dispatch}, {scope}) {
        if (getters.getHolderType !== REACT_LAYOUT_SCOPE_REACT) return
        commit('setBusy', true)
        try {
            await rl.saveReactScope({layout: state.layout, scope: scope})
            await dispatch('loadReactLayout')
        } finally {
            commit('setBusy', false)
        }
    },

    async setTemplateName({state, getters, commit, dispatch}, {template_name}) {
        commit('setTemplateName', template_name)
        await dispatch('saveReactLayout')
    },
};
