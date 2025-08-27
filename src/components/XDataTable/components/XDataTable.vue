<template>
    <div :class="`VueTables VueTables--${props.source}`" slot-scope="props">
        <div class="VueTables__top"></div>
        <div class="VueTables__header" v-if="!props.opts.hideHeader">
            <div slot="actions" class="action-table__actions">
                <vnodes :vnodes="props.slots.actions"/>
            </div>

            <vt-pagination v-show="props.opts.usePagination"/>
            <vnodes :vnodes="props.slots.beforeFilterWrapper"/>
            <div v-if="!props.opts.filterByColumn && props.opts.filterable"
                 :class="`ml-2 VueTables__search`">
                <vnodes :vnodes="props.slots.beforeFilter"/>
                <vt-generic-filter/>
                <vnodes :vnodes="props.slots.afterFilter"/>
            </div>
            <vnodes :vnodes="props.slots.afterFilterWrapper"/>
            <div v-if="props.opts.columnsDropdown"
                 :class="`VueTables__columns-dropdown-wrapper ${props.theme.right} ${props.theme.dropdown.container}`">
                <vt-columns-dropdown/>
            </div>
        </div>

        <vnodes :vnodes="props.slots.beforeTable"/>
        <div class="table-responsive">
            <vt-table ref="vt_table"/>
        </div>
        <vnodes :vnodes="props.slots.afterTable"/>
    </div>
</template>

<script>
import VtColumnsDropdown from 'vue-tables-2/compiled/components/VtColumnsDropdown'
import VtDropdownPagination from 'vue-tables-2/compiled/components/VtDropdownPagination'
import VtGenericFilter from 'vue-tables-2/compiled/components/VtGenericFilter'
import VtPerPageSelector from 'vue-tables-2/compiled/components/VtPerPageSelector';
import VtPagination from 'vue-tables-2/compiled/components/VtPagination'
import VtTable from 'vue-tables-2/compiled/components/VtTable';

export default {
    name: "XDataTable",
    props: ['props'],
    components: {
        VtGenericFilter,
        VtPerPageSelector,
        VtColumnsDropdown,
        VtDropdownPagination,
        VtTable,
        VtPagination,
        vnodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes
        }
    },
}
</script>

<style lang="scss">
.VueTables {
    &__header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
}

</style>
