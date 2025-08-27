<template>
    <waiter ref="waiter" class="exolog-form">
        <ValidationObserver ref="observer" v-slot="{invalid}">
            <action-toolbar>
                <action-group class="mr-2">
                    <action-back></action-back>
                    <action-group-separator></action-group-separator>
                    <ValidationProvider rules="required" name="name" slim>
                        <action-input
                            ref="name"
                            slot-scope="{ valid, errors }"
                            :valid="valid"
                            :errors="errors"
                            v-model="form.form_name"></action-input>
                    </ValidationProvider>
                    <action-button title="Save" :icon="$icons.save" @action="save"
                                   shortkey="['ctrl', 's']">
                    </action-button>
                    <action-button :disabled="form_id==='new'" title="Reload" :icon="$icons.reload"
                                   @action="load">
                    </action-button>
                    <action-group-separator></action-group-separator>
                    <action-button :disabled="form_id==='new'" title="Related reactions" :icon="$icons.react"
                                   @action="onReactions">
                    </action-button>
                    <action-button :disabled="form_id==='new'" title="Create new reaction" :icon="$icons.react_add"
                                   @action="onNewReact">
                    </action-button>
                </action-group>
            </action-toolbar>
            <b-tabs class="x-tabs">
                <b-tab ref="questionsTab" active class="exolog-form__questions">
                    <template #title>
                        <icon :icon="$icons.wizard"></icon>
                        Fields
                    </template>
                    <form-builder v-model="form" :container="container"></form-builder>
                </b-tab>
                <b-tab ref="propertiesTab" class="">
                    <template #title>
                        <icon :icon="$icons.properties"></icon>
                        Properties
                    </template>
                    <x-form-input
                        title="Form ID"
                        v-model="form.form_id"
                        db-field="form_id"
                        readonly>
                    </x-form-input>

                    <x-form-input
                        title="Subject template"
                        v-model="form.form_mailsubject"
                        description="You can use field name, react_ and form_ standard fields for substitutions. Ex {menu_title}-{name}"
                        db-field="form_mailsubject">
                    </x-form-input>

                    <x-form-group
                        title="Default react permalink"
                        db-field="form_permalink_id"
                        description="You can use field name, react_ and form_ standard fields for substitutions. Ex /{form_name}/{menu_title}">
                        <select-form-permalink
                            :form_id="form.form_id"
                            v-model="form.form_permalink_id"
                        ></select-form-permalink>
                    </x-form-group>

                    <!--                    <x-form-input
                                            title="Default redirect"
                                            v-model="form.form_redir_url"
                                            db-field="form_redir_url"
                                            description="Blank - redirect to current page. You can use field name, for substitutions. Ex {field_name}">
                                        </x-form-input>-->

                    <x-form-text-area
                        title="Info"
                        v-model="form.form_info">
                    </x-form-text-area>

                </b-tab>
                <b-tab>
                    <template #title>
                        <icon :icon="$icons.variables"></icon>
                        Variables
                    </template>
                    <vars-editor
                        v-model="form.vars">
                    </vars-editor>
                </b-tab>
            </b-tabs>
        </ValidationObserver>
    </waiter>
</template>

<script>

import forms from '@/services/api/forms'
import {R_FORM_EDIT, R_REACT_EDIT, R_REACTS_TABLE} from '@/router/routs'
import FormBuilder from '@/components/FormBuilder'
import presetHelper from '@/components/FormBuilder/mixins/presetHelper'
import PromptNewReactDialog from '@/components/dialogs/PromptNewReactDialog'
import XFormControl from '@/components/forms/mixins/xFormControl'
import VarsEditor from "@/components/Vars/VarsEditor.vue";

export default {
    name: 'Form',
    mixins: [presetHelper],
    components: {VarsEditor, XFormControl, FormBuilder},
    props: {
        form_id: {
            required: true,
        },
        group_id: {
            required: true,
            default: 0
        },
        preset: {
            required: false,
        }
    },
    data() {
        return {
            form: this.buildForm(),
        }
    },
    computed: {
        container() {
            return this.$route.query.container
        }
    },
    watch: {
        form_id(newVal, oldVal) {
            if (newVal !== oldVal) this.load()
        }
    },
    mounted() {
        this.load()
        this.$store.dispatch('breadcrumb/updateLast', {label: `Edit form: ${this.$route.params.form_id}`})
    },

    methods: {
        new() {
            let preset = this.$route.query.preset ? this.$route.query.preset : '_blank'
            this.form = this.buildForm(this.ECO.forms.preset_form[preset].form)
            this.$nextTick(() => {
                this.$refs.name.focus()
            })
        },
        async load() {
            if (!this.form_id) {
                this.$awn.alert('Prop "form_id" is not defined!');
                return
            }

            if (this.form_id === 'new') {
                this.new()
                return
            }
            await this.$refs.waiter.wait(true)
            try {
                this.form = await forms.getForm({
                    form_id: this.form_id,
                    container: this.container
                })
            } finally {
                await this.$refs.waiter.wait(false)
            }
        },
        async save() {
            let isValid = await this.$refs.observer.validate();
            if (!isValid) {
                this.$refs.propertiesTab.activate()
                return
            }
            await this.$refs.waiter.wait(true)
            try {
                console.log({...this.form})
                const response = await forms.saveForm({
                    ...this.form,
                    form_permalink_id: this.form.form_permalink_id ? this.form.form_permalink_id : null,
                    container: this.container,
                    group_id: this.group_id > 0 && this.form_id === 'new' ? this.group_id : null
                })

                if (this.form_id === 'new') {
                    await this.$router.replace({
                        name: R_FORM_EDIT,
                        params: {
                            form_id: response['form_id'],
                            group_id: this.group_id
                        },
                        query: this.$route.query
                    })
                } else {
                    await this.load()
                }
            } finally {
                await this.$refs.waiter.wait(false)
            }
        },
        onReactions() {
            this.$router.push({
                name: R_REACTS_TABLE,
                params: {backRoute: true},
                query: {forms: [this.form.form_id]}
            })
        },
        async onNewReact() {
            let event = await this.$dialogs.show(PromptNewReactDialog, {
                forms: true,
                defaults: {
                    form_id: this.form.form_id
                }
            })
            if (event.trigger !== 'ok' || !event.value) return
            await this.$router.push({
                name: R_REACT_EDIT,
                params: {react_id: 'new'},
                query: event.value
            })
        },
        getFormForSave() {
            return this.form
        },
    }
}
</script>

<style lang="scss">

@import "src/assets/scss/vue-component";

.exolog-form {
    &__questions.tab-pane {
        padding-left: 0;
        padding-top: 0;
        background-color: $exo-bg;
    }
}
</style>
