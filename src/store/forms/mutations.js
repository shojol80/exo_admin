import Vue from 'vue'

export default {
    setForms(state, forms) {
        Vue.set(state, 'forms', forms)
    },
}

