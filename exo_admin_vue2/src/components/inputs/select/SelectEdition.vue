<template>
    <x-select
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        :multiple="false"
        id-key="e_id"
        label-key="e_title"
        :options="editions_val"
        :placeholder="placeholder">
        <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
               :class="labelClassName">
            <span class="text-muted">[{{ node.id }}]</span>
            {{ node.label }} <span class="text-muted" v-if="+node.raw.e_isdefault">(default)</span>
        </label>
        <div slot="value-label" slot-scope="{ node }">
            <span class="text-muted">[{{ node.id }}]</span>
            {{ node.label }} <span class="text-muted" v-if="+node.raw.e_isdefault">(default)</span>
        </div>
    </x-select>
</template>

<script>
import xListeners from '@/mixins/xListeners'

export default {
    name: "SelectEdition",
    /*mixins:[xListeners]*/
    props: {
        value: {
            type: null,
        },
        placeholder: {
            type: String,
            default: "Select an edition"
        },
        /*
        /!**
         * Filter only by this editions, true show all forms
         *!/
        editions: {
            type: [Array, Boolean],
            default() {
                return []
            }
        },
        /!**
         * Exclude this editions from list
         * *!/
        excludeEdition: {
            type: Array,
            default() {
                return []
            }
        }*/
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    data() {
        return {}
    },
    computed: {
        editions_val() {
            let editions = this.$store.getters['pages/editions']

            /*if (this.forms !== true) {
                forms = forms.filter(form => this.forms.find(fi => +fi.form_id === +form.form_id))
            }
            if (this.excludeForms.length > 0) {
                forms = forms.filter(form => !this.excludeForms.find(fi => fi.form_id === form.form_id))
            }*/
            return editions
        }
    },
    methods: {}
}
</script>
