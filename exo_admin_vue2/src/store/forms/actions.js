import forms from '@/services/api/forms'

export default {
    async initModule({state, commit, getters, dispatch, rootState}) {
        await dispatch('loadForms')
        exoEventBus.$on('exo-api-call:forms/saveForm', () => dispatch('loadForms'))
        exoEventBus.$on('exo-api-call:forms/deleteForm', () => dispatch('loadForms'))
        exoEventBus.$on('exo-api-call:forms/saveFormPermalinks', () => dispatch('loadForms'))
    },
    loadForms({state, commit, getters, dispatch, rootState}) {
        return forms.getForms().then( response => commit('setForms', response.data))
    },
};
