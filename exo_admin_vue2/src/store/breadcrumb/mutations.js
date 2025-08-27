import Vue from 'vue'
import {merge} from 'lodash'

export default {
    setList(state, list) {
        Vue.set(state, 'list', list)
    },

    updateLast(state, item) {
        state.list[state.list.length - 1] = merge(state.list[state.list.length - 1], item)
    },

}
