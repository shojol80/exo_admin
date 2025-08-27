import containerApi from '@/services/api/container'

export default {
    async loadConfig({state, commit, rootGetters, dispatch, rootState}) {
        await containerApi.getContainerConfig({
                container: rootGetters['controller/container'],
            }
        ).then(config => commit('setConfig', config))
    },

    async loadCommonConfig({state, commit, rootGetters, dispatch, rootState}, params) {
        await containerApi.getContainerCommonConfig({
                params: params,
            }
        ).then(config => commit('setConfig', config))
    },

    async getContainerConfigByScope({state, commit, rootGetters, dispatch, rootState}, {useOwnConfig}) {
        await containerApi.getContainerConfigByScope({
                container: rootGetters['controller/container'],
                useOwnConfig: useOwnConfig
            }
        ).then(config => commit('setConfig', config))
    },

    async saveCommonConfig({state, commit, rootGetters, dispatch, rootState}, params) {
        await containerApi.setContainerCommonConfig({
                config: state.config,
                params: params,
            }
        )
    },

    async saveConfig({state, commit, rootGetters, dispatch, rootState}) {
        await containerApi.setContainerConfig(
            {
                container: rootGetters['controller/container'],
                config: state.config
            }
        )
        return Promise.all([
            dispatch('loadConfig'),
            dispatch('controller/reload', {}, {root: true})
        ])
    },
};
