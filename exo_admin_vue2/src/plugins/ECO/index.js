import store from '@/store'
import {get} from 'lodash'

const Plugin = {
    install(Vue, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true

        Vue.mixin({
            computed: {
                ECO() {
                    return store.state.ECO
                },
            },
            methods: {
                $getECO: (path, defaultValue) => {
                    return get(store.state.ECO, path, defaultValue)
                },
            }
        })
    }
}

export default Plugin
