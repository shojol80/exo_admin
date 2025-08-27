<template>
    <b-input-group
        class="select-form-permalink">
        <x-select
            v-bind="$attrs"
            v-on="$listeners"
            :value="value"
            :multiple="false"
            id-key="fp_id"
            label-key="fp_uri"
            :options="form_permalinks"
            :placeholder="placeholderComputed">
        </x-select>
        <b-input-group-append v-if="showEditor">
            <b-button variant="outline-secondary" @click="edit">
                <icon :icon="$icons.edit"></icon>
            </b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script>

import XFormPermalinks from '@/components/FormPermalinks/XFormPermalinks'
import FormPermalinkAside from '@/components/dialogs/FormPermalinkAside'

export default {
    name: "SelectFormPermalink",
    components: {XFormPermalinks},
    props: {
        form_id: {},
        value: {
            type: null,
        },
        placeholder: {
            type: String,
            default: "Select a permalink"
        },
        showDefaultFormPermalink: {
            type: Boolean,
            default: false,
        },
        showEditor: {
            default: true
        }
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    data() {
        return {
        }
    },
    computed: {
        form_permalinks() {
            let form = this.$store.getters['forms/getForm'](this.form_id);
            return form ? form['form_permalinks'] : []
        },
        default_form_permalink() {
            let form = this.$store.getters['forms/getForm'](this.form_id);
            return this.form_permalinks.find(item => +item.fp_id === +form.form_permalink_id)
        },
        placeholderComputed() {
            if (this.showDefaultFormPermalink && this.default_form_permalink) {
                return `Use default form permalink: ${this.default_form_permalink.fp_uri}`
            }
            return this.placeholder
        }
    },
    methods: {
        edit() {
            this.$dialogs.show(FormPermalinkAside, {
                form_id: this.form_id
            })
        }
    }
}
</script>

<style lang="scss">

</style>
