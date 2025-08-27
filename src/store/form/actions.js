import forms from '@/services/api/forms'

export default {
    load({state, commit, getters, dispatch, rootState}, {form_id}) {
        return forms.getForm({
            form_id: form_id
        }).then(value => commit('setForm', value))
    },
};
