<template>
    <div>
        <!-- Actions toolbar -->
        <div class="action-table__toolbar mb-3" v-if="$slots.actions">
            <div class="action-table__actions">
                <slot
                    name="actions"
                    v-bind="{ rows: selected, data: data }"
                ></slot>
            </div>
        </div>

        <!-- Table -->
        <div class="action-table action-table--sticky" :class="classObject">
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th v-for="column in columns" :key="column">
                                {{ fullOptions.headings[column] || column }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="!data || data.length === 0">
                            <td :colspan="columns.length" class="text-center">
                                <div class="p-4">
                                    <i
                                        class="fa fa-spinner fa-spin"
                                        v-if="loading"
                                    ></i>
                                    <span v-else>No data available</span>
                                </div>
                            </td>
                        </tr>
                        <tr
                            v-for="(item, index) in data"
                            :key="index"
                            @click="onRowClick(item)"
                        >
                            <td v-for="column in columns" :key="column">
                                <slot
                                    :name="column"
                                    :row="item"
                                    :value="item[column]"
                                >
                                    {{ item[column] }}
                                </slot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <x-context-menu ref="menu" tag="div">
            <template #default="child">
                <slot name="contextmenu" v-bind="child.data"></slot>
            </template>
        </x-context-menu>
    </div>
</template>

<script>
import { merge } from "lodash";
import hasSlots from "@modules/mixins/HasSlots";

export default {
    name: "ActionTable",
    mixins: [hasSlots],
    inheritAttrs: true, // optional
    props: {
        data: Array,
        options: Object,
        columns: Array,
        tableType: {
            type: String,
            default: "client",
        },
        hoverRow: {
            type: Boolean,
            default: true,
        },
        skin: {
            type: String,
            default: "",
        },
    },
    emits: ["input", "row-click", "loaded"],
    data() {
        return {
            showFilters_val: false,
            headerIsSticky: false,
            selected: [],
            selectAll: false,
            loading: false,
            fullOptions: {
                filterableColumns: [],
                useFilterSearchQuery: false,
                useFilterByColumn: false,
                hideHeader: false,
                storage: "local",
                usePagination: true,
                filterable: false,
                skin: "table table-borderless table-sm",
                headings: {
                    "col-edit": "",
                    "col-action": "",
                },
                columnsClasses: {
                    "col-check": "action-table__col-check",
                    "col-edit": "action-table__col-edit",
                    "col-action": "action-table__col-action",
                },
                texts: {
                    filter: "",
                },
            },
        };
    },
    computed: {
        hasSlots() {
            return hasSlots;
        },
        classObject() {
            let cl = {
                "action-table--hover": this.hoverRow,
                "action-table--row-pointer": !!this.$attrs["onRow-click"],
                "action-table--sticky-fly": this.headerIsSticky,
                "action-table--no-header": this.fullOptions.hideHeader,
            };
            if (this.skin) {
                cl[`action-table--skin-${this.skin}`] = true;
            }
            return cl;
        },
        tableComponent() {
            return `v-${this.tableType}-table`;
        },
        easyDataTableHeaders() {
            // Convert Vue 2 columns to EasyDataTable headers
            return this.columns.map((col) => {
                if (typeof col === "string") {
                    return {
                        text: this.fullOptions.headings[col] || col,
                        value: col,
                        sortable: true,
                    };
                }
                return col;
            });
        },
        serverOptions() {
            return {
                page: 1,
                itemsPerPage: 25,
                sortBy: [],
                sortType: [],
            };
        },
        modelData() {
            return this.tableType === "client"
                ? this.data
                : this.$refs.table.data;
        },
    },
    watch: {
        selected(newVal) {
            if (newVal && newVal.length === 0) {
                this.selectAll = false;
                return;
            }
            this.selectAll = newVal.length === this.modelData.length;
        },
        data() {
            this.selected = [];
        },
        options: {
            deep: true,
            immediate: true,
            handler: function (newVal) {
                //merge classes default classes and parent component classes with override
                this.fullOptions.columnsClasses = this.columns.reduce(
                    (obj, col) => {
                        if (this.fullOptions.columnsClasses[col]) {
                            obj[col] = this.fullOptions.columnsClasses[col];
                        } else {
                            obj[col] = "col-" + col;
                        }
                        return obj;
                    },
                    {}
                );

                //todo need custom merge to
                //in case if options come with [] but previous was [1,2,3] result [1,2,3] expected []
                let options = merge(this.fullOptions, newVal);
                if (!options["usePagination"]) {
                    options["perPage"] = 999999999;
                }
                if (newVal.useFilterSearchQuery || newVal.useFilterByColumn) {
                    if (newVal.useFilterByColumn && this.showFilters_val) {
                        options.filterByColumn = true;
                        options.filterable = newVal.filterableColumns;
                    } else if (newVal.useFilterSearchQuery) {
                        options.filterable = true;
                        options.filterByColumn = false;
                    } else {
                        options.filterByColumn = false;
                    }
                } else {
                    options.filterable = false;
                    this.showFilters_val = false;
                }

                options.requestAdapter = (data) => {
                    if (newVal.filterableColumns) {
                        data.filterableColumns = newVal.filterableColumns;
                    }
                    if (newVal.requestAdapter) {
                        return newVal.requestAdapter(data);
                    } else {
                        return data;
                    }
                };

                this.fullOptions = options;
            },
        },
    },
    methods: {
        onContextMenu(e) {
            e.event.preventDefault();
            let rows = [e.row];
            if (this.selected.length > 0) {
                rows = this.selected;
            }
            this.$refs.menu.open(e.event, { rows });
        },
        onSelectAll(checked) {
            if (checked) {
                this.selected = this.modelData;
            } else {
                this.selected = [];
            }
        },
        onDataLoaded() {
            this.selected = [];
        },
        onRowClick(item) {
            this.$emit("row-click", item);
        },
        onServerOptionsUpdate(options) {
            // Handle server options update for EasyDataTable
            console.log("Server options updated:", options);
        },
        refresh() {
            // For EasyDataTable, we need to trigger data reload
            if (
                this.tableType === "server" &&
                this.fullOptions.requestFunction
            ) {
                this.loadServerData();
            } else if (this.$refs.table && this.$refs.table.refresh) {
                this.$refs.table.refresh(...arguments);
            }
        },
        async loadServerData() {
            try {
                if (this.fullOptions.requestFunction) {
                    const params = {
                        page: 1,
                        limit: 25,
                        // Add any other parameters needed
                    };
                    const result = await this.fullOptions.requestFunction(
                        params
                    );
                    // Update the data
                    this.$emit("input", result.data || result || []);
                    this.$emit("loaded", result);
                }
            } catch (error) {
                console.error("Error loading server data:", error);
            }
        },
        setLimit(recordsPerPage) {
            this.$refs.table.setLimit(recordsPerPage);
        },
        setFilter(query) {
            if (this.$refs.table) {
                this.$refs.table.setFilter(query);
            }
        },
        resetQuery(query) {
            this.$refs.table.resetQuery(query);
        },
        emptyFilter() {
            return this.options.filterableColumns.reduce((filter, field) => {
                filter[field] = "";
                return filter;
            }, {});
        },

        fullFilter() {
            return this.options.filterableColumns.reduce((filter, field) => {
                //place to set outer filter
                //[field] = this.filter[field] ? this.filter[field] : ''
                filter[field] = "";
                return filter;
            }, {});
        },

        switchColumnFilters(enable) {
            this.showFilters_val = enable;
            if (this.showFilters_val) {
                this.fullOptions.useFilterByColumn = true;
                this.fullOptions.filterable = this.options.filterableColumns;
                this.setFilter(this.fullFilter());
            } else {
                this.fullOptions.useFilterByColumn = false;
                this.fullOptions.filterable = this.options.useFilterSearchQuery;
                this.setFilter(this.emptyFilter());
            }
        },
    },
    created() {
        if (
            this.columns.indexOf("col-check") >= 0 &&
            this.options["uniqueKey"] === undefined
        ) {
            throw 'Option "uniqueKey" is required for table with col-check';
        }
    },
    mounted() {
        this.$nextTick(() => {
            //to check when header get's position sticky
            const targetElement =
                this.$el.querySelector(".VueTables__top") ||
                this.$el.querySelector(".easy-data-table") ||
                this.$el.querySelector("table") ||
                this.$el;

            if (targetElement) {
                this.observer = new IntersectionObserver(
                    (entries) => {
                        // no intersection
                        if (entries[0].intersectionRatio < 1)
                            this.headerIsSticky = true;
                        // fully intersects
                        else if (entries[0].intersectionRatio === 1)
                            this.headerIsSticky = false;
                    },
                    {
                        threshold: [0, 1],
                    }
                );
                this.observer.observe(targetElement);
            }
        });
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
};
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.action-table {
    .VueTables__header {
        padding: 0.5rem 0;
    }

    .table-responsive {
        overflow-x: visible;
        position: relative;
    }

    thead {
        tr:last-child:not(.VueTables__filters-row) th {
            box-shadow: inset 0 -1px 0 $exo-gray-line;
            border: none;
        }
    }

    .action-table__heading-row,
    .VueTables__heading-row,
    .VueTables__heading {
        color: $secondary;
    }

    tbody tr {
        box-shadow: inset 0 -1px 0 $exo-gray-line;
        border: none;

        &:hover {
            .action-table__col-action .action-group {
                display: flex;
            }
        }
    }

    table {
        overflow: auto !important;

        td:not(.action-table__col-action) {
            vertical-align: middle;
            padding: 6px 5px 7px 5px;
            //overflow: hidden;
        }

        //header
        thead tr:not(.VueTables__filters-row) {
            th:not(.action-table__col-action) {
                padding: 6px 5px 7px 5px;
                vertical-align: middle;
            }
        }

        //filter
        .VueTables__filters-row {
            th {
                padding-top: 0;
                padding-bottom: 0;
            }
        }

        th.action-table__col-action,
        td.action-table__col-action {
            padding: 0;
        }

        th:focus,
        td:focus {
            outline: none;
        }

        .action-table__sort-icon,
        .VueTables__sort-icon {
            margin-left: 15px;
            color: $gray-500;
            vertical-align: middle;
        }

        .cell-icon {
            font-size: 16px;
            color: $gray-500;
        }
    }

    &--hover {
        tbody tr {
            &:hover {
                box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0,
                    0 1px 2px 0 rgba(60, 64, 67, 0.3),
                    0 1px 3px 1px rgba(60, 64, 67, 0.15);
            }
        }
    }

    &--row-pointer {
        tbody tr {
            cursor: pointer;
        }
    }

    .VueTables__search-field,
    .VueTables__limit-field {
        display: flex;

        label {
            margin-right: 0.5rem;
        }
    }

    .VueTables__search {
        .VueTables__search-field {
            label {
                margin: 0;
            }

            min-width: 250px;
            margin-left: auto;
        }
    }

    .VueTables__search:empty {
        display: none;
    }

    &--sticky {
        .VueTables__header {
            position: sticky;
            top: 0;
            background: $exo-bg;
            z-index: 2;
            border-bottom: 1px transparent solid;
        }

        .VueTables__heading-row th {
            position: sticky !important;
            top: 51px;
            z-index: 1;
            background-color: $exo-bg;
        }

        .VueTables__filters-row th {
            position: sticky !important;
            z-index: 1;
            top: 86px;
            background-color: $exo-bg;
        }

        &.action-table--sticky-fly {
            thead tr:last-child th:not(.action-table__col-action) {
                //box-shadow: 0 2px 5px 2px rgba(60,64,67,0.15);
                &:after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    height: 6px;
                    background: transparent;
                    background: -webkit-gradient(
                        linear,
                        left top,
                        left bottom,
                        from(rgba(0, 0, 0, 0.14)),
                        to(transparent)
                    );
                    background: linear-gradient(
                        180deg,
                        rgba(0, 0, 0, 0.14) 0,
                        transparent
                    );
                    right: 0;
                }
            }
        }
    }

    &.action-table--sticky.action-table--no-header {
        .VueTables__heading-row th {
            top: 0;
        }
    }

    &__actions {
        padding: 0;
        margin-right: auto;
        display: flex;
        width: 100%;
    }

    &__pagination {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: $secondary;
    }

    //Special columns
    &__col-edit {
        width: 1px;
        text-align: right;

        > .btn-group > .btn {
            min-width: 50px;
        }

        .fa-ellipsis-h:before {
            color: $gray-500;
        }
    }

    &__col-check {
        width: 34px;
        padding-left: 9px !important;

        .custom-checkbox label {
            cursor: pointer;
        }
    }

    &__col-action {
        padding: 0;
        width: 1px;
        position: relative;

        .action-group {
            top: 0;
            right: 1px;
            height: 100%;
            position: absolute;
            background-color: $exo-bg;
            display: none;
            box-shadow: -30px 0 10px -6px $exo-bg;
        }
    }

    &--skin-white {
        &.action-table--sticky .VueTables__header {
            background-color: $white;
        }

        .action-table__col-action {
            vertical-align: middle;

            .action-group {
                top: 1px;
                bottom: 1px;
                right: 1px;
                height: auto;
                position: absolute;
                background-color: $white;
                display: none;
                box-shadow: -30px 0 10px -6px $white;
            }
        }
    }
}
</style>
