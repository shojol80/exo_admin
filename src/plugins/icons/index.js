import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import Icon from './Icon'
import SvgSprite from './SvgSprite'
import SvgIcon from './SvgIcon'
import icons from './icons'

const Plugin = {
    install(app, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        app.component('font-awesome-icon', FontAwesomeIcon)
        app.component('icon', Icon)
        app.component('svg-icon', SvgIcon)
        app.component('svg-sprite', SvgSprite)

        this.installed = true

        const $icons = {
            ...icons,
        }
        app.config.globalProperties.$icons = $icons

    }
}

export default Plugin
