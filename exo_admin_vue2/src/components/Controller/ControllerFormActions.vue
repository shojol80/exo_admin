<template>
    <div class="controller-actions">
        <waiter ref="waiter">
            <action-toolbar>
                <action-group>
                    <action-back :back-route="backRoute"></action-back>
                    <action-button title="Save" :icon="$icons.save" @action="save"
                                   shortkey="['ctrl', 's']">
                    </action-button>
                    <action-button title="Reload"
                                   :icon="$icons.reload"
                                   @action="load">
                    </action-button>
                </action-group>
            </action-toolbar>
            <div class="mt-3">
                <component :is="ruleComponent"></component>
            </div>
        </waiter>
    </div>
</template>

<script>
import RedirectFormActions from './components/formActions/RedirectFormActions'
import MailFormActions from './components/formActions/MailFormActions'
import {R_CONTROLLER} from '@/router/routs'

export default {
    name: "ControllerActions",
    components: {MailFormActions, RedirectFormActions},
    props: {
        react_id: {
            required: true
        }
    },
    data() {
        return {
            backRoute: R_CONTROLLER
        }
    },
    computed: {
        ruleComponent() {
            if (this.react.react_form_name) {
                return this.$store.getters['forms/isMailable'](this.react.react_form) ? MailFormActions : RedirectFormActions
            }
        },
        rulesName() {
            if (this.react.react_form_name) {
                return this.$store.getters['forms/isMailable'](this.react.react_form) ? 'mail_rules' : 'redir_rules'
            }
        },
        react() {
            let item = this.$store.getters['controller/getItem'](this.react_id)
            return item ? item.react : {}
        },
        form() {
            return this.$store.getters['forms/getForm'](this.react.react_form)
        },
    },
    watch: {
        rulesName: {
            async handler() {
                await this.load()
            }
        }
    },
    mounted(){
        this.load()
    },
    methods: {
        async load() {
            if (!this.rulesName) return
            await this.$refs.waiter.wait(
                this.$store.dispatch('controller/formActions/loadRules', {
                    react_id: this.react_id,
                    rules_name: this.rulesName
                }))
        },
        async save() {
            await this.$refs.waiter.wait(
                this.$store.dispatch('controller/formActions/saveRules', {
                        react_id: this.react_id,
                        rules_name: this.rulesName
                    }
                )
            )
        },
    }
}
</script>
