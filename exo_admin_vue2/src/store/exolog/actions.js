import exoadmin from '@/services/api/exoadmin'


// actions
export default {
    initModule({dispatch}) {
        return dispatch('loadConfig', {})
    },

    loadConfig({commit, dispatch}, params) {
        return exoadmin.getConfig().then(config => {
            commit('setConfig', config)
            return config
        })

    },
}
