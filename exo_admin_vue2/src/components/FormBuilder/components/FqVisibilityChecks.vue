<template>
    <div>
        <x-form-group
            title="Visibility"
            :control-padding="true">
            <x-switch :disabled="disabled" v-model="visibility_form_new">new</x-switch>
            <x-switch :disabled="disabled" v-model="visibility_form" class="ml-3">edit</x-switch>
        </x-form-group>
        <x-form-group
            v-if="is_custom_fields"
            :control-padding="true"
            title="Group visibility">
            <x-switch :disabled="disabled" v-model="group_new">new</x-switch>
            <x-switch :disabled="disabled" v-model="group" class="ml-3">edit</x-switch>
        </x-form-group>
    </div>
</template>
<script>
import store from "@/components/FormBuilder/store";

export default {
    name: 'FqVisibilityChecks',
    props: {
        fq: {}
    },
    computed: {
        disabled() {
            return this.fq.fq_name === 'menu_title' || this.fq.fq_name === 'publish'
        },
        form() {
            return store.form
        },
        container() {
            return store.container
        },
        is_custom_fields() {
            return _.get(this.form.form_options, `containers.${this.container}.is_custom_fields`, 0)
        },
        visibility_form: {
            get() {
                if (this.disabled) return 1
                return _.get(this.fq.fq_visibility, `form`, 0)
            },
            set(value) {
                this.fq.fq_visibility.form = value
            },
        },
        visibility_form_new: {
            get() {
                if (this.disabled) return 1
                return _.get(this.fq.fq_visibility, `form_new`, 0)
            },
            set(value) {
                this.fq.fq_visibility.form_new = value
            },
        },
        group_new: {
            get() {
                if (this.disabled) return 1
                return _.get(this.fq.fq_visibility, `containers.${this.container}.group_new`, 0)
            },
            set(value) {
                if (Array.isArray(this.fq.fq_visibility.containers)) this.fq.fq_visibility.containers = {}
                _.set(this.fq.fq_visibility, `containers.${this.container}.group_new`, value)
            }
        },
        group: {
            get() {
                if (this.disabled) return 1
                return _.get(this.fq.fq_visibility.containers, `${this.container}.group`, 0)
            },
            set(value) {
                if (Array.isArray(this.fq.fq_visibility.containers)) this.fq.fq_visibility.containers = {}
                _.set(this.fq.fq_visibility.containers, `${this.container}.group`, value)
            }
        }
    }
}
</script>
