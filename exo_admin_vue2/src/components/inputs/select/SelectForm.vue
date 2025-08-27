<template>
    <x-select
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        :multiple="false"
        id-key="form_id"
        label-key="form_name"
        :options="forms_val"
        :placeholder="placeholder">
        <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
               :class="labelClassName">
            <span class="text-muted">[{{node.id}}]</span>
            {{ node.label }}
        </label>
        <div slot="value-label" slot-scope="{ node }">
            <span class="text-muted">[{{node.id}}]</span>
            {{ node.label }}
        </div>
    </x-select>
</template>

<script>
import xListeners from '@/mixins/xListeners'

export default {
    name: "SelectForm",
    /*mixins:[xListeners]*/
    props: {
        value: {
            type: null,
        },
        placeholder: {
            type: String,
            default: "Select a form"
        },
        /**
         * Filter only by this forms, true show all forms
         */
        forms: {
            type: [Array, Boolean],
            default() {
                return []
            }
        },
        /**
         * Exclude this forms from list
         * */
        excludeForms: {
            type: Array,
            default() {
                return []
            }
        },
        filter: {
            type: Function,
        }
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    data() {
        return {}
    },
    computed: {
        forms_val() {
            let forms = this.$store.getters['forms/forms']

            if (this.filter) {
                forms = forms.filter(this.filter);
            }
            if (this.forms !== true) {
                forms = forms.filter(form => this.forms.find(fi => +fi.form_id === +form.form_id))
            }
            if (this.excludeForms.length > 0) {
                forms = forms.filter(form => !this.excludeForms.find(fi => fi.form_id === form.form_id))
            }
            return forms
        }
    },
    methods: {}
}
</script>
