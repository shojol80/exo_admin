import AppScreen from '@/components/containers/AppScreen'

import Waiter from '@/components/Waiter'

import XSelect from '@modules/XSelect'
import XSwitch from '@/components/XSwitch'
import XInput from '@/components/XInput'
import XContextMenu from '@/components/XContextMenu'
import XContextMenuItem from '@/components/XContextMenuItem'
import XTree from '@/components/XTree'
import SelectUsergroup from '@/components/inputs/select/SelectUsergroup'
import SelectUser from '@/components/inputs/select/SelectUser'
import SelectEdition from '@/components/inputs/select/SelectEdition'
import SelectForm from '@/components/inputs/select/SelectForm'
import SelectView from '@/components/inputs/select/SelectView'
import SelectFormPermalink from '@/components/inputs/select/SelectFormPermalink'
import CustomParamsInput from '@/components/CustomParamsInput'
import InfoIcon from '@/components/InfoIcon'
import BreadcrumbPortal from '@/components/BreadcrumbPortal'
import AsidePanel from '@/components/containers/components/AsidePanel'
import ScreenScrollContainer from '@/components/containers/ScreenScrollContainer'

import ContainerInput from '@/components/inputs/field/ContainerInput'
import PictureInput from '@/components/inputs/field/PictureInput'
import UnitInput from '@/components/inputs/field/UnitInput'
import SearchParamsInput from '@/components/inputs/field/SearchParamsInput'

import XVarsEditor from '@/components/Vars/XVarsEditor'

import SkeletonConfirmDialog from '@/components/dialogs/SkeletonConfirmDialog'

const Plugin = {
    install(Vue, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true

        Vue.component('XTree', XTree)
        Vue.component('XSwitch', XSwitch)
        Vue.component('XSelect', XSelect)
        Vue.component('SelectUsergroup', SelectUsergroup)
        Vue.component('SelectUser', SelectUser)
        Vue.component('SelectEdition', SelectEdition)
        Vue.component('SelectForm', SelectForm)
        Vue.component('SelectView', SelectView)
        Vue.component('SelectFormPermalink', SelectFormPermalink)
        Vue.component('XContextMenu', XContextMenu)
        Vue.component('XContextMenuItem', XContextMenuItem)
        Vue.component('XInput', XInput)
        Vue.component('InfoIcon', InfoIcon)
        Vue.component('BreadcrumbPortal', BreadcrumbPortal)

        Vue.component('AppScreen', AppScreen)
        Vue.component('ScreenScrollContainer', ScreenScrollContainer)
        Vue.component('Waiter', Waiter)
        Vue.component('CustomParamsInput', CustomParamsInput)
        Vue.component('XVarsEditor', XVarsEditor)

        Vue.component('ContainerInput', ContainerInput)
        Vue.component('PictureInput', PictureInput)
        Vue.component('UnitInput', UnitInput)
        Vue.component('SearchParamsInput', SearchParamsInput)

        Vue.component('AsidePanel', AsidePanel)

        //Dialogs that call dynamically by component name
        Vue.component('SkeletonConfirmDialog', SkeletonConfirmDialog)
    }
}

export default Plugin
