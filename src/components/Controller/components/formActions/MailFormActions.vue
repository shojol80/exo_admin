<template>
    <b-card>
        <x-form-radio-group
            title="Send to"
            v-model="rule_send_type"
            :options="sendToOptions">
        </x-form-radio-group>

        <x-form-select
            v-if="rule_send_type==='fields'"
            title="Recipient fields"
            description="Select fields which will contain recipient email or user group name"
            id-key="fq_name"
            label-key="fq_name"
            :multiple="true"
            :options="form_questions"
            v-model="rule_send_fields">
        </x-form-select>

        <x-form-input
            v-else-if="rule_send_type==='email'"
            title="Email"
            description="Specify the recipient's email address or a comma-separated list of emails"
            v-model="rule_send_email">
        </x-form-input>

        <x-form-group
            v-else
            title="User groups">
            <select-usergroup
                v-model="rule_send_groups"
                :multiple="true">
            </select-usergroup>
        </x-form-group>

        <x-form-switch
            title="Use linked images"
            v-model="rule_image_linked">
        </x-form-switch>

        <x-form-group title="Send mail when">
            <rule-builder></rule-builder>
        </x-form-group>

        <x-form-group title="Send fields as attachment">
            <template v-if="attach_fields.length>0">
                <x-form-control-switch
                    v-for="(item) in attach_fields" :key="item.fq_name"
                    values="boolean"
                    :value="getFileAttachValue(item.fq_name)"
                    @change="setFileAttachValue(item.fq_name,$event)">
                    {{ item.fq_name }}
                </x-form-control-switch>
            </template>
            <template v-else>
                <p class="text-muted empty-attach">This form doesn't contain "file" fields</p>
            </template>

        </x-form-group>
    </b-card>
</template>

<script>

import RuleBuilder from './RuleBuilder'
import isEmpty from '@modules/isEmpty'
import formActions from './mixins/formActions'

export default {
    name: "MailFormActions",
    mixins: [formActions],
    components: {RuleBuilder},
    data() {
        return {
            sendToOptions: [
                {text: 'Fields', value: 'fields'},
                {text: 'Email', value: 'email'},
                {text: 'User groups', value: 'usergroups'},
            ],
        }
    },
    computed: {
        rule_send_type: {
            get() {
                return isEmpty(this.rules['rule_send_type']) ? 'fields' : this.rules['rule_send_type']
            },
            set(value) {
                this.$store.commit('controller/formActions/setRule', {
                    rule: 'rule_send_type',
                    value: value
                })
            }
        },
        rule_send_email: {
            get() {
                return isEmpty(this.rules['rule_send_email']) ? '' : this.rules['rule_send_email']
            },
            set(value) {
                this.$store.commit('controller/formActions/setRule', {
                    rule: 'rule_send_email',
                    value: value
                })
            }
        },
        rule_send_fields: {
            get() {
                return isEmpty(this.rules['rule_send_fields']) ? [] : this.rules['rule_send_fields'].split(',')
            },
            set(value) {
                this.$store.commit('controller/formActions/setRule', {
                    rule: 'rule_send_fields',
                    value: value.join(',')
                })
            }
        },
        rule_send_groups: {
            get() {
                return isEmpty(this.rules['rule_send_groups']) ? [] : this.rules['rule_send_groups'].split(',')
            },
            set(value) {
                this.$store.commit('controller/formActions/setRule', {
                    rule: 'rule_send_groups',
                    value: value.join(',')
                })
            }
        },
        rule_file_attach() {
            return isEmpty(this.rules['rule_file_attach']) ? [] : this.rules['rule_file_attach']
        },
        rule_image_linked: {
            get() {
                return isEmpty(this.rules['rule_image_linked']) ? false : this.rules['rule_image_linked']
            },
            set(value) {
                this.$store.commit('controller/formActions/setRule', {
                    rule: 'rule_image_linked',
                    value: value
                })
            }
        },
        attach_fields() {
            if (!this.form_questions || isEmpty(this.fqtArrayId)) return []
            return this.form_questions.filter(fq => {
                return this.fqtArrayId[fq.fq_type].fqt_name === 'file'
            })
        }
    },
    methods: {
        getFileAttachValue(fq_name) {
            return this.rule_file_attach.includes(fq_name)
        },
        setFileAttachValue(fq_name, value) {
            this.$store.commit('controller/formActions/setRule', {
                rule: 'rule_file_attach',
                value: value ? [...this.rule_file_attach, fq_name] : this.rule_file_attach.filter(item => item !== fq_name)
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

.empty-attach {
    margin: 0;
    padding-top: add($input-padding-y, $input-border-width);
    padding-bottom: add($input-padding-y, $input-border-width);
}

</style>
