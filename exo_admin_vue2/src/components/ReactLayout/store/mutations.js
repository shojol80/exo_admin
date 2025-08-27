import Vue from "vue";

export default {

    setLayout(state, layout) {
        state.layout = layout
    },

    setTemplates(state, templates) {
        state.templates = templates
    },

    setReactLayout(state, react_layout) {
        state.react_layout = react_layout
    },

    setScopes(state, scopes) {
        state.scopes = scopes
    },

    setScope(state, value) {
        state.scope = value
    },

    setTemplateName(state, value) {
        state.react_layout.template_name = value
    },

    updateSlotItems(state, {slot_name, items}) {
        let template_name = state.react_layout.template_name
        if (!state.react_layout.layouts[template_name]) {
            Vue.set(state.react_layout.layouts, template_name, {})
        }
        Vue.set(state.react_layout.layouts[template_name], slot_name, items)
    },

    setBlocks(state, reacts) {
        Vue.set(state, 'blocks', reacts)
    },

    setBusy(state, busy) {
        state.busy = busy
    },
};

