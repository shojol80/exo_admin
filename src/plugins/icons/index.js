import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import Icon from './Icon'
import SvgSprite from './SvgSprite'
import SvgIcon from './SvgIcon'
import icons from './icons'

const Plugin = {
    install(Vue, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        Vue.component('font-awesome-icon', FontAwesomeIcon)
        Vue.component('icon', Icon)
        Vue.component('svg-icon', SvgIcon)
        Vue.component('svg-sprite', SvgSprite)

        this.installed = true

        const $icons = {
            ...icons,
        }
        Vue.prototype.$icons = $icons

    }
}

export default Plugin
