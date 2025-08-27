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
    install(app, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true

        app.component('ActionButton', ActionButton)
        app.component('ActionLink', ActionLink)
        app.component('ActionDropdown', ActionDropdown)
        app.component('ActionDropdownItem', ActionDropdownItem)
        app.component('ActionDropdownDivider', ActionDropdownDivider)
        app.component('ActionDropdownHeader', ActionDropdownHeader)
        app.component('ActionInput', ActionInput)
        app.component('ActionBack', ActionBack)
        app.component('ActionGroup', ActionGroup)
        app.component('ActionToolbar', ActionToolbar)
        app.component('ActionGroupSeparator', ActionGroupSeparator)
        app.component('ActionTable', ActionTable)
        app.component('ActionSwitch', ActionSwitch)
        app.component('ActionBackBrowser', ActionBackBrowser)
        app.component('ActionText', ActionText)
    }
}

export default Plugin
