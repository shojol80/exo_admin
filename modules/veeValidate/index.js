import subdomainRule from './subdomain'
import { Form as VeeForm, Field as VeeField, ErrorMessage, defineRule, configure } from 'vee-validate';
// Import ValidationObserver and ValidationProvider for backward compatibility
import { Form as ValidationObserver, Field as ValidationProvider } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';

// Install all rules
Object.keys(AllRules).forEach(rule => {
    if (typeof AllRules[rule] === 'function') {
        defineRule(rule, AllRules[rule]);
    }
});

// Install English locale.
configure({
    generateMessage: localize('en', en),
});

const Plugin = {
    install(app, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true

        app.component('VeeForm', VeeForm);
        app.component('VeeField', VeeField);
        app.component('ErrorMessage', ErrorMessage);
        // Register ValidationObserver and ValidationProvider for backward compatibility
        app.component('ValidationObserver', ValidationObserver);
        app.component('ValidationProvider', ValidationProvider);

        subdomainRule()
    }
}

export default Plugin

