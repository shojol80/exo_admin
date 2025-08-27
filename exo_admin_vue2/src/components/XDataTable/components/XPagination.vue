<template>
    <action-group class="VueTables__pagination">
        <action-dropdown :popper-opts="{rootBoundary:'document'}">
            {{ count }}
            <template slot="dropdown">
                <b-dropdown-header id="dropdown-header-label">
                    Row per page
                </b-dropdown-header>
                <vt-per-page-selector/>
            </template>
        </action-dropdown>
        <action-button :disabled="props.page===1 || props.records===0" @action="props.setPage(props.page-1)"
                       :icon="$icons.angle_left"></action-button>
        <action-button :disabled="props.page >= props.totalPages || props.records===0"
                       @action="props.setPage(props.page+1)"
                       :icon="$icons.angle_right"></action-button>
    </action-group>
</template>

<script>
import Pagination from 'vue-pagination-2'
import VtPerPageSelector from 'vue-tables-2/compiled/components/VtPerPageSelector';

export default {
    name: "XPagination",
    components: {
        Pagination,
        VtPerPageSelector,
    },
    props: ['props'],
    computed: {
        count() {
            function formatNumber(num) {
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            if (this.props.records === 0) return ''
            //'{from} - {to} of {count}'

            let totalPages = this.props.totalPages
            let parts = this.props.optionsObj.texts.count.split('|')
            let from = (this.props.page - 1) * this.props.perPage + 1
            let to = this.props.page === totalPages ? this.props.records : from + this.props.perPage - 1
            let i = Math.min(+this.props.records === 1 ? 2 : +totalPages === 1 ? 1 : 0, parts.length - 1)
            return parts[i].replace('{count}', formatNumber(this.props.records)).replace('{from}', formatNumber(from)).replace('{to}', formatNumber(to));

        }
    }
}
</script>
