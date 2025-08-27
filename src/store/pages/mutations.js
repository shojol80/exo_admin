import Vue from 'vue'

export default {
    setEditions(state, editions) {
        Vue.set(state, 'editions', editions)
    },

    setDomains(state, domains) {
        Vue.set(state, 'domains', domains)
    },
}

