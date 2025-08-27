export default {
    //config
    setConfig(state, value) {
        state.config = value
    },

    setName(state, value) {
        state.config.name = value;
    },

    setButtonPosition(state, value) {
        state.config.buttonPosition = value;
    },

    setUseOwnConfig(state, value) {
        state.config.useOwnConfig = value;
    },

    setOutputOnlyPublished(state, value) {
        state.config.outputOnlyPublished = value;
    },

    setMaxDepth(state, value) {
        state.config.maxDepth = value;
    },

    setExtraParams(state, value) {
        state.config.extraParams = value;
    },

    setQBRules(state, value) {
        state.config.QBRules = value;
    },

    addForm(state, form) {
        state.config.forms.push(form)
    },

    updateForm(state, {column, newVal, row}) {
        let form = state.config.forms.find(form => form.form_id === row.form_id)
        form[column] = newVal
        //Vue.set(state, 'form_updated', 1)
    },

    removeForm(state, form) {
        let index = state.config.forms.findIndex(f => f.form_id === form.form_id);
        state.config.forms.splice(index, 1)
    },
};

