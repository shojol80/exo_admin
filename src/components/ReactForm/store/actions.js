import isEmpty from '@modules/isEmpty'
import reacts from '@/services/api/reacts'

export default {

    async loadReactForm({state, commit, getters, dispatch, rootState}, {
        react_id,
        form_id,
        container,
        react_edition_id
    }) {
        commit('setForm', await reacts.loadReactForm({
            form_id,
            react_id,
            container,
        }))
        if (isEmpty(react_id)) {
            commit('setRelationEditionId', react_edition_id)
        }
    },

    async submitReactForm({state, commit, getters, dispatch, rootState}) {
        let form = {
            __formconf: state.form.formconf
        }
        getters.fields.forEach(fq => {
            form[fq.fq_name] = fq.value
        })

        try {
            commit('setErrors', {})
            let responseForm = await reacts.submitReactForm(form)
            commit('setForm', responseForm)
            return true
        } catch (e) {
            //validation error
            if (typeof e === "object" && e.data && e.data.code === 422) {
                commit('setErrors', {error: e.data.error, errors: e.data.errors})
            } else {
                commit('setErrors', {error: 'Something gone wrong'})
            }
        }
        return false
    }
};
