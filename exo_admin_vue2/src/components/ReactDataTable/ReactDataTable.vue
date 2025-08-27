<template>
    <action-table
        table-type="server"
        class="react-data-table"
        :name="name"
        ref="table"
        url="/"
        :columns="columns"
        :options="options"
        @[rowclickevent]="onRowClick">
        <template #afterFilterWrapper>
            <template v-if="forms!==false">
                <div v-show="showSearch_val" class="react-data-table__search mr-2">
                    <search-query-input
                        v-model="queryScope"
                        :forms="forms">
                    </search-query-input>
                </div>
                <action-button v-if="allowHideSearch"
                               @action="showSearch_val = !showSearch_val"
                               title="Search in reactions content"
                               :icon="$icons.search">
                </action-button>
            </template>
        </template>
        <!--Actions-->
        <template #actions="props">
            <action-group>
                <slot name="beforeActions" v-bind="props"></slot>
                <react-table-actions
                    :actions="[allowAddNew?'new':'','edit','delete']"
                    :rows="props.rows"
                    @new="reactNew(forms)"
                    @edit="reactEdit(props.rows)"
                    @delete="reactDelete(props.rows)">
                </react-table-actions>
                <action-group-separator></action-group-separator>
                <action-button @action="load"
                               title="Reload"
                               :icon="$icons.reload">
                </action-button>
            </action-group>
        </template>
        <template #col-action="{row}">
            <action-group @click.stop="void 0">
                <react-column-actions
                    :row="row"
                    @edit="reactEdit([row])"
                    @browse="reactBrowse([row])"
                    @clone="reactClone([row])"
                    @delete="reactDelete([row])"
                ></react-column-actions>
            </action-group>
        </template>
        <template #contextmenu="{rows}">
            <react-context-menu
                :rows="rows"
                @edit="reactEdit(rows)"
                @browse="reactBrowse(rows)"
                @clone="reactClone(rows)"
                @delete="reactDelete(rows)"
            ></react-context-menu>
        </template>
        <!--Columns-->
        <template #react_publish="props">
            <template v-if="!+props.row.react_publish">
                <icon :icon="$icons.not_published" class="cell-icon"></icon>
            </template>
        </template>
        <template #react_form_name="props">
            {{ props.row.react_form_name }}
        </template>
        <template #react_edition_id="props">
            {{ props.row.react_edition_id }}
        </template>
        <!--Headers (pass header slots from parent do not work for vue-table-w)-->
        <template #h__col-select>
            <slot name="header-col-select"></slot>
        </template>
        <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData"/>
        </template>
    </action-table>
</template>

<script>
import axios from 'axios'
import SearchQueryInput from './SearchQueryInput'
import reactActions from '@/mixins/reactActions/reactActions'
import reacts from '@/services/api/reacts'
import ReactTableActions from '@/components/ReactActions/ReactTableActions'
import ReactContextMenu from '@/components/ReactActions/ReactContextMenu'
import ReactColumnActions from '@/components/ReactActions/ReactColumnActions'
import filter from './mixins/filter'

export default {
    name: 'ReactDataTable',
    components: {ReactColumnActions, ReactTableActions, ReactContextMenu, SearchQueryInput},
    mixins: [reactActions, filter],
    props: {
        /**
         * Available forms fields for search
         * [{forms_id:1,form_questions:[{fq_id:1}]}...]
         * if "true" show all forms/fields available
         * if "false" do not use search
         */
        forms: {
            type: [Array, Boolean],
            default: true
        },
        rowClickEdit: {
            type: Boolean,
            default: true
        },
        showSearch: {
            type: Boolean,
            default: false,
        },
        searchQuery: {
            type: String,
            default: ''
        },
        showFilters: {
            type: Boolean,
            default: false,
        },
        dataApi: {
            type: Function,
            default: reacts.searchByFormsFields
        },
        allowAddNew: {
            type: Boolean,
            default: true
        },
        filter: {
            type: Object,
            default() {
                return {}
            }
        },
        allowHideSearch: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            default: 'ReactDataTable'
        },
        saveState: {
            type: Boolean,
            default: false,
        },
        usePagination: {
            type: Boolean,
            default: true,
        },
        columns: {
            type: Array,
            default() {
                return [
                    'col-check',
                    'react_id',
                    'react_title',
                    'react_publish',
                    'react_form_name',
                    'react_edition_id',
                    'react_user_email',
                    'react_date_changed',
                    'col-action'
                ];
            }
        }
    },
    data() {
        return {
            queryScope: {
                query: this.searchQuery,
                form_questions: []
            },
            options: {
                usePagination: this.usePagination,
                saveState: this.saveState,
                debounce: 500,
                sendInitialRequest: true,
                //filterByColumn: true,
                listColumns: {
                    react_form_name: [],
                    react_edition_id: []
                },
                //filterable: false,
                useFilterSearchQuery: false,
                useFilterByColumn: true,
                filterableColumns: [
                    'react_id',
                    'react_title',
                    'react_form_name',
                    'react_edition_id',
                    'react_user_email',
                    'react_user_id',
                ],
                sortable: [
                    'react_id',
                    'react_title',
                    'react_form_name',
                    'react_edition_id',
                    'react_date_changed',
                ],
                uniqueKey: 'react_id',
                headings: {
                    'react_id': 'ID',
                    'react_title': 'Title',
                    'react_publish': '',
                    'react_form_name': 'Form',
                    'react_edition_id': 'Edition',
                    'react_user_email': 'User',
                    'react_date_changed': 'Date changed',
                    'edit': ''
                },
                requestKeys: {
                    query: 'filter',
                    limit: 'limit',
                    orderBy: 'order',
                    ascending: 'way',
                    page: 'page',
                    byColumn: 'byColumn'
                },
                requestFunction: this.requestFunction,
                responseAdapter: this.responseAdapter,
            }
        }
    },
    computed: {
        rowclickevent() {
            return this.rowClickEdit ? 'row-click' : '---'
        },
    },
    watch: {
        queryScope() {
            if (this.showSearch_val) this.load()
        },
        showSearch_val() {
            this.load()
        },
        showSearch: {
            handler() {
                this.showSearch_val = this.showSearch
            }
        },
    },
    methods: {
        requestFunction(data) {
            data['way'] = data['way'] === 1 ? 'asc' : 'desc'
            if (this.forms === false || !this.showSearch_val) {
                //do not use search only filter
                data['form_questions'] = false
                data['query'] = ''
            } else {
                data['form_questions'] = this.queryScope.form_questions
                data['query'] = this.queryScope.query
            }

            // Add filter prop to request data
            if (this.filter && Object.keys(this.filter).length > 0) {
                data['filter'] = this.filter;
                console.log('🔍 ReactDataTable: Adding filter to request', {
                    filter: this.filter,
                    data: data
                });
            } else {
                console.log('🔍 ReactDataTable: No filter to add', {
                    filter: this.filter,
                    filter_keys: this.filter ? Object.keys(this.filter) : 'NULL'
                });
            }

            // cancel the request
            if (this.source) {
                this.source.cancel('CANCEL');
            }
            this.source = axios.CancelToken.source();

            if (this.$refs.table && this.$refs.table.$refs.table) {
                this.$refs.table.$refs.table.loading = true;
            }
            return this.dataApi(data, {
                cancelToken: this.source.token
            }).then((data) => {
                if (this.$refs.table) this.$refs.table.$refs.table.loading = false;
                return data
            })
        },
        responseAdapter(response) {
            if (!response) return {data: [], count: 0}
            return {data: response.data, count: response.total}
        },
        load() {
            this.$refs.table.refresh();
        },
        onRowClick(e) {
            if (this.rowClickEdit) this.reactEdit([e.row])
        },
    }
}
</script>

<style lang="scss">
.react-data-table {

    .VueTables__table {
        table-layout: fixed;
    }

    //column sizes
    thead tr:first-child {
        .col-react_id,
        .col-react_edition_id {
            width: 86px;
        }

        .col-react_title {
            //width: 25%;
            //overflow: hidden;
            text-overflow: ellipsis;
        }

        .col-react_publish {
            width: 45px;
        }

        .col-react_form_name {
            width: 180px;
        }

        .col-react_user_email {
            width: 220px;
            //overflow: hidden;
            text-overflow: ellipsis;
        }

        .col-react_date_changed {
            width: 190px;
        }
    }

    .VueTables__search {
        display: flex;
        margin-left: 0;
    }
}
</style>
