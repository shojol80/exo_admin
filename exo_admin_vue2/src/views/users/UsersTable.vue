<template>
    <waiter ref="tableWaiter" :show="loading">
        <action-table name="Users"
                      ref="table"
                      table-type="server"
                      :columns="columns"
                      :options="options"
                      class="users-table"
                      @row-click="onRowClick">
            <template #filterDropdown>
                <action-dropdown-item
                    :active="!trashed"
                    @click="setFilter(false)">Active user
                </action-dropdown-item>
                <action-dropdown-item
                    :active="trashed"
                    @click="setFilter(true)">Deleted users
                </action-dropdown-item>
            </template>
            <!--Actions-->
            <template #actions="props">
                <action-group>
                    <action-button @action="onActionNew()"
                                   title="New user"
                                   :icon="$icons.new"
                                   shortkey="['ctrl', 'o']">
                    </action-button>
                    <action-button v-show="props.rows && props.rows.length===1"
                                   @action="onActionEdit(props.rows)"
                                   :disabled="!!trashed"
                                   title="Edit user"
                                   :icon="$icons.edit">
                    </action-button>
                    <action-button v-show="props.rows && props.rows.length>0"
                                   @action="onActionDelete(props.rows)"
                                   title="Delete user"
                                   :icon="$icons.delete">
                    </action-button>
                    <action-button v-show="props.rows && props.rows.length>0"
                                   @action="onActionAddToGroup(props.rows)"
                                   :disabled="!!trashed"
                                   title="Add to group ..."
                                   :icon="$icons.group_add">
                    </action-button>
                    <action-button v-show="props.rows && props.rows.length>0 && ug_id>0"
                                   @action="onActionRemoveFromGroup(props.rows)"
                                   :disabled="!!trashed"
                                   title="Remove from this group"
                                   :icon="$icons.group_remove">
                    </action-button>
                    <action-group-separator></action-group-separator>
                    <action-button @action="load"
                                   title="Reload"
                                   :icon="$icons.reload">
                    </action-button>
                </action-group>
            </template>
            <template #col-action="props">
                <action-group @click.stop="void 0">
                    <action-button @action="onActionEdit([props.row])"
                                   :disabled="!!trashed"
                                   :icon="$icons.edit">
                    </action-button>
                    <action-button @action="onActionDelete([props.row])"
                                   :icon="$icons.delete">
                    </action-button>
                    <action-button @action="onActionAddToGroup([props.row])"
                                   :disabled="!!trashed"
                                   title="Add to group"
                                   :icon="$icons.group_add">
                    </action-button>
                    <action-button v-show="ug_id>0"
                                   @action="onActionRemoveFromGroup([props.row])"
                                   :disabled="!!trashed"
                                   title="Remove from this group"
                                   :icon="$icons.group_remove">
                    </action-button>
                </action-group>
            </template>
            <template #contextmenu="props">
                <x-context-menu-item
                    v-show="props.rows && props.rows.length===1"
                    :disabled="!!trashed"
                    @click="onActionEdit(props.rows)"
                    :icon="$icons.edit">Edit
                </x-context-menu-item>
                <x-context-menu-item
                    @click="onActionDelete(props.rows)"
                    :icon="$icons.delete">
                    Delete
                </x-context-menu-item>
                <x-context-menu-item
                    @click="onActionAddToGroup(props.rows)"
                    :disabled="!!trashed"
                    :icon="$icons.group_add">
                    Add to group ...
                </x-context-menu-item>
                <x-context-menu-item
                    v-show="ug_id>0"
                    @click="onActionRemoveFromGroup(props.rows)"
                    :disabled="!!trashed"
                    :icon="$icons.group_remove">
                    Remove from this group
                </x-context-menu-item>
            </template>
            <!--Columns-->
            <template #u_email="props">
                {{ props.row.u_email }}
                <template v-if="isMailhost(props.row.u_email)">
                    <b-badge class="ml-1" v-if="props.row.u_mailsize==='forward' || props.row.u_ismailbox">
                        {{ props.row.u_mailsize }}
                    </b-badge>
                </template>
                <b-badge class="ml-1" v-if="isMailList(props.row.u_maildest)">maillist</b-badge>
            </template>
        </action-table>
    </waiter>
</template>

<script>

import {R_USER_EDIT} from '@/router/routs'
import transformTree from "@/shared/transformTree"
import usersApi from '@/services/api/users'
import SelectDialog from '@/components/dialogs/SelectDialog'
import DeleteUserDialog from "@/components/dialogs/DeleteUserDialog";

export default {
    name: "UsersTable",
    props: {
        ug_id: null
    },
    data() {
        return {
            trashed: false,
            loading: false,
            searchQuery: '',
            columns: [
                'col-check',
                'u_id',
                'u_email',
                'react_count',
                'u_lastlogin',
                'col-action'
            ],
            options: {
                useFilterSearchQuery: true,
                useFilterByColumn: true,
                filterableColumns: [
                    'u_id',
                    'u_email',
                ],
                requestFunction: this.requestFunction,
                sortable: [
                    'u_id',
                    'u_email',
                    //'react_count',
                    'u_lastlogin'
                ],
                uniqueKey: 'u_id',
                headings: {
                    'u_id': 'ID',
                    'u_email': 'Email',
                    'react_count': 'Reacts',
                    'u_lastlogin': 'Last login',
                },
            },
        }
    },
    computed: {
        mailhosts() {
            return this.$store.getters['pages/getMailhosts']
        }
    },
    watch: {
        ug_id(newVal, oldVal) {
            //this.load()
        },
        $route(to, from) {
            //FIXME due to keep-alive update props when inactivate component
            if (this._inactive) return;
            this.load()
        }
    },
    mounted() {
        //this.load()
    },
    methods: {
        async requestFunction(params) {
            //TODO fix in vue-table-2?

            if (this.ug_id && +this.ug_id !== 0) {
                params.ug_id = this.ug_id
            }

            if (this.trashed) {
                params.trashed = true
            }

            params['react_count'] = 1

            try {
                this.loading = true;
                return await usersApi.getUsers(params)
            } finally {
                this.loading = false;
            }
        },

        load() {
            this.$refs.table.refresh()
        },

        onActionNew() {
            this.$router.push({name: R_USER_EDIT, params: {u_id: 'new', ug_id: this.ug_id}})
        },

        async onActionDelete(rows) {
            if (this.trashed) {
                this.$awn.alert('Not implemented!')
                return
            }
            let params, message
            if (rows.length === 1) {
                message = `Are you sure you want to delete account <b>${rows[0]['u_email']}</b>?`
            } else {
                message = `Are you sure want to delete "${rows.length}" users?`
            }

            const userIdsToDelete = rows.map(row => row['u_id'])
            params = {u_id: userIdsToDelete}

            const event = await this.$dialogs.show(DeleteUserDialog, {
                message: message,
                excludeUserIds: userIdsToDelete
            })
            if (event.trigger !== 'ok') return

            params.cascade = event.cascade || false
            if (event.transferToUserId) {
                params.transferToUserId = event.transferToUserId
            }

            await usersApi.deleteUser(params)
            await this.load()
        },

        onActionEdit(rows) {
            if ((this.trashed)) return
            this.$router.push({name: R_USER_EDIT, params: {u_id: rows[0]['u_id'], ug_id: this.ug_id}})
        },

        async onActionAddToGroup(rows) {
            const usergroupsTree = transformTree(this.$store.getters['usergroups/usergroupsTree'], {
                'ug_id': 'id',
                'ug_name': 'label',
                'ug_children': 'children'
            }, 'ug_children')

            const event = await this.$dialogs.show(SelectDialog, {
                title: 'Add to a user group',
                tree: usergroupsTree,
            })

            if (event.trigger !== 'ok') return
            const users = rows.map(item => item['u_id']);
            await usersApi.addUsersToUsergroup({ug_id: event.value, u_id: users})
            await this.load()
        },

        onActionRemoveFromGroup(rows) {
            if (rows.length === 0) return
            let message = rows.length > 1 ? `Do you want remove <b>${rows.length}</b> users from this group?` : `Do you want remove user <b>${rows[0]['u_email']}</b> from this group?`
            this.$dialogs.confirm({
                okTitle: 'REMOVE',
                message
            }).then(event => {
                if (event.trigger !== 'ok') return
                const users = rows.map(item => item['u_id']);
                usersApi.removeUsersFromUsergroup({ug_id: this.ug_id, u_id: users})
                    .then(() => this.load())
            })
        },

        onRowClick(e) {
            this.onActionEdit([e.row])
        },

        setFilter(value) {
            this.trashed = value
            this.load()
        },

        isMailList(dest) {
            if (dest) {
                return dest.split('|').some(item => item.includes('maillisting'))
            }
            return false
        }
        ,
        isMailhost(email) {
            if (!email) return false
            let domain = email.split('@')[1]
            return this.mailhosts.includes(domain)
        }
    },

}
</script>

<style lang="scss">

.users-table {

    &__filter {
        display: flex;
    }

    &__search {
        width: 250px;
    }

    .col-u_id {
        width: 80px;
    }

    .col-u_email {
        max-width: 300px
    }

    .col-u_lastlogin {
        width: 150px;
    }
}
</style>
