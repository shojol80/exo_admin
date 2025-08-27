<template>
    <action-table
        class="search-params"
        :hover-row="false"
        name="forms"
        :data="params.forms"
        :columns="columns"
        :options="options"
        ref="table">
        <template #actions="props">
            <action-group>
                <slot name="actionBefore"></slot>
                <action-button title="Add form" :icon="$icons.add" @action="addForm"
                               shortkey="['ctrl', 'o']">
                </action-button>
                <slot name="actionAfter"></slot>
            </action-group>
        </template>
        <template slot="form_questions" slot-scope="props">
            <div>
                <x-select
                    v-model="params.forms[findForm(props.row)].form_questions"
                    :multiple="true"
                    :options="allFormFields(props.row)"
                    id-key="fq_id"
                    label-key="fq_name">
                </x-select>
            </div>
        </template>
        <template slot="edit" slot-scope="props">
            <action-group @click.stop="void 0">
                <action-button @action="onDeleteForm(props.row)" title="Delete"
                               :icon="$icons.delete">
                </action-button>
            </action-group>
        </template>
    </action-table>
</template>

<script>
import SelectFormDialog from '@/components/dialogs/SelectFormDialog'
import paramsParse from '@/components/search/mixins/paramsParse'

export default {
    name: 'SearchParams',
    mixins: [paramsParse],
    model: {
        prop: 'params',
        event: 'change'

    },
    props: {
        params: {
            type: Object,
            default() {
                return {
                    forms: []
                }
            }
        }
    },
    data() {
        return {
            columns: [
                'form_name',
                'form_questions',
                'edit'
            ],
            options: {
                sortable: [],
                uniqueKey: 'form_name',
                headings: {
                    'form_name': 'Form',
                    'form_questions': 'Fields',
                    'edit': '',
                },
                columnsClasses: {
                    'form_name': 'col-form_name',
                    'form_questions': 'col-fields',
                    'edit': 'col-edit'
                },
            }
        }
    },

    methods: {
        async addForm() {
            let event = await this.$dialogs.show(SelectFormDialog, {
                forms: true,
                excludeForms: this.forms
            })
            if (event.trigger !== 'ok' || !event.value) return
            let form = event.value

            this.params.forms.push(Object.assign({}, {
                form_id: form.form_id,
                form_name: form.form_name,
                form_questions: []
            }))
        },
        onDeleteForm(row) {
            this.params.forms.splice(this.params.forms.findIndex(form => form.form_id === row.form_id), 1)
        },
        allFormFields(row) {
            return this.allForms[this.allForms.findIndex(form => +form.form_id === +row.form_id)]['form_questions']
        },
        findForm(row) {
            return this.params.forms.findIndex(form => +form.form_id === +row.form_id)
        },
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.search-params {
    .col-form_name {
        width: 300px;
    }

    .col-edit {
        width: 50px;

        .action-group {
            justify-content: flex-end;
        }
    }
}
</style>
