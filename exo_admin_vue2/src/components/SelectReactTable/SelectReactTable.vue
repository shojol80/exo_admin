<template>
    <div class="select-react-table">
        <react-data-table
            :forms="forms"
            :row-click-edit="false"
            :show-filters="false"
            :data-api="dataApi"
            :show-search="true"
            :allow-add-new="allowAddNew"
            :use-pagination="false">
            <template #beforeActions="props">
                <action-back :back-route="backRoute"></action-back>
                <action-button :disabled="props.rows.length===0"
                               @action="onConfirm(props.rows)"
                               :title="confirmTitle"
                               :icon="$icons.confirm">
                </action-button>
                <action-group-separator></action-group-separator>
            </template>
        </react-data-table>
    </div>
</template>

<script>
import ReactDataTable from '@/components/ReactDataTable/ReactDataTable'

export default {
    name: "SelectReactTable",
    components: {ReactDataTable},
    props: {
        forms: {
            type: [Array, Boolean]
        },
        confirmTitle: {
            type: String,
            default: 'Confirm'
        },
        dataApi: {
            type: Function
        },
        backRoute: {
            type: [String, Boolean, Object, Function],
            default: true
        },
        allowAddNew: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onConfirm(rows) {
            this.$emit('confirm', rows)
        }
    }
}
</script>

<style scoped>

</style>
