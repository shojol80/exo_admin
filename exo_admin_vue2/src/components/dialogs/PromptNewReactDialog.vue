<template>
    <dialog-modal
        v-bind="$dialogsProps"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :ok-disabled="!localValue.form_id || !localValue.react_edition_id"
        ref="modal">
        <b-form-group label-cols="2" label="Form">
            <select-form v-model="localValue.form_id"
                         value-format="id"
                         :required="true"
                         :clearable="false"
                         :forms="forms"
                         :exclude-forms="excludeForms"/>
        </b-form-group>
        <b-form-group label-cols="2" label="Edition" class="mb-0">
            <select-edition
                v-model="localValue.react_edition_id"
                value-format="id"
                :required="true"
                :clearable="false">
            </select-edition>
        </b-form-group>
    </dialog-modal>
</template>

<script>


import withBModal from "@modules/dialogs/mixins/withBModal";

export default {
    name: 'PromptNewReactDialog',
    mixins: [withBModal],
    props: {
        title: {default: 'Create new React'},
        forms: [Array, Boolean],
        excludeForms: Array,
        defaults: {
            type: Object,
            default() {
                return {
                    form_id: null,
                    react_edition_id: this.currentEdition
                }
            }
        },
    },
    data() {
        return {
            // define the default value
            localValue: {
                form_id: null,
                react_edition_id: null
            },
        }
    },
    computed: {
        currentEdition() {
            return this.$store.state.exolog.defaults.edition
        }
    },
    mounted() {
        if (this.defaults.form_id) {
            this.localValue.form_id = this.defaults.form_id
        }
        if (this.defaults.react_edition_id) {
            this.localValue.react_edition_id = this.defaults.react_edition_id
        } else {
            this.localValue.react_edition_id = this.currentEdition
        }
    },
    methods: {}
}
</script>

