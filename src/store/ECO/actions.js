// Dynamic import to avoid circular dependencies
let exoadmin = null;
const getExoadminApi = async () => {
    if (!exoadmin) {
        exoadmin = (await import('@/services/api/exoadmin')).default;
    }
    return exoadmin;
};

export default {
    async initModule({state, commit, getters, dispatch, rootState}) {
        const exoadminApi = await getExoadminApi();
        const value = await exoadminApi.getECO();
        commit('setECO', value)
    },
};
