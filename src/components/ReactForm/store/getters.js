import _ from 'lodash'

export default {
    fields(state) {
        return state.form.fields
    },
    formconf(state) {
        return state.form.formconf
    },
    react_id(state) {
        return _.get(state, 'form.formconf.react_id')
    },
    react_edition_id(state) {
        return _.get(state, 'form.formconf.react_edition_id')
    },
    use_as_homepage(state) {
        return _.get(state, 'form.formconf.use_as_homepage', false)
    },
    react_form_permalink_id(state) {
        return _.get(state, 'form.formconf.react_form_permalink_id')
    },
    fieldErrors: state => fq_name => {
        return state.errors[fq_name] || []
    },
    react_primary_permalink(state) {
        if (state.form && state.form.fields) {
            const field = state.form.fields.find(field => field.fqt_name === 'permalink')
            if (field && field.value) {
                const permalink = field.value.find(permalink => permalink.p_type === 'PRIMARY')
                return _.get(permalink, 'p_url')
            }
        }
        return null
    },
};
