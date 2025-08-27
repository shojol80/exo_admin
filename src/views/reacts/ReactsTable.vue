<template>
    <app-screen>
        <div class="reacts-table">
            <waiter ref="waiter" :show="loading">
                <!-- Action Toolbar -->
                <div class="mb-3">
                    <action-group>
                        <action-back v-if="$route.params.backRoute"></action-back>
                        <action-button @action="onActionNew()"
                                       title="New reaction"
                                       :icon="$icons.new"
                                       v-if="allowAddNew">
                            New Reaction
                        </action-button>
                        <action-button v-show="selectedRows.length === 1"
                                       @action="onActionEdit(selectedRows)"
                                       title="Edit reaction"
                                       :icon="$icons.edit">
                            Edit
                        </action-button>
                        <action-button v-show="selectedRows.length > 0"
                                       @action="onActionDelete(selectedRows)"
                                       title="Delete reaction"
                                       :icon="$icons.delete">
                            Delete
                        </action-button>
                        <action-group-separator></action-group-separator>
                        <action-button @action="load"
                                       title="Reload"
                                       :icon="$icons.reload">
                            Refresh
                        </action-button>
                    </action-group>
                </div>

                <!-- Search Section - Temporarily disabled due to Vue 3 compatibility -->
                <!--
                <div v-if="forms !== false && showSearch" class="mb-3">
                    <div class="row">
                        <div class="col-md-6">
                            <search-query-input
                                v-model="queryScope"
                                :forms="forms"
                                placeholder="Search in reactions...">
                            </search-query-input>
                        </div>
                    </div>
                </div>
                -->

                <!-- Vue3 Easy Data Table -->
                <EasyDataTable
                    ref="dataTable"
                    v-model:items-selected="selectedRows"
                    :headers="headers"
                    :items="reacts"
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
                    class="reacts-data-table">

                    <!-- Custom column templates -->
                    <template #item-react_publish="item">
                        <span v-if="item.react_publish == 1" class="badge bg-success">Published</span>
                        <span v-else class="badge bg-secondary">Draft</span>
                    </template>

                    <template #item-react_date_changed="item">
                        {{ formatDate(item.react_date_changed) }}
                    </template>

                    <template #item-actions="item">
                        <action-group @click.stop="void 0">
                            <action-button @action="onActionEdit([item])"
                                           title="Edit reaction"
                                           :icon="$icons.edit"
                                           size="sm">
                            </action-button>
                            <action-button @action="onActionBrowse([item])"
                                           title="Browse reaction"
                                           :icon="$icons.browse"
                                           size="sm">
                            </action-button>
                            <action-button @action="onActionClone([item])"
                                           title="Clone reaction"
                                           :icon="$icons.clone"
                                           size="sm">
                            </action-button>
                            <action-button @action="onActionDelete([item])"
                                           title="Delete reaction"
                                           :icon="$icons.delete"
                                           size="sm">
                            </action-button>
                        </action-group>
                    </template>

                    <!-- Empty state -->
                    <template #empty-message>
                        <div class="text-center text-muted py-4">
                            <i :class="$icons.info" class="fs-1 mb-2"></i>
                            <p>No reactions found</p>
                        </div>
                    </template>
                </EasyDataTable>
            </waiter>
        </div>
    </app-screen>
</template>

<script>
import isEmpty from '@modules/isEmpty'
import formatDate from "@modules/utils/formatDate"
import reacts from "@/services/api/reacts"
// import SearchQueryInput from '@/components/ReactDataTable/SearchQueryInput' // Temporarily disabled - Vue 2 treeselect not compatible
import reactActions from '@/mixins/reactActions/reactActions'

export default {
    name: 'ReactsTable',
    components: {
        // SearchQueryInput // Temporarily disabled - Vue 2 treeselect not compatible
    },
    mixins: [reactActions],
    data() {
        return {
            loading: false,
            reacts: [],
            selectedRows: [],
            searchField: ['react_title', 'react_form_name', 'react_user_email'],
            searchValue: '',
            showSearch: false, // Temporarily disabled - Vue 2 treeselect not compatible
            allowAddNew: true,
            queryScope: {
                query: '',
                form_questions: []
            },
            headers: [
                { text: "ID", value: "react_id", sortable: true, width: 80 },
                { text: "Title", value: "react_title", sortable: true, width: 200 },
                { text: "Status", value: "react_publish", sortable: false, width: 100 },
                { text: "Form", value: "react_form_name", sortable: true, width: 150 },
                { text: "Edition", value: "react_edition_id", sortable: true, width: 100 },
                { text: "User", value: "react_user_email", sortable: false, width: 150 },
                { text: "Date Changed", value: "react_date_changed", sortable: true, width: 150 },
                { text: "Actions", value: "actions", sortable: false, width: 160 }
            ]
        }
    },
    computed: {
        filter() {
            const filter = ['react_id', 'react_title', 'react_form_name', 'react_user_email', 'react_user_id']
                .reduce((filter, field) => {
                    if (this.$route.query[field]) {
                        filter[field] = this.$route.query[field]
                    }
                    return filter
                }, {})

            console.log('🔍 ReactsTable filter computed:', {
                route_query: this.$route.query,
                constructed_filter: filter,
                has_react_user_id: !!this.$route.query.react_user_id,
                has_react_user_email: !!this.$route.query.react_user_email
            });

            return filter;
        },
        forms() {
            if (this.$route.query.forms && Array.isArray(this.$route.query.forms)) {
                return this.$route.query.forms.map(item => {
                    return {
                        form_id: item
                    }
                })
            } else if (!isEmpty(this.$route.query.forms)) {
                return [{
                    form_id: this.$route.query.forms
                }]
            }
            return true
        }
    },
    watch: {
        '$route.query': {
            handler(newQuery, oldQuery) {
                console.log('🔍 ReactsTable route query changed:', {
                    old: oldQuery,
                    new: newQuery
                });
                this.load();
            },
            deep: true,
            immediate: false
        },
        queryScope: {
            handler() {
                if (this.showSearch) {
                    this.load();
                }
            },
            deep: true
        },
        reacts() {
            this.selectedRows = [];
        }
    },

    mounted() {
        this.load();
    },

    activated() {
        console.log('🔍 ReactsTable activated with route query:', this.$route.query);
        this.load();
    },

    methods: {
        formatDate,

        async load() {
            this.loading = true;
            try {
                const params = this.buildRequestParams();
                console.log('🔍 ReactsTable loading with params:', params);

                const response = await reacts.searchByFormsFields(params);
                this.reacts = response.data || response || [];

                console.log('🔍 ReactsTable loaded data:', {
                    count: this.reacts.length,
                    data: this.reacts
                });
            } catch (error) {
                console.error('Error loading reacts:', error);
                this.reacts = [];
            } finally {
                this.loading = false;
            }
        },

        buildRequestParams() {
            const params = {
                limit: 25,
                page: 1,
                order: 'react_id',
                way: 'desc'
            };

            // Add search parameters
            if (this.forms === false || !this.showSearch) {
                params.form_questions = false;
                params.query = '';
            } else {
                params.form_questions = this.queryScope.form_questions;
                params.query = this.queryScope.query;
            }

            // Add filter parameters
            if (this.filter && Object.keys(this.filter).length > 0) {
                params.filter = this.filter;
            }

            return params;
        },

        onRowClick(item) {
            this.onActionEdit([item]);
        },

        onActionNew() {
            this.reactNew(this.forms);
        },

        onActionEdit(rows) {
            this.reactEdit(rows);
        },

        onActionDelete(rows) {
            this.reactDelete(rows);
        },

        onActionBrowse(rows) {
            this.reactBrowse(rows);
        },

        onActionClone(rows) {
            this.reactClone(rows);
        }
    },
}
</script>

<style lang="scss">
.reacts-table {
    .reacts-data-table {
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
