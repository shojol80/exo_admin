<template>
    <div>
        <component
            v-bind:is="tableComponent"
            ref="table"
            v-bind="$attrs"
            v-on="$listeners"
            :data="data"
            @input="$emit('input', $event)"
            :options="fullOptions"
            :columns="columns"
            debounce="5000"
            class="action-table action-table--sticky"
            :class="classObject"
            @loaded="onDataLoaded"
            @row-contextmenu="onContextMenu">
            <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData"/>
            </template>
            <template #afterFilterWrapper>
                <action-group class="ml-2">
                    <template v-if="options.useFilterByColumn">
                        <action-button v-if="!hasSlot('filterDropdown')"
                                       :active="showFilters_val"
                                       @action="switchColumnFilters(!showFilters_val)"
                                       title="Filters by columns"
                                       :icon="$icons.filter">
                        </action-button>
                        <action-dropdown v-else
                                         split
                                         :active="showFilters_val"
                                         @action="switchColumnFilters(!showFilters_val)"
                                         title="Filters by columns"
                                         :icon="$icons.filter">
                            <template #dropdown>
                                <slot name="filterDropdown"></slot>
                            </template>
                        </action-dropdown>
                    </template>


                </action-group>
                <slot name="afterFilterWrapper">
                </slot>
            </template>
            <div slot="actions" class="action-table__actions">
                <slot name="actions" v-bind="{ rows: selected, data: data}"></slot>
            </div>
            <template #h__col-check>
                <b-form-checkbox
                    @change="onSelectAll"
                    v-model="selectAll"
                ></b-form-checkbox>
            </template>
            <template #col-check="props">
                <div
                    class="custom-control custom-checkbox"
                    @click.stop="void 0"
                    @dblclick.stop="void 0"
                >
                    <input
                        type="checkbox"
                        autocomplete="off"
                        class="custom-control-input"
                        :value="props.row"
                        :id="'chk_' + props.row[options.uniqueKey]"
                        v-model="selected"
                    />
                    <label
                        class="custom-control-label"
                        :for="'chk_' + props.row[options.uniqueKey]"
                    ></label>
                </div>
            </template>
        </component>
        <x-context-menu ref="menu" tag="div">
            <template slot-scope="child">
                <slot name="contextmenu" v-bind="child.data"></slot>
            </template>
        </x-context-menu>
    </div>
</template>

<script>
import {merge} from "lodash";
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
            default: "client"
        },
        hoverRow: {
            type: Boolean,
            default: true
        },
        skin: {
            type: String,
            default: ""
        },
    },
    model: {
        prop: "data",
        event: "input"
    },
    data() {
        return {
            showFilters_val: false,
            headerIsSticky: false,
            selected: [],
            selectAll: false,
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
                    "col-action": ""
                },
                columnsClasses: {
                    "col-check": "action-table__col-check",
                    "col-edit": "action-table__col-edit",
                    "col-action": "action-table__col-action"
                },
                texts: {
                    filter: ""
                }
            }
        };
    },
    computed: {
        hasSlots() {
            return hasSlots
        },
        classObject() {
            let cl = {
                "action-table--hover": this.hoverRow,
                "action-table--row-pointer": !!this.$listeners["row-click"],
                "action-table--sticky-fly": this.headerIsSticky,
                "action-table--no-header": this.fullOptions.hideHeader
            };
            if (this.skin) {
                cl[`action-table--skin-${this.skin}`] = true;
            }
            return cl;
        },
        tableComponent() {
            return `v-${this.tableType}-table`;
        },
        modelData() {
            return this.tableType === "client"
                ? this.data
                : this.$refs.table.data;
        }
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
                        options.filterByColumn = true
                        options.filterable = newVal.filterableColumns
                    } else if (newVal.useFilterSearchQuery) {
                        options.filterable = true
                        options.filterByColumn = false
                    } else {
                        options.filterByColumn = false
                    }
                } else {
                    options.filterable = false
                    this.showFilters_val = false;
                }

                options.requestAdapter = (data) => {
                    if (newVal.filterableColumns) {
                        data.filterableColumns = newVal.filterableColumns
                    }
                    if (newVal.requestAdapter) {
                        return newVal.requestAdapter(data)
                    } else {
                        return data
                    }
                }

                this.$set(this, "fullOptions", options);
            }
        }
    },
    methods: {
        onContextMenu(e) {
            e.event.preventDefault();
            let rows = [e.row];
            if (this.selected.length > 0) {
                rows = this.selected;
            }
            this.$refs.menu.open(e.event, {rows});
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
        refresh() {
            this.$refs.table.refresh(...arguments);
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
                filter[field] = ''
                return filter
            }, {})
        },

        fullFilter() {
            return this.options.filterableColumns.reduce((filter, field) => {
                //place to set outer filter
                //[field] = this.filter[field] ? this.filter[field] : ''
                filter[field] = ''
                return filter
            }, {})
        },

        switchColumnFilters(enable) {
            this.showFilters_val = enable;
            if (this.showFilters_val) {
                this.fullOptions.filterByColumn = true;
                this.fullOptions.filterable = this.options.filterableColumns;
                this.setFilter(this.fullFilter());
            } else {
                this.fullOptions.filterByColumn = false;
                this.fullOptions.filterable = this.options.useFilterSearchQuery;
                this.setFilter(this.emptyFilter());
            }
        }
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
            this.observer = new IntersectionObserver(
                entries => {
                    // no intersection
                    if (entries[0].intersectionRatio < 1)
                        this.headerIsSticky = true;
                    // fully intersects
                    else if (entries[0].intersectionRatio === 1)
                        this.headerIsSticky = false;
                },
                {
                    threshold: [0, 1]
                }
            );
            this.observer.observe(this.$el.querySelector(".VueTables__top"));
        });
    },
    beforeDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
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
