<template>
    <div>
        <component
            v-if="params.component"
            v-bind="params.props"
            :is="params.component"
            ref="modal">
        </component>
        <div ref="container"></div>
    </div>
</template>
<script>

import { getCurrentInstance } from 'vue'
import Plugin from './index'

export default {
    name: 'ContainerDialog',
    data() {
        return {
            modal: null,
            params: {
                component: undefined,
                props: {}
            },
        }
    },
    methods: {
        showComponent(modal, modalProps) {
            let me = this;
            me.params = {
                component: modal,
                props: modalProps,
            }
            return new Promise((resolve, reject) => {
                me.$nextTick(() => {
                    me.$refs.modal.show()
                        .then(event => {
                            if (event && event.trigger) Plugin.eventBus.emit(event.trigger, event)
                            resolve(event)
                        }).catch(err => reject(err))
                })
            })
        },
        show(modal, modalProps) {
            //TODO show modal component by string name
            // Vue 3 approach - create component instance
            const { createApp } = require('vue');
            const instance = createApp({
                ...modal,
                parent: this,
                props: modalProps,
                inheritAttrs: true,
            })
            // Inherit globalProperties (e.g., $icons, $dialogs, etc.) from root app
            if (this.$ && this.$.appContext && this.$.appContext.config) {
                instance.config.globalProperties = this.$.appContext.config.globalProperties
            }
            const mountedInstance = instance.mount(document.createElement('div'));
            this.$refs.container.appendChild(mountedInstance.$el)
            return mountedInstance.show()
        }
    },

    beforeMount() {
        Plugin.rootInstance = this;
    }
}
</script>
<style>

</style>
