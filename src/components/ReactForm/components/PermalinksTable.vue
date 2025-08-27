<template>
    <action-table
        class="permalinks-table"
        skin="white"
        :hover-row="false"
        :columns="columns"
        :options="options"
        :data="permalinks">
        <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData"/>
        </template>
    </action-table>
</template>
<script>
export default {
    name: 'PermalinksTable',
    props: {
        permalinks: {type: Array, required: true}
    },
    data() {
        return {
            columns: [
                'p_type',
                'p_url',
                'p_fp_id',
                'p_redirect',
                'p_context',
                'col-action',
            ],
            options: {
                usePagination: false,
                filterable: false,
                //hideHeader: true,
                sortable: [],
                uniqueKey: 'p_id',
                //editableColumns: ['form_permalinks'],
                headings: {
                    'p_type': 'TYPE',
                    'p_url': 'URL',
                    'p_fp_id': 'FORM PERMALINK',
                    'p_redirect': 'REDIRECT',
                    'p_context': 'CONTEXT',

                },
            },
        }
    },
}
</script>
<style lang="scss">
.permalinks-table {
    tbody td {
        height: 48px
    }

    .col-p_type {
        width: 100px;
    }

    .col-p_fp_id {
        width: 30%;
    }

    .col-p_context {
        text-align: center;
        width: 150px;
    }
}
</style>
