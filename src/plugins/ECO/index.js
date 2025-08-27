import {get} from 'lodash'

// Store will be set dynamically to avoid circular dependencies
let currentStore = null;
export function setCurrentStore(store) {
    currentStore = store;
}

const Plugin = {
    install(app, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true

        app.mixin({
            computed: {
                ECO() {
                    return currentStore ? currentStore.state.ECO : {}
                },
            },
            methods: {
                $getECO: (path, defaultValue) => {
                    return currentStore ? get(currentStore.state.ECO, path, defaultValue) : defaultValue
                },
            }
        })
    }
}

export default Plugin
