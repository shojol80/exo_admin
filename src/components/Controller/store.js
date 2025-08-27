// store modules
// main store
import state from './store/state';
import mutations from './store/mutations';
import getters from './store/getters';
import actions from './store/actions';

import formActions from './store/formActions/store'
import settings from './store/settings/store'

export default {
    namespaced: true,
    modules: {
        formActions,
        settings,
    },
    state,
    mutations,
    actions,
    getters,
};
