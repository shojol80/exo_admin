<template>
    <tr :class="`VueTables__row ${props.rowAttrs.class}`"
        v-bind="props.rowAttrs.attrs"
        @click="props.rowEvents.click"
        @contextmenu="onContextMenu">
        <vt-child-row-toggler :row-id="props.rowId" v-if="props.childRowTogglerFirst"/>
        <vt-table-cell v-for="(column, i) in props.columns" :key="i" :column="column"/>
        <vt-child-row-toggler :row-id="props.rowId" v-if="props.childRowTogglerLast"/>
    </tr>
</template>

<script>
import VtTableCell from "vue-tables-2/compiled/components/VtTableCell";
import VtChildRowToggler from "vue-tables-2/compiled/components/VtChildRowToggler";
import componentEmit from '@modules/mixins/componentEmit'

export default {
    name: "XTableRow",
    mixins: [componentEmit],
    props: ['props'],
    components: {VtTableCell, VtChildRowToggler},
    methods: {
        onContextMenu(e) {
            this.$componentEmit(['VtClientTable', 'VtServerTable'], 'row-contextmenu', {
                event: e,
                row: this.$parent.row
            })
        },
    }
}
</script>

<style scoped>
</style>
