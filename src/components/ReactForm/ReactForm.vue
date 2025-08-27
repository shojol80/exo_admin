<template>
    <waiter ref="waiter">
        <action-toolbar>
            <action-group>
                <slot name="actionBefore"></slot>
                <action-button
                    title="Save"
                    :icon="$icons.save"
                    @action="submit"
                    shortkey="['ctrl', 's']">
                </action-button>
                <action-button
                    title="Reload"
                    :disabled="!react_id"
                    :icon="$icons.reload"
                    @action="load">
                </action-button>
                <action-group-separator/>
                <action-button
                    v-if="isDeveloper"
                    title="Show all fields"
                    :icon="$icons.visible"
                    :active="showAllFields"
                    @action="showAllFields=!showAllFields">
                </action-button>
                <action-button
                    v-show="isDeveloper"
                    @action="setupForm"
                    title="Edit form"
                    :icon="$icons.form">
                </action-button>
                <action-set-edition></action-set-edition>
                <action-group-separator/>
                <action-send-mailable
                    v-if="isMailable"
                    :react_id="react_id">
                </action-send-mailable>
                <action-edit-layout
                    :react_id="react_id">
                </action-edit-layout>
                <open-link
                    :title="`Open permalink - ${react_primary_permalink}`"
                    :disabled="!react_primary_permalink"
                    :react_id="this.react_id"
                    :container="this.isMailable?this.container:null">
                </open-link>
                <slot name="actionAfter"></slot>
            </action-group>
        </action-toolbar>
        <div class="mt-3 mb-3">
            <ValidationObserver ref="form" v-slot="{ invalid }">
                <form>
                    <fields-list :fq_parent_id="null"></fields-list>
                </form>
            </ValidationObserver>
        </div>
    </waiter>
</template>

<script>
import ActionEditLayout from "./components/ActionEditLayout";
import ActionSendMailable from './components/ActionSendMailable'
import ActionSetEdition from './components/ActionSetEdition'
import feFormGroup from './components/feFormGroup'
import authorization from '@/mixins/authorization'
import {R_FORM_EDIT} from '@modules/routs'
import OpenLink from "@/components/ReactForm/components/OpenLink.vue";
import ListFields from "@/components/FormBuilder/components/ListFields.vue";
import FieldsList from "@/components/ReactForm/components/FieldsList.vue";

export default {
    name: "ReactForm",
    mixins: [authorization],
    components: {
        FieldsList,
        ListFields,
        ActionSetEdition,
        feFormGroup,
        ActionSendMailable,
        ActionEditLayout,
        OpenLink
    },
    props: {
        react_id: {required: false},
        form_id: {required: false},
        container: {required: false},
        react_edition_id: {required: false}
    },
    computed: {
        showAllFields: {
            get() {
                return this.$store.state.reactForm.showAllFields
            },
            set(value) {
                this.$store.commit('reactForm/setShowAllFields', value)
            }
        },
        formconf() {
            return this.$store.getters['reactForm/formconf']
        },
        form() {
            return this.$store.getters['forms/getForm'](this.formconf.form_id) || {}
        },
        isMailable() {
            if (!this.formconf.form_id) return false
            return this.$store.getters['forms/isMailable'](this.formconf.form_id)
        },
        react_primary_permalink() {
            return this.$store.getters['reactForm/react_primary_permalink']
        }
    },
    watch: {
        react_id() {
            if (this._inactive) return;
            this.load()
        },
        form_id() {
            if (this._inactive) return;
            this.load()
        },
        '$route'() {
            this.updateBreadcrumb()
        },
        'formconf.react_id'() {
            this.updateBreadcrumb()
        }
    },
    async mounted() {
        this.showAllFields = this.isDeveloper
        this.$store.commit('reactForm/setForm')
        await this.load()
        this.updateBreadcrumb()
    },
    methods: {
        load() {
            this.$refs.waiter.wait(this.$store.dispatch('reactForm/loadReactForm', {
                form_id: this.form_id,
                react_id: this.react_id,
                container: this.container,
                react_edition_id: this.react_edition_id
            }))
        },
        async submit() {
            let success = await this.$refs.form.validate()
            if (!success) {
                this.scrollToError()
                return;
            }
            await this.$refs.waiter.wait(
                this.$store.dispatch('reactForm/submitReactForm').then(result => {
                    if (result && this.$store.getters['reactForm/react_id']) {
                        this.$emit('save', this.$store.getters['reactForm/react_id'])
                    }
                }))
        },

        scrollToError() {
            try {
                let errors = this.$refs.form.ctx.errors;
                for (const error in errors) {
                    if (errors[error].length > 0) {
                        this.$refs.form.refs[error].$el.scrollIntoView(false)
                        return
                    }
                }
            } catch (e) {
                this.$awn.alert('Form has errors.')
            }
        },
        setupForm() {
            //todo check react dirty
            let query = {};
            if (this.container) {
                query.container = this.container
            }
            this.$router.push({name: R_FORM_EDIT, params: {form_id: this.formconf.form_id, group_id: 0}, query})
        },
        updateBreadcrumb() {
            this.$store.dispatch('breadcrumb/updateLast', {label: `EDIT REACT: ${this.react_id} / FORM: ${this.form.form_name} (${this.form.form_id})`})
        },
    }
}
</script>

<style scoped lang="scss">
form {
    padding: 0 0.5rem;
}
</style>
