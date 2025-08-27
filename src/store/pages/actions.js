import domains from "@/services/api/domains";
import editions from "@/services/api/editions";

export default {
    async initModule({state, commit, getters, dispatch, rootState}) {
        await dispatch('loadEditions')
        await dispatch('loadDomains')
        exoEventBus.$on('exo-api-call:editions/deleteEdition', () => dispatch('loadEditions'))
        exoEventBus.$on('exo-api-call:editions/saveEdition', () => dispatch('loadEditions'))
    },
    loadEditions({state, commit, getters, dispatch, rootState}) {
        return editions.getEditions().then(response => commit('setEditions', response.data))
    },
    loadDomains({state, commit, getters, dispatch, rootState}) {
        return domains.getDomains().then(response => commit('setDomains', response.data))
    },
};
