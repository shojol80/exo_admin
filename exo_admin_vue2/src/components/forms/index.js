import XFormGroup from '@/components/forms/XFormGroup'
import XFormInput from '@/components/forms/XFormInput'
import XFormTextArea from '@/components/forms/XFormTextArea'
import XFormSwitch from '@/components/forms/XFormSwitch'
import XFormSelect from '@/components/forms/XFormSelect'
import XFormPassword from '@/components/forms/XFormPassword'
import XFormControlSwitch from '@/components/forms/XFormControlSwitch'
import XFormFieldset from '@/components/forms/XFormFieldset'
import XFormDateTime from '@/components/forms/XFormDateTime'
import XFormRadioGroup from '@/components/forms/XFormRadioGroup'


const Plugin = {
    install(Vue, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true

        Vue.component('XFormGroup', XFormGroup)
        Vue.component('XFormInput', XFormInput)
        Vue.component('XFormTextArea', XFormTextArea)
        Vue.component('XFormSwitch', XFormSwitch)
        Vue.component('XFormSelect', XFormSelect)
        Vue.component('XFormPassword', XFormPassword)
        Vue.component('XFormControlSwitch', XFormControlSwitch)
        Vue.component('XFormFieldset', XFormFieldset)
        Vue.component('XFormDateTime', XFormDateTime)
        Vue.component('XFormRadioGroup', XFormRadioGroup)
    }
}

export default Plugin
