import exoadmin from '@/services/api/exoadmin'

export default {
    async initModule({state, commit, getters, dispatch, rootState}) {
        await exoadmin.getECO().then(value => commit('setECO', value))
    },
};
