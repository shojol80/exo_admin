import filemanager from '@/services/api/filemanager'

import transformTreeContent from "@/shared/transformTreeContent";

export default {

    async initModule({state, commit, getters, dispatch, rootState}) {
        await dispatch('reload')
        exoEventBus.$on('exo-api-call:filemanager/delete', () => dispatch('reload'))
        exoEventBus.$on('exo-api-call:filemanager/createFile', () => dispatch('reload'))
        exoEventBus.$on('exo-api-call:filemanager/rename', () => dispatch('reload'))
    },

    async reload({dispatch}) {
        await dispatch('loadTree')
    },

    async loadTree({commit}) {
        let response = await filemanager.treeContent({'disk': 'site', 'path': 'resources/views'})

        let viewTree = transformTreeContent(response)
        commit('setViewTree', viewTree)
    },
};
