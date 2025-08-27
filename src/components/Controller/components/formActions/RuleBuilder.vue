<template>
    <rule-adapter class="rule-builder"
                  v-model="rule_if"
                  :rules="rulesDefinition"
                  :rule_operator.sync="rule_operator"
                  :max-depth="3">
    </rule-adapter>
</template>

<script>
import FieldRuleInput from './FieldRuleInput'
import RuleAdapter from './RuleAdapter'

export default {
    name: "RuleBuilder",
    components: {RuleAdapter},
    computed: {
        rules() {
            return this.$store.getters['controller/formActions/rules']
        },
        rule_if: {
            get() {
                return this.rules.rule_if
            },
            set(value) {
                this.$store.commit('controller/formActions/setRule', {
                    rule: 'rule_if',
                    value: value
                })
            }
        },
        rule_operator: {
            get() {
                return this.rules.rule_operator
            },
            set(value) {
                this.$store.commit('controller/formActions/setRule', {
                    rule: 'rule_operator',
                    value: value
                })
            }
        },
        form() {
            return this.$store.getters['forms/getForm'](this.$store.getters['controller/getActionFormId'])
        },
        form_questions() {
            if (!this.form) return []
            return this.form.form_questions
        },
        fqtArrayId() {
            return this.$store.getters['ECO/fqtArrayId']
        },
        rulesDefinition() {
            return [
                {
                    type: "radio",
                    id: "__react",
                    label: "REACT",
                    choices: [
                        {label: "CHANGED", value: "changed"},
                        {label: "DELETED", value: "deleted"}
                    ]
                },
                ...this.form_questions.map(fq => {
                    return {
                        type: "custom-component",
                        id: '__' + fq.fq_name,
                        label: fq.fq_name,
                        operators: ['is EQUAL', 'is NOT EQUAL', 'is EMPTY', 'is NOT EMPTY', 'is CHANGED', '>', '<', '>=', '<='],
                        component: FieldRuleInput,
                        default: ''
                    }
                })]
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

</style>
