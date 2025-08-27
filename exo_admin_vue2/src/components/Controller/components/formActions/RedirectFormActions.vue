<template>
    <b-card>
        <x-form-switch v-model="rule_use_for_redir" values="boolean"
                       title="Use this page as redir page">
        </x-form-switch>
        <x-form-group title="Redir to this page when">
            <rule-builder></rule-builder>
        </x-form-group>
        <x-form-input
            v-model="rule_redir_param"
            title="Add params to URL"
            description="use substitution: {react_id},{[react_field_name]},{user_hash_login}">
        </x-form-input>
    </b-card>
</template>

<script>
import RuleBuilder from './RuleBuilder'
import formActions from './mixins/formActions'
import isEmpty from '@modules/isEmpty'

export default {
    name: "RedirectFormActions",
    mixins: [formActions],
    components: {RuleBuilder},
    data() {
        return {}
    },
    computed: {
        rule_use_for_redir: {
            get() {
                return isEmpty(this.rules['rule_use_for_redir']) ? false : this.rules['rule_use_for_redir']
            },
            set(value) {
                this.$store.commit('controller/formActions/setRule', {
                    rule: 'rule_use_for_redir',
                    value: value
                })
            }
        },
        rule_redir_param: {
            get() {
                return isEmpty(this.rules['rule_redir_param']) ? '' : this.rules['rule_redir_param']
            },
            set(value) {
                this.$store.commit('controller/formActions/setRule', {
                    rule: 'rule_redir_param',
                    value: value
                })
            }
        },
        rule_redir_event: {
            get() {
                return isEmpty(this.rules['rule_redir_event']) ? undefined : this.rules['rule_redir_event']
            },
            set(value) {
                this.$store.commit('controller/formActions/setRule', {
                    rule: 'rule_redir_event',
                    value: value
                })
            }
        }
    }
}
</script>

<style scoped>

</style>
