<template>
    <waiter ref="waiter">
        <x-tree
            ref="xtree"
            :data="groupsTree"
            :options="treeOptions"
            @add="onAdd"
            @edit="onEdit"
            @delete="onDelete"
            @click="onClick">
        </x-tree>
    </waiter>
</template>

<script>
import groups from '@/services/api/groups'
import {R_FORMGROUP_EDIT, R_FORMS_TABLE} from "@/router/routs"
import GroupTree from '@/mixins/GroupTree'

//todo Create statafull component for groups tree
export default {
    name: "FormGroupTree",
    mixins: [GroupTree],
    data() {
        return {
            group_type: 'form',
            groupsTree: [],
            treeOptions: {
                customNodeEdit: true,
                propertyNames: {
                    text: 'group_name',
                    children: 'children',
                    id: 'group_id'
                }
            },
        }
    },
    watch: {
        '$route'(to, from) {
            this.selectByRoute({id: 'group_id', parent: 'group_parent'})
        }
    },
    mounted() {
        this.loadTree();
        exoEventBus.$on('exo-api-call:groups/saveGroup', this.loadTree)
    },
    methods: {
        loadTree() {
            groups.getGroupTree({group_type: this.group_type})
                .then(data => {
                    this.groupsTree = [{
                        group_name: 'All Forms',
                        children: data,
                        group_id: '0',
                        state: {
                            "selected": false,
                            "selectable": true,
                            "checked": false,
                            "expanded": true,
                            "indeterminate": false,
                            "matched": false,
                            "editable": false,
                            "deleteble": false,
                            "append": true,
                            "dragging": false,
                            "draggable": false,
                            "dropable": true
                        },
                        data: {
                            type: 'root'
                        }
                    }]
                })
                .then(() => {
                    this.selectByRoute({id: 'group_id', parent: 'group_parent'})
                })
        },
        onAdd(node) {
            node.select()
            this.$router.push({
                name: R_FORMGROUP_EDIT, params: {group_id: 'new'}, query: {group_parent: node.id}
            })
        },
        onEdit(node) {
            node.select()
            this.$router.push({name: R_FORMGROUP_EDIT, params: {group_id: node.id}})
        },
        onDelete(node) {
            this.$dialogs.confirmDelete({
                title: 'Delete Node',
                message: `Are you sure want to delete group "${node.data.text}"?`
            }).then(response => {
                if (response.trigger === 'ok') {
                    //go up if current group selected
                    if (this.$route.params.group_id === node.id) {
                        this.$router.push({name: R_FORMS_TABLE, params: {group_id: node.parent.id}})
                    }
                    this.$refs.waiter.wait(groups.deleteGroup({
                        group_id: node.id,
                        group_type: this.group_type
                    }).then(this.loadTree))
                }
            })
        },
        onClick(node) {
            this.$router.push({
                name: R_FORMS_TABLE, params: {group_id: node.id, form_id: ''}
            })
        },
    },
}
</script>

<style scoped>

</style>
