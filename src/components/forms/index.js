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
    install(app, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true

        app.component('XFormGroup', XFormGroup)
        app.component('XFormInput', XFormInput)
        app.component('XFormTextArea', XFormTextArea)
        app.component('XFormSwitch', XFormSwitch)
        app.component('XFormSelect', XFormSelect)
        app.component('XFormPassword', XFormPassword)
        app.component('XFormControlSwitch', XFormControlSwitch)
        app.component('XFormFieldset', XFormFieldset)
        app.component('XFormDateTime', XFormDateTime)
        app.component('XFormRadioGroup', XFormRadioGroup)
    }
}

export default Plugin
