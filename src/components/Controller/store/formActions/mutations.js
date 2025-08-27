

export default {

    setRules(state, rules) {
        state.rules = rules
    },

    setRule(state, payload) {
        state.rules[payload.rule] = payload.value
    }
};

