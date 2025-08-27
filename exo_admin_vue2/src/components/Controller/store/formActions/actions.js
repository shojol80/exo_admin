import containerApi from '@/services/api/container'

export default {
    async loadRules({commit, rootGetters}, {react_id, rules_name}) {
        let rules = await containerApi.getRelatedReactRules({
            container: rootGetters['controller/container'],
            rules, react_id, rules_name
        })
        commit('setRules', rules)
    },
    async saveRules({state, getters, dispatch, rootGetters}, {rules_name, react_id}) {
        await containerApi.saveRelatedReactRules({
            container: rootGetters['controller/container'],
            react_id: react_id,
            rules_name: rules_name,
            rules: getters['rules']
        })
        await dispatch('controller/reload', {}, {root: true})
    }
};
