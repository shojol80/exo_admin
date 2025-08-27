<template>
    <div class="controller-add-item">
        <no-form v-if="forms.length===0"/>

        <react-data-table
            v-else
            :forms="forms"
            :row-click-edit="false"
            :show-filters="false"
            :data-api="api"
            :show-search="true"
            :allow-add-new="false"
            :use-pagination="true"
            :columns="columns">
            <template #beforeActions="props">
                <action-back :back-route="backRoute"></action-back>
            </template>
            <template #header-col-select>
                <!--this is not reactive template v-show="rows && rows.length>0"-->
                <action-button
                    :icon="$icons.add"
                    size="sm"
                    title="Add all items to group"
                    @action="addAllItems()">
                </action-button>
            </template>
            <template #col-select="{row}">
                <action-button
                    v-if="!added.includes(row.react_id)"
                    :icon="$icons.group_add"
                    size="sm"
                    title="Add item to group"
                    @action="addItem(row)">
                </action-button>
                <action-button
                    v-else
                    :icon="$icons.added"
                    size="sm"
                    title="Remove item from group"
                    @action="removeItem(row)">
                </action-button>
            </template>
        </react-data-table>
    </div>
</template>

<script>
import isEmpty from '@modules/isEmpty'
import {R_CONTROLLER} from '@/router/routs'
import container from '@/services/api/container'
import ReactDataTable from "@/components/ReactDataTable/ReactDataTable.vue";
import NoForm from "@/components/Controller/components/NoForm.vue";

export default {
    name: "ControllerAddItem",
    components: {NoForm, ReactDataTable},
    data() {
        return {
            backRoute: R_CONTROLLER,
            columns: [
                'col-select',
                'react_id',
                'react_title',
                'react_publish',
                'react_form_name',
                'react_edition_id',
                'react_user_email',
                'react_date_changed',
                'col-action'
            ],
            added: [],
            rows: []
        }
    },
    computed: {
        forms() {
            let forms = this.$store.getters['controller/settings/getForms']
            if (isEmpty(forms)) return []
            else return forms.map(form => {
                return {form_id: form.form_id}
            })
        },
        container() {
            return this.$store.getters['controller/container']
        },
        api() {
            return (...args) => {
                if (!this.container) return Promise.resolve()
                args[0].container = this.container
                return container.getUselessItems(...args).then(data => {
                    this.rows = data.data
                    return data
                })
            }
        }
    },
    methods: {
        async addItem(item) {
            this.added.push(item.react_id)
            await this.$store.dispatch('controller/addItems', {
                items: [{
                    id: item.react_id,
                    react: item,
                }]
            })
        },
        async removeItem(item) {
            const itemTree = this.$store.state.controller.itemsTree.find(i => +i.id === +item.react_id)
            if (!itemTree) return

            this.added.splice(this.added.indexOf(item.react_id), 1)

            await this.$store.dispatch('controller/removeItem', {
                item: itemTree,
            })
        },
        async addAllItems() {
            const items = this.rows.map(item => {
                return {
                    id: item.react_id,
                    react: item
                }
            })

            this.added = this.rows.map(item => item.react_id)

            await this.$store.dispatch('controller/addItems', {items: items})
        }
    },
}
</script>
<style lang="scss">
.controller-add-item {
    .col-col-select {
        width: 45px;
    }
}

</style>

