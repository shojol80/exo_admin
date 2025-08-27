import ContainerDialog from './ContainerDialog'
import { reactive } from 'vue'

import Confirm from './Confirm'
import Prompt from './Prompt'
import DialogModal from "./DialogModal";
import DialogAside from "./DialogAside";

const Plugin = {
    install(app, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true
        // Vue 3: Use reactive state for event handling
        this.eventBus = reactive({
            listeners: {},
            emit(event, ...args) {
                if (this.listeners[event]) {
                    this.listeners[event].forEach(callback => callback(...args))
                }
            },
            on(event, callback) {
                if (!this.listeners[event]) {
                    this.listeners[event] = []
                }
                this.listeners[event].push(callback)
            },
            off(event, callback) {
                if (this.listeners[event]) {
                    const index = this.listeners[event].indexOf(callback)
                    if (index > -1) {
                        this.listeners[event].splice(index, 1)
                    }
                }
            }
        })
        this.rootInstance = null

        app.component('ContainerDialog', ContainerDialog)
        app.component('DialogModal', DialogModal)
        app.component('DialogAside', DialogAside)

        app.config.globalProperties.$dialogs = {
            /**
             * Create new component and attach to container
             * Confirmation, prompt, ....
             */
            show(modal, modalProps) {
                return Plugin.rootInstance.show(modal, modalProps)
            },

            /**
             * Show as dynamic component,
             * can be only one instance in time
             */
            showComponent(modal, ...args) {
                return Plugin.rootInstance.showComponent(modal, ...args)
            },

            hide(name, params) {
                // Vue 3: Use the reactive event bus
                Plugin.eventBus.emit('toggle', name, false, params)
            },
            toggle(name, params) {
                // Vue 3: Use the reactive event bus
                Plugin.eventBus.emit('toggle', name, undefined, params)
            },
            /*shortcuts*/
            confirm(modalProps) {
                return Plugin.rootInstance.show(Confirm, modalProps)
            },
            confirmDelete(modalProps) {
                let props = {variant: 'danger', okTitle: 'DELETE', ...modalProps}
                return Plugin.rootInstance.show(Confirm, props)
            },
            prompt(...args) {
                return Plugin.rootInstance.show(Prompt, ...args)
            },
        }
    }
}

export default Plugin
