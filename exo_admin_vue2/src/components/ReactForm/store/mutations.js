import isEmpty from '@modules/isEmpty'
import Vue from "vue";

export default {
    /**
     * Set form
     * @param state
     * @param form
     */
    setForm(state, form = null) {
        if (!form) {
            //TODO sync with state
            form = {
                fields: [],
                formconf: {}
            }
        }
        Vue.set(state, 'form', form)
    },

    setErrors(state, {error = null, errors = {}}) {
        state.error = error
        Vue.set(state, 'errors', errors)
    },

    setQuestionValue(state, {fq_id, value}) {
        let index = state.form.fields.findIndex(item => +item.fq_id === +fq_id)
        state.form.fields[index].value = value;
    },
    setRelationEditionId(state, react_edition_id) {
        state.form.formconf.react_edition_id = react_edition_id
    },
    useAsHomepage(state, value = true) {
        Vue.set(state.form.formconf, 'use_as_homepage', value)
    },
    set_react_form_permalink_id(state, value) {
        if (isEmpty(value)) value = null
        state.form.formconf.react_form_permalink_id = value;
    },
    setShowAllFields(state, value) {
        state.showAllFields = value
    },
};

