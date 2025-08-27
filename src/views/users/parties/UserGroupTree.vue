<template>
    <waiter ref="waiter">
        <x-tree
            ref="xtree"
            :data="groupsTree"
            :options="options"
            @add="onAdd"
            @edit="onEdit"
            @delete="onDelete"
            @click="onClick"
        >
        </x-tree>
    </waiter>
</template>

<script>
import {R_USERGROUP_EDIT, R_USERS_TABLE} from "@/router/routs"
import users from '@/services/api/users'
import GroupTree from '@/mixins/GroupTree'

export default {
    name: "UserGroupTree",
    mixins: [GroupTree],
    data() {
        return {
            options: {
                customNodeEdit: true,
                propertyNames: {
                    text: 'ug_name',
                    children: 'ug_children',
                    id: 'ug_id'
                }
            },
        }
    },
    computed: {
        groupsTree() {
            return [{
                ug_name: 'All Users',
                ug_children: this.$store.getters['usergroups/usergroupsTree'],
                ug_id: '0',
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
        },
    },
    watch: {
        groupTree: {
            immediate: true,
            deep: true,
            handler() {
                this.selectByRoute({id: 'ug_id', parent: 'ug_parent'})
            }
        },
        '$route'(to, from) {
            this.selectByRoute({id: 'ug_id', parent: 'ug_parent'})
        }
    },
    mounted() {
        this.selectByRoute({id: 'ug_id', parent: 'ug_parent'})
    },
    methods: {
        onAdd(node) {
            node.select()
            this.$router.push({
                name: R_USERGROUP_EDIT, params: {ug_id: 'new'}, query: {ug_parent: node.id}
            })
        },

        onEdit(node) {
            node.select()
            this.$router.push({
                name: R_USERGROUP_EDIT, params: {ug_id: node.id}
            })
        },

        async onDelete(node) {
            const response = await this.$dialogs.confirmDelete({
                title: 'Delete Node',
                message: `Are you sure want to delete group "${node.data.text}"?`
            })
            if (response.trigger === 'ok') {
                //go up if current group selected
                if (this.$route.params.ug_id === node.id) {
                    await this.$router.push({name: R_USERS_TABLE, params: {ug_id: node.parent.id}})
                }
                await this.$refs.waiter.wait(async () => {
                    await users.deleteUsergroup({ug_id: node.id})
                });
            }
        },

        onClick(node) {
            this.$router.push({
                name: R_USERS_TABLE, params: {ug_id: node.id}
            })
        },
    },
}
</script>
