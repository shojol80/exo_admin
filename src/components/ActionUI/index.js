import ActionButton from './ActionButton'
import ActionLink from './ActionLink'
import ActionBack from './ActionBack'
import ActionDropdown from './ActionDropdown'
import ActionDropdownItem from './ActionDropdownItem'
import ActionDropdownDivider from './ActionDropdownDivider'
import ActionDropdownHeader from './ActionDropdownHeader'
import ActionInput from './ActionInput'
import ActionGroup from './ActionGroup'
import ActionGroupSeparator from './ActionGroupSeparator'
import ActionTable from './ActionTable'
import ActionToolbar from './ActionToolbar'
import ActionSwitch from './ActionSwitch'
import ActionBackBrowser from './ActionBackBrowser'
import ActionText from './ActionText'


const Plugin = {
    install(Vue, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true

        Vue.component('ActionButton', ActionButton)
        Vue.component('ActionLink', ActionLink)
        Vue.component('ActionDropdown', ActionDropdown)
        Vue.component('ActionDropdownItem', ActionDropdownItem)
        Vue.component('ActionDropdownDivider', ActionDropdownDivider)
        Vue.component('ActionDropdownHeader', ActionDropdownHeader)
        Vue.component('ActionInput', ActionInput)
        Vue.component('ActionBack', ActionBack)
        Vue.component('ActionGroup', ActionGroup)
        Vue.component('ActionToolbar', ActionToolbar)
        Vue.component('ActionGroupSeparator', ActionGroupSeparator)
        Vue.component('ActionTable', ActionTable)
        Vue.component('ActionSwitch', ActionSwitch)
        Vue.component('ActionBackBrowser', ActionBackBrowser)
        Vue.component('ActionText', ActionText)
    }
}

export default Plugin
