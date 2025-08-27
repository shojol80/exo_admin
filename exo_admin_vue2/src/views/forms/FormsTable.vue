<template>
    <waiter ref="tableWaiter">
        <action-table :name="'Forms'"
                      ref="table"
                      table-type="server"
                      :columns="columns"
                      :options="options"
                      class="forms-table"
                      @row-click="onRowClick">
            <template #actions="props">
                <action-group>
                    <action-button @action="onActionNew()"
                                   title="New form"
                                   :icon="$icons.new"
                                   shortkey="['ctrl', 'o']">
                    </action-button>
                    <action-button v-show="props.rows && props.rows.length===1"
                                   @action="onActionEdit(props.rows)"
                                   title="Edit form"
                                   :icon="$icons.edit">
                    </action-button>
                    <action-button v-show="props.rows && props.rows.length>0"
                                   @action="onActionDelete(props.rows)"
                                   title="Delete form"
                                   :icon="$icons.delete">
                    </action-button>
                    <action-button v-show="props.rows && props.rows.length>0"
                                   @action="onActionAddToGroup(props.rows)"
                                   title="Add to group ..."
                                   :icon="$icons.group_add">
                    </action-button>
                    <action-button v-show="props.rows && props.rows.length>0 && group_id>0"
                                   @action="onActionRemoveFromGroup(props.rows)"
                                   title="Remove from this group"
                                   :icon="$icons.group_remove">
                    </action-button>
                    <action-group-separator></action-group-separator>
                    <action-button @action="load"
                                   title="Reload"
                                   :icon="$icons.reload">
                    </action-button>
                </action-group>
            </template>
            <template #col-action="props">
                <action-group @click.stop="void 0">
                    <action-button @action="onActionDelete([props.row])"
                                   title="Delete form"
                                   :icon="$icons.delete">
                    </action-button>
                    <action-button
                        @action="onActionAddToGroup([props.row])"
                        title="Add to group"
                        :icon="$icons.group_add">
                    </action-button>
                    <action-button
                        v-show="group_id>0"
                        @action="onActionRemoveFromGroup([props.row])"
                        title="Remove from this group"
                        :icon="$icons.group_remove">
                    </action-button>
                </action-group>
            </template>
            <template #contextmenu="props">
                <x-context-menu-item
                    v-show="props.rows && props.rows.length===1"
                    @click="onActionEdit(props.rows)"
                    :icon="$icons.edit">
                    Edit
                </x-context-menu-item>
                <x-context-menu-item
                    @click="onActionDelete(props.rows)"
                    :icon="$icons.delete">
                    Delete
                </x-context-menu-item>
                <x-context-menu-item
                    @click="onActionAddToGroup(props.rows)"
                    :icon="$icons.group_add">
                    Add to group ...
                </x-context-menu-item>
                <x-context-menu-item
                    v-show="group_id>0"
                    @click="onActionRemoveFromGroup(props.rows)"
                    :icon="$icons.group_remove">
                    Remove from this group
                </x-context-menu-item>
            </template>
        </action-table>
    </waiter>
</template>

<script>
import forms from '@/services/api/forms'
import {R_FORM_EDIT} from '@/router/routs'
import transformTree from "@/shared/transformTree"
import groups from '@/services/api/groups'
import ContextMenu from '@/components/FileManager/components/blocks/ContextMenu'
import SelectDialog from '@/components/dialogs/SelectDialog'

export default {
    name: "FormsTable",
    components: {ContextMenu},
    props: {
        group_id: null
    },
    data() {
        return {
            group_type: 'form',
            columns: [
                'col-check',
                'form_id',
                'form_name',
                'form_info',
                'col-action'
            ],
            options: {
                useFilterSearchQuery: true,
                useFilterByColumn: true,
                filterableColumns: [
                    'form_id',
                    'form_name',
                    'form_info',
                ],
                requestFunction: this.requestFunction,
                debounce:500,
                sortable: [
                    'form_id',
                    'form_name',
                    'form_info'
                ],
                uniqueKey: 'form_id',
                headings: {
                    'form_id': 'ID',
                    'form_name': 'Name',
                    'form_info': 'Info',
                },
            },
        }
    },
    computed: {
        presetForms() {
            return Object.values(this.ECO.forms.preset_form)
        }
    },
    watch: {
        group_id(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.load()
            }
        }
    },
    methods: {
        async requestFunction(params) {
            if (this.group_id && +this.group_id !== 0) {
                params.group_id = this.group_id
            }
            try {
                this.loading = true;
                return await forms.getForms(params)
            } finally {
                this.loading = false;
            }
        },

        load() {
            this.$refs.table.refresh()
        },

        async onActionNew() {

            let event = await this.$dialogs.show(SelectDialog, {
                title: 'Select a predefined form',
                tree: this.presetForms,
                default: this.presetForms[0]['name'],
                treeProps: {
                    idKey: 'name',
                    labelKey: 'name',
                }
            })
            if (event.trigger !== 'ok') return

            await this.$router.push({
                name: R_FORM_EDIT,
                params: {form_id: 'new', group_id: this.group_id},
                query: {preset: event.value}
            })
        },

        onActionDelete(rows) {
            let form, message
            if (rows.length === 1) {
                message = `Are you sure want to delete form "${rows[0]['form_name']}"?`
                form = rows[0];
            } else {
                message = `Are you sure want to delete "${rows.length}" forms?`
                form = {form_id: rows.map(row => row['form_id'])}
            }
            this.$dialogs.confirmDelete({
                title: 'Delete form',
                message: message
            }).then(event => {
                if (event.trigger !== 'ok') return
                forms.deleteForm(form).then(this.load)
            })

        },

        onActionEdit(rows) {
            this.$router.push({name: R_FORM_EDIT, params: {form_id: rows[0]['form_id']}})
        },

        onActionAddToGroup(rows) {
            groups.getGroupTree({group_type: this.group_type})
                .then(data => transformTree(data, {
                    'group_id': 'id',
                    'group_name': 'label',
                    'children': 'children'
                }, 'children'))
                .then(data => {
                    this.$dialogs.show(SelectDialog, {
                        title: 'Add to group',
                        tree: data,
                    }).then(event => {
                        if (event.trigger !== 'ok') return
                        const forms = rows.map(item => item['form_id']);
                        groups.addRelation({
                            group_type: this.group_type,
                            r_obj: forms,
                            group_id: event.value
                        }).then(() => this.load())
                    })
                });
        },

        onActionRemoveFromGroup(rows) {
            if (rows.length === 0) return
            let message = rows.length > 1 ? `Do you want remove <b>${rows.length}</b> forms from this group?` : `Do you want remove form <b>${rows[0]['form_name']}</b> from this group?`
            this.$dialogs.confirm({
                okTitle: 'REMOVE',
                message
            }).then(event => {
                if (event.trigger !== 'ok') return
                const forms = rows.map(item => item['form_id']);
                groups.removeRelation({
                    group_type: this.group_type,
                    r_obj: forms,
                    group_id: this.group_id
                })
                    .then(() => this.load())
            })
        },

        onRowClick(e) {
            this.onActionEdit([e.row])
        }
    },

}
</script>

<style lang="scss">

.forms-table {

    .VueTables__search {
        //margin-left: auto;
        display: flex;
    }

    &__search {
        min-width: 250px;
    }

    .col-form_id {
        width: 80px;
    }

    .col-form_name {
        width: 200px
    }

    .col-form_info {
        max-width: 150px;
    }
}
</style>
