<template>
    <action-button @action="filter"
                   :disabled="filterDisabled"
                   :icon="$icons.filter">
    </action-button>
</template>
<script>
import isEmpty from "@modules/isEmpty";
import SetupQBRulesAside from "@/components/dialogs/SetupQBRulesAside";
import _ from "lodash";

export default {
    name: 'SetupFormFilterAction',
    computed: {
        filterDisabled() {
            return isEmpty(this.$store.getters['controller/settings/getForms'])
        },
        QBRules: {
            get() {
                return this.$store.getters['controller/settings/getQBRules']
            },
            set(value) {
                return this.$store.commit('controller/settings/setQBRules', value)
            }
        },
        forms() {
            let forms = this.$store.getters['controller/settings/getForms'] || []
            return forms.map(f => f.form_id)
        }
    },
    methods: {
        async filter() {
            let response = await this.$dialogs.show(SetupQBRulesAside, {
                value: _.cloneDeep(this.QBRules),
                forms: this.forms
            })
            if (response.trigger === 'ok') {
                this.QBRules = response.value
            }
        }
    }
}
</script>
