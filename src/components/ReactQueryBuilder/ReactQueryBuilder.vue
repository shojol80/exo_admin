<template>
    <x-query-builder
        class="react-query-builder"
        :labels="labels"
        :rules="rules"
        :value="value"
        @input="$emit('input', $event)">
    </x-query-builder>
</template>

<script>

import XQueryBuilder from '@/components/XQueryBuilder/XQueryBuilder'
import FieldInput from './FieldInput'

export default {
    name: "ReactQueryBuilder",
    components: {XQueryBuilder},
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        value: {
            type: Object,
            required: true
        },
        forms: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            labels: {
                "matchType": "Match Type",
                "matchTypes": [
                    {"id": "AND", "label": "AND"},
                    {"id": "OR", "label": "OR"}
                ],
                "addRule": "Add Rule",
                "removeRule": "&times;",
                "addGroup": "Add Group",
                "removeGroup": "&times;",
                "textInputPlaceholder": "value",
            },
        }
    },
    computed: {
        rules() {
            let rules = [
                this.composeFieldRule({
                    id: 'react_id',
                    label: 'react_id',
                }),
                this.composeFieldRule({
                    id: 'react_edition_id',
                    label: 'react_edition_id',
                }),
                this.composeFieldRule({
                    id: 'react_form_permalink_id',
                    label: 'react_form_permalink_id',
                }),
                this.composeFieldRule({
                    id: 'form_name',
                    label: 'form_name',
                })
            ]
            this.forms.map(form_id => {
                let form = this.$store.getters['forms/getForm'](form_id)
                let res = []
                form.form_questions.forEach(fq => {
                    if (!rules.find(i => i.id === fq.fq_name)) {
                        rules.push(
                            this.composeFieldRule({
                                id: fq.fq_name,
                                label: fq.fq_name,
                            })
                        )
                    }
                })
                return res
            })
            return rules
        }
    },
    methods: {
        composeFieldRule(field) {
            let operators = [
                '=', '<', '>', '<=', '>=', '!=',
                'LIKE', 'NOT LIKE',
                'EMPTY',
                'NOT EMPTY',
                'IN',
                'NOT IN'
            ]
            if (field.id === 'permalink') {
                operators = [
                    '=', '<', '>', '<=', '>=', '!=',
                    'LIKE', 'NOT LIKE',
                ]
            }
            return {
                type: "custom-component",
                component: FieldInput,
                operators: operators,
                default: '',
                ...field
            }
        }
    }

}
</script>

<style lang="scss">
.react-query-builder {
    .vqb-rule {
        .form-inline > label {
            font-weight: bold;
            font-style: italic;
            min-width: 10%;
            text-align: left;
            display: block;
        }
    }
}
</style>
