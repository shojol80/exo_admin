<template>
    <app-screen>
        <div class="editions-table">
        <waiter ref="tableWaiter" :show="loading">
            <!-- Action Toolbar -->
            <div class="mb-3">
                <action-group>
                    <action-button @action="onActionNew()"
                                   title="New edition"
                                   :icon="$icons.new"
                                   shortkey="['ctrl', 'o']">
                        New Edition
                    </action-button>
                    <action-button v-show="selectedRows.length === 1"
                                   @action="onActionEdit(selectedRows)"
                                   title="Edit edition"
                                   :icon="$icons.edit">
                        Edit
                    </action-button>
                    <action-button v-show="selectedRows.length > 0"
                                   @action="onActionDelete(selectedRows)"
                                   title="Delete edition"
                                   :icon="$icons.delete">
                        Delete
                    </action-button>
                    <action-group-separator></action-group-separator>
                    <action-button @action="load"
                                   title="Reload"
                                   :icon="$icons.reload">
                        Refresh
                    </action-button>
                    <action-button v-show="selectedRows.length === 1"
                                   @action="onActionDefault(selectedRows)"
                                   title="Set as default"
                                   :icon="$icons.pin">
                        Set Default
                    </action-button>
                </action-group>
            </div>

            <!-- Vue3 Easy Data Table -->
            <EasyDataTable
                ref="dataTable"
                v-model:items-selected="selectedRows"
                :headers="headers"
                :items="editions"
                :loading="loading"
                show-select
                alternating
                border-cell
                buttons-pagination
                :rows-per-page="25"
                :rows-per-page-options="[10, 25, 50, 100]"
                :search-field="searchField"
                :search-value="searchValue"
                @click-row="onRowClick"
                class="editions-data-table">

                <!-- Custom column templates -->
                <template #item-e_isdefault="item">
                    <span v-if="item.e_isdefault == 1" class="badge bg-success">Default</span>
                    <span v-else class="badge bg-secondary">No</span>
                </template>

                <template #item-e_date="item">
                    {{ formatDate(item.e_date) }}
                </template>

                <template #item-actions="item">
                    <action-group @click.stop="void 0">
                        <action-button @action="onActionDefault([item])"
                                       title="Set as default"
                                       :icon="$icons.pin"
                                       size="sm">
                        </action-button>
                        <action-button @action="onActionEdit([item])"
                                       title="Edit edition"
                                       :icon="$icons.edit"
                                       size="sm">
                        </action-button>
                        <action-button @action="onActionDelete([item])"
                                       title="Delete edition"
                                       :icon="$icons.delete"
                                       size="sm">
                        </action-button>
                    </action-group>
                </template>

                <!-- Empty state -->
                <template #empty-message>
                    <div class="text-center text-muted py-4">
                        <i :class="$icons.info" class="fs-1 mb-2"></i>
                        <p>No editions found</p>
                    </div>
                </template>
            </EasyDataTable>


        </waiter>
        </div>
    </app-screen>
</template>

<script>
import {debounce} from "lodash"
import {R_EDITION_EDIT} from '@/router/routs'
import editions from "@/services/api/editions";
import formatDate from "@modules/utils/formatDate";
// EasyDataTable is now globally registered in main.js

export default {
    name: "EditionsTable",
    // EasyDataTable is globally registered
    props: {},
    data() {
        return {
            loading: false,
            editions: [],
            selectedRows: [],
            searchField: ['e_title', 'e_info'],
            searchValue: '',
            headers: [
                { text: "ID", value: "e_id", sortable: true, width: 80 },
                { text: "Title", value: "e_title", sortable: true, width: 200 },
                { text: "Info", value: "e_info", sortable: false },
                { text: "Default", value: "e_isdefault", sortable: true, width: 100 },
                { text: "Date Created", value: "e_date", sortable: true, width: 150 },
                { text: "Actions", value: "actions", sortable: false, width: 120 }
            ]
        }
    },
    watch: {
        editions() {
            this.selectedRows = [];
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        formatDate,
        async load() {
            this.loading = true;
            try {
                let params = {};
                let data = await editions.getEditions(params);
                this.editions = data.data || data || [];
            } catch (error) {
                console.error('Error loading editions:', error);
                this.editions = [];
            } finally {
                this.loading = false;
            }
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

        onRowClick(edition) {
            this.onActionEdit([edition])
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
    .editions-data-table {
        --easy-table-border: 1px solid #dee2e6;
        --easy-table-row-border: 1px solid #dee2e6;
        --easy-table-header-font-size: 14px;
        --easy-table-header-height: 50px;
        --easy-table-header-font-color: #374151;
        --easy-table-header-background-color: #f8f9fa;
        --easy-table-row-hover-color: rgba(0, 123, 255, 0.05);
        --easy-table-body-row-height: 46px;
        --easy-table-body-row-font-size: 14px;
        --easy-table-footer-background-color: #f8f9fa;
        --easy-table-footer-font-color: #374151;
        --easy-table-footer-font-size: 12px;
        --easy-table-footer-padding: 0px 10px;
        --easy-table-footer-height: 50px;
        --easy-table-rows-per-page-selector-width: 70px;
        --easy-table-rows-per-page-selector-option-padding: 10px;
        --easy-table-scrollbar-track-color: #f1f1f1;
        --easy-table-scrollbar-color: #6b7280;
        --easy-table-scrollbar-thumb-color: #6b7280;
        --easy-table-scrollbar-corner-color: #f1f1f1;
        --easy-table-loading-color: #2563eb;
        --easy-table-empty-message-font-size: 16px;
        --easy-table-empty-message-font-color: #6b7280;
    }
}
</style>
