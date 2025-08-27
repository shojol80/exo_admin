import AppScreen from '@/components/containers/AppScreen'

import Waiter from '@/components/Waiter'

import XSelect from '@modules/XSelect'
import XSwitch from '@/components/XSwitch'
import XInput from '@/components/XInput'
import XContextMenu from '@/components/XContextMenu'
import XContextMenuItem from '@/components/XContextMenuItem'
// import XTree from '@/components/XTree' // Temporarily disabled - Vue 2 liquor-tree not compatible with Vue 3
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
    install(app, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true

        // app.component('XTree', XTree) // Temporarily disabled - Vue 2 liquor-tree not compatible with Vue 3
        app.component('XSwitch', XSwitch)
        app.component('XSelect', XSelect)
        app.component('SelectUsergroup', SelectUsergroup)
        app.component('SelectUser', SelectUser)
        app.component('SelectEdition', SelectEdition)
        app.component('SelectForm', SelectForm)
        app.component('SelectView', SelectView)
        app.component('SelectFormPermalink', SelectFormPermalink)
        app.component('XContextMenu', XContextMenu)
        app.component('XContextMenuItem', XContextMenuItem)
        app.component('XInput', XInput)
        app.component('InfoIcon', InfoIcon)
        app.component('BreadcrumbPortal', BreadcrumbPortal)

        app.component('AppScreen', AppScreen)
        app.component('ScreenScrollContainer', ScreenScrollContainer)
        app.component('Waiter', Waiter)
        app.component('CustomParamsInput', CustomParamsInput)
        app.component('XVarsEditor', XVarsEditor)

        app.component('ContainerInput', ContainerInput)
        app.component('PictureInput', PictureInput)
        app.component('UnitInput', UnitInput)
        app.component('SearchParamsInput', SearchParamsInput)

        app.component('AsidePanel', AsidePanel)

        //Dialogs that call dynamically by component name
        app.component('SkeletonConfirmDialog', SkeletonConfirmDialog)
    }
}

export default Plugin
