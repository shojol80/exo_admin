import Vue from 'vue'

export default {

    setRules(state, rules) {
        Vue.set(state, 'rules', rules)
    },

    setRule(state, payload) {
        Vue.set(state.rules, payload.rule, payload.value)
    }
};

