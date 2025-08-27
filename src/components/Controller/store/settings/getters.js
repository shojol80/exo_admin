import defaultQBRules from "@/shared/defaultQBRules";


export default {
    config(state) {
        return state.config
    },

    getForms(state) {
        return state.config.forms || []
    },

    isFormChanged(state) {
        return state.form_updated === 1
    },

    name(state) {
        return state.config ? state.config.name : ''
    },

    extraParams(state) {
        return state.config.extraParams || ''
    },

    isLegacyContainer(state) {
        return !state.config.$_isBaseContainer
    },

    getQBRules(state) {
        return state.config.QBRules || defaultQBRules()
    },
};
