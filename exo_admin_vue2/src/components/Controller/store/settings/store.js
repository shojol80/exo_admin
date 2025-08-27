import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
    namespaced: true,
    state() {
        return {
            form_updated: 0,
            config: {
                $_isBaseContainer: 0,
                forms: [],
                extraParams: '',
                commonConfig: false
            },
        };
    },
    mutations,
    getters,
    actions,
};
