import './bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
import iconsMapping from '@/plugins/icons/icons'
import EasyDataTable from 'vue3-easy-data-table'

import ECO, { setCurrentStore as setECOStore } from '@/plugins/ECO'
// Fragment is now native in Vue 3 - no import needed
// VueShortkey will be replaced with @vueuse/core
// import VueShortkey from 'vue-shortkey'
// LiquorTree will be replaced with vue3-treeview
// import LiquorTree from 'liquor-tree'
// VueAWN will be replaced with @kyvg/vue3-notification
// import VueAWN from 'vue-awesome-notifications'
// import Vuebar from 'vuebar'; // Temporarily disabled - Vue 2 library, needs Vue 3 alternative
// import XDataTable from '@/components/XDataTable' // Temporarily disabled for Vue 3 migration
// VueProgressBar will be replaced with @marcoschulte/vue3-progress
// import VueProgressBar from 'vue-progressbar'
//Application components registration
//VeeValidate with custom rules
// VueRouterBackButton will be replaced with custom implementation
// import VueRouterBackButton from 'vue-router-back-button'
// PortalVue is now native Teleport in Vue 3 - no import needed

// Create Vue 3 app
const vueApp = createApp(App)
// Provide $icons early as a safe fallback to avoid undefined during initial renders
vueApp.config.globalProperties.$icons = iconsMapping

// Use plugins and components
// PortalVue is now native Teleport in Vue 3 - no plugin needed
// (moved plugin registrations into async bootstrap below)
// Fragment is now native in Vue 3 - no plugin needed
// VueShortkey - will be replaced with composables later
// app.use(VueShortkey)
// LiquorTree - will be replaced with vue3-treeview later
// app.use(LiquorTree)
// VueAWN - will be replaced with @kyvg/vue3-notification later
// app.use(VueAWN)
// app.use(Vuebar); // Temporarily disabled - Vue 2 library, needs Vue 3 alternative
// app.use(XDataTable) // Temporarily disabled for Vue 3 migration
// VueProgressBar - will be replaced with @marcoschulte/vue3-progress later
// app.use(VueProgressBar, {
//     color: '#41af67',
//     failedColor: '#f86c6b',
//     thickness: '3px',
//     transition: {speed: '0.4s', opacity: '0.6s', termination: 500}
// })
// VueRouterBackButton - will be replaced with custom implementation later
// app.use(VueRouterBackButton, {
//     router,
//     ignoreRoutesWithSameName: false,
// })

// Bootstrap after store is initialized to avoid TDZ/circular issues
;(async () => {
    try {
        const { default: store } = await import('./store');

        // Use store first
        vueApp.use(store)

        // Set store reference in ECO plugin after store is initialized
        setECOStore(store)

        // Use ECO only after store is set
        vueApp.use(ECO)

        // Load and use UI plugins dynamically to avoid circular import/TDZ
        const [bootstrapVueNextMod, iconsMod, DialogsMod, ComponentsMod, ActionUIMod, FormComponentsMod, veeValidateMod] = await Promise.all([
            import('bootstrap-vue-next'),
            import('@/plugins/icons'),
            import('@modules/dialogs'),
            import('@/components'),
            import('@/components/ActionUI'),
            import('@/components/forms'),
            import('@modules/veeValidate'),
        ])
        vueApp.use(bootstrapVueNextMod.default)
        vueApp.use(iconsMod.default)
        vueApp.use(DialogsMod.default)
        vueApp.use(ComponentsMod.default)
        vueApp.use(FormComponentsMod.default)
        vueApp.use(ActionUIMod.default)
        vueApp.use(veeValidateMod.default)

        // Register EasyDataTable globally
        vueApp.component('EasyDataTable', EasyDataTable)

        // Import and use router dynamically to avoid circular dependencies
        const { default: router, setCurrentStore } = await import('./router')
        // Set store reference in router
        setCurrentStore(store)
        // Use router
        vueApp.use(router)

        // Mount the app ASAP
        vueApp.mount('#app')

        // Post-mount setup (do not block UI)
        Promise.allSettled([
            import('@/services/api/Api').then(({ setCurrentApp, setCurrentRouter, setCurrentStore: setApiStore }) => {
                setCurrentApp(vueApp)
                setCurrentRouter(router)
                setApiStore(store)
            }),
            import('@/router/helpers').then(({ setCurrentStore: setHelpersStore }) => {
                setHelpersStore(store)
            })
        ]).then(() => {
            console.log('Post-mount setup completed')
        }).catch((e) => {
            console.error('Post-mount setup error', e)
        })
    } catch (error) {
        console.error('App bootstrap failed:', error)
    }
})();

export default vueApp
