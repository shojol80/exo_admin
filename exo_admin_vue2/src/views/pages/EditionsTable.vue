<template>
    <waiter ref="tableWaiter" :show="loading">
        <action-table name="Editions"
                      ref="table"
                      table-type="server"
                      :columns="columns"
                      :options="options"
                      class="editions-table"
                      @row-click="onRowClick">
            <template #actions="props">
                <action-group>
                    <action-button @action="onActionNew()"
                                   title="New edition"
                                   :icon="$icons.new"
                                   shortkey="['ctrl', 'o']">
                    </action-button>
                    <action-button v-show="props.rows && props.rows.length===1"
                                   @action="onActionEdit(props.rows)"
                                   title="Edit edition"
                                   :icon="$icons.edit">
                    </action-button>
                    <action-button v-show="props.rows && props.rows.length>0"
                                   @action="onActionDelete(props.rows)"
                                   title="Delete edition"
                                   :icon="$icons.delete">
                    </action-button>
                    <action-group-separator></action-group-separator>
                    <action-button @action="load"
                                   title="Reload"
                                   :icon="$icons.reload">
                    </action-button>
                    <action-group-separator></action-group-separator>
                    <action-button v-show="props.rows && props.rows.length===1"
                                   @action="onActionDefault(props.rows)"
                                   title="Set as default"
                                   :icon="$icons.pin">
                    </action-button>
                </action-group>
            </template>
            <template #col-action="props">
                <action-group @click.stop="void 0">
                    <action-button @action="onActionDefault([props.row])"
                                   title="Set as default"
                                   :icon="$icons.pin">
                    </action-button>
                    <action-button @action="onActionEdit([props.row])"
                                   title="Edit edition"
                                   :icon="$icons.edit">
                    </action-button>
                    <action-button @action="onActionDelete([props.row])"
                                   title="Delete edition"
                                   :icon="$icons.delete">
                    </action-button>
                </action-group>
            </template>
            <template #contextmenu="props">
                <x-context-menu-item
                    v-show="props.rows && props.rows.length===1"
                    @click="onActionDefault(props.rows)"
                    :icon="$icons.pin">Set as default
                </x-context-menu-item>
                <x-context-menu-item
                    v-show="props.rows && props.rows.length===1"
                    @click="onActionEdit(props.rows)"
                    :icon="$icons.edit">Edit
                </x-context-menu-item>
                <x-context-menu-item
                    @click="onActionDelete(props.rows)"
                    :icon="$icons.delete">
                    Delete
                </x-context-menu-item>
            </template>
            <!--Columns-->
            <template #e_isdefault="props">
                <span v-if="props.row.e_isdefault==1" class="badge badge-secondary">default</span>
            </template>
            <template #e_date="props">
                {{ formatDate(props.row.e_date) }}
            </template>
        </action-table>
    </waiter>
</template>

<script>

import {debounce} from "lodash"
import {R_EDITION_EDIT} from '@/router/routs'
import editions from "@/services/api/editions";
import formatDate from "@modules/utils/formatDate";

export default {
    name: "EditionsTable",
    props: {},
    data() {
        return {
            loading: false,
            columns: [
                'col-check',
                'e_id',
                'e_title',
                'e_info',
                'e_isdefault',
                'e_date',
                'col-action'
            ],
            options: {
                requestFunction: this.requestFunction,
                useFilterSearchQuery: true,
                useFilterByColumn: true,
                filterableColumns: [
                    'e_id',
                    'e_title',
                    'e_info',
                ],
                sortable: [
                    'e_id',
                    'e_title',
                ],
                uniqueKey: 'e_id',
                headings: {
                    'e_id': 'ID',
                    'e_title': 'Title',
                    'e_info': 'Info',
                    'e_isdefault': 'Default',
                    'e_date': 'Date created',
                },
            },
        }
    },
    watch: {
        searchQuery: function () {
            this.debounceQuery(this)
        },
    },
    mounted() {
        this.load()
    },
    methods: {
        formatDate,
        async requestFunction(params) {
            this.loading = true;
            let data = await editions.getEditions(params);
            this.loading = false;
            return data;
        },

        async load() {
            this.$refs.table.refresh();

            /*let params = {}

            if (this.searchQuery) {
                params.search = '%' + this.searchQuery + '%'
                params.allowContentSearch = true
                params.search_fields = [
                    'e_id',
                    'e_title',
                    'e_alias'
                ]
            }

            let data = await this.$refs.tableWaiter.wait(pages.getEditions(params))
            this.editions = Object.values(data)*/
        },

        debounceQuery: debounce(function (vm) {
            vm.load()
        }, 800),


        onActionNew() {
            this.$router.push({
                name: R_EDITION_EDIT,
                params: {
                    e_id: 'new',
                },
            })
        },

        async onActionDelete(rows) {
            let ids, message
            if (rows.length === 1) {
                message = `Are you sure want to delete edition "${rows[0]['e_title']}"?`
                ids = rows[0];
            } else {
                message = `Are you sure want to delete "${rows.length}" editions?`
                ids = {e_id: rows.map(row => row['e_id'])}
            }
            let response = await this.$dialogs.confirmDelete({
                title: 'Delete edition',
                message: message
            })
            if (response.trigger !== 'ok') return
            await editions.deleteEdition(ids)
            await this.load()
        },

        onActionEdit(rows) {
            this.$router.push({
                name: R_EDITION_EDIT,
                params: {e_id: rows[0]['e_id']},
            })
        },

        onRowClick(e) {
            this.onActionEdit([e.row])
        },
        async onActionDefault(rows) {
            await editions.setDefaultEdition({e_id: rows[0].e_id})
            await this.load()
        }
    },
}
</script>

<style lang="scss">

.editions-table {

    &__search {
        min-width: 250px;
    }

    .col-e_id {
        width: 80px;
    }

    .col-e_title {
        max-width: 300px
    }

    .col-e_date {
        width: 150px;
    }
}
</style>
