import { createApp } from 'vue'
import App from './App.vue'
import { VueNestable, VueNestableHandle } from '../src/index'

const app = createApp(App)
app.component('VueNestable', VueNestable)
app.component('VueNestableHandle', VueNestableHandle)
app.mount('#app')
