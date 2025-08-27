import xeditIdToObject from "@modules/utils/xeditIdToObject";

export default {

    getHolderId(state) {
        return xeditIdToObject(state.layout).holderId
    },
    getHolderType(state) {
        return xeditIdToObject(state.layout).holderType
    },
    getTemplateName(state, getters) {
        return state.react_layout.template_name
    },
    getTemplate(state, getters) {
        if (!getters['getTemplateName']) return {}
        return state.templates[getters.getTemplateName]
    },
    getScope(state, getters) {
        return state.scope
    },
    getScopes(state, getters) {
        return state.scopes
    },
    getCurrentLayout(state, getters) {
        const name = getters['getTemplateName']
        return name ? state.react_layout.layouts[name] || {} : {}
    }
};
