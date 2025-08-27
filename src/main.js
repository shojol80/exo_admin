import './bootstrap'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ECO from '@/plugins/ECO'
import {BootstrapVue} from 'bootstrap-vue'
import Fragment from 'vue-fragment'
import cSwitch from '@modules/Switch'
import VueShortkey from 'vue-shortkey'
import LiquorTree from 'liquor-tree'
import VueAWN from 'vue-awesome-notifications'
import Vuebar from 'vuebar';
import XDataTable from '@/components/XDataTable'
import VueProgressBar from 'vue-progressbar'
//Application components registration
import Dialogs from '@modules/dialogs'
//VeeValidate with custom rules
import veeValidate from '@modules/veeValidate'
import VueRouterBackButton from 'vue-router-back-button'
import Components from '@/components'
import ActionUI from '@/components/ActionUI'
import FormComponents from '@/components/forms'
import icons from '@/plugins/icons'
import PortalVue from 'portal-vue'

Vue.use(PortalVue)
Vue.use(ECO);
Vue.use(icons);
Vue.use(BootstrapVue)
Vue.use(Fragment.Plugin)
Vue.component('cSwitch', cSwitch)
Vue.use(VueShortkey)
Vue.use(LiquorTree)
Vue.use(VueAWN)
Vue.use(Vuebar);
Vue.use(XDataTable)
Vue.use(VueProgressBar, {
    color: '#41af67',
    failedColor: '#f86c6b',
    thickness: '3px',
    transition: {speed: '0.4s', opacity: '0.6s', termination: 500}
})
Vue.use(Dialogs);
Vue.use(Components);
Vue.use(FormComponents);
Vue.use(ActionUI);
Vue.use(veeValidate);
Vue.use(VueRouterBackButton, {
    router,
    ignoreRoutesWithSameName: false,
})


/* eslint-disable no-new */
export default new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})
