<template>
    <div class="users-table">
        <waiter ref="tableWaiter" :show="loading">
                <!-- Action Toolbar -->
                <div class="mb-3">
                    <action-group>
                        <action-button @action="onActionNew()"
                                       title="New user"
                                       :icon="$icons.new"
                                       shortkey="['ctrl', 'o']">
                            New User
                        </action-button>
                        <action-button v-show="selectedRows.length === 1"
                                       @action="onActionEdit(selectedRows)"
                                       title="Edit user"
                                       :disabled="!!trashed"
                                       :icon="$icons.edit">
                            Edit
                        </action-button>
                        <action-button v-show="selectedRows.length > 0"
                                       @action="onActionDelete(selectedRows)"
                                       title="Delete user"
                                       :disabled="!!trashed"
                                       :icon="$icons.delete">
                            Delete
                        </action-button>
                        <action-group-separator></action-group-separator>
                        <action-dropdown title="Filter">
                            <action-dropdown-item
                                :active="!trashed"
                                @click="setFilter(false)">
                                Active users
                            </action-dropdown-item>
                            <action-dropdown-item
                                :active="trashed"
                                @click="setFilter(true)">
                                Deleted users
                            </action-dropdown-item>
                        </action-dropdown>
                        <action-group-separator></action-group-separator>
                        <action-button @action="load"
                                       title="Reload"
                                       :icon="$icons.reload">
                            Refresh
                        </action-button>
                    </action-group>
                </div>

                <!-- Vue3 Easy Data Table -->
                <EasyDataTable
                    ref="dataTable"
                    v-model:items-selected="selectedRows"
                    :headers="headers"
                    :items="users"
                    :loading="loading"
                    show-select
                    alternating
                    border-cell
                    buttons-pagination
                    :rows-per-page="25"
                    :rows-per-page-options="[10, 25, 50, 100]"
                    :search-field="searchField"
                    :search-value="searchValue"
                    @click-row="onRowClick"
                    class="users-data-table">

                    <!-- Custom column templates -->
                    <template #item-u_email="item">
                        {{ item.u_email }}
                        <template v-if="isMailhost(item.u_email)">
                            <span class="badge bg-info ms-1" v-if="item.u_mailsize==='forward' || item.u_ismailbox">
                                {{ item.u_mailsize }}
                            </span>
                        </template>
                        <span class="badge bg-secondary ms-1" v-if="isMailList(item.u_maildest)">maillist</span>
                    </template>

                    <template #item-u_lastlogin="item">
                        {{ formatDate(item.u_lastlogin) }}
                    </template>

                    <template #item-actions="item">
                        <action-group @click.stop="void 0">
                            <action-button @action="onActionEdit([item])"
                                           title="Edit user"
                                           :icon="$icons.edit"
                                           size="sm">
                            </action-button>
                            <action-button @action="onActionDelete([item])"
                                           title="Delete user"
                                           :disabled="!!trashed"
                                           :icon="$icons.delete"
                                           size="sm">
                            </action-button>
                        </action-group>
                    </template>

                    <!-- Empty state -->
                    <template #empty-message>
                        <div class="text-center text-muted py-4">
                            <i :class="$icons.info" class="fs-1 mb-2"></i>
                            <p>No users found</p>
                        </div>
                    </template>
                </EasyDataTable>
        </waiter>
    </div>
</template>

<script>
import {R_USER_EDIT} from '@/router/routs'
import transformTree from "@/shared/transformTree"
import usersApi from '@/services/api/users'
import SelectDialog from '@/components/dialogs/SelectDialog'
import DeleteUserDialog from "@/components/dialogs/DeleteUserDialog"
import formatDate from "@modules/utils/formatDate"

export default {
    name: "UsersTable",
    props: {
        ug_id: null
    },
    data() {
        return {
            trashed: false,
            loading: false,
            users: [],
            selectedRows: [],
            searchField: ['u_email'],
            searchValue: '',
            headers: [
                { text: "ID", value: "u_id", sortable: true, width: 80 },
                { text: "Email", value: "u_email", sortable: true, width: 250 },
                { text: "Reacts", value: "react_count", sortable: false, width: 100 },
                { text: "Last Login", value: "u_lastlogin", sortable: true, width: 150 },
                { text: "Actions", value: "actions", sortable: false, width: 120 }
            ]
        }
    },
    computed: {
        mailhosts() {
            return this.$store.getters['pages/getMailhosts']
        }
    },
    watch: {
        ug_id(newVal, oldVal) {
            this.load()
        },
        $route(to, from) {
            if (this._inactive) return;
            this.load()
        },
        users() {
            this.selectedRows = [];
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        formatDate,

        async load() {
            this.loading = true;
            try {
                const params = {
                    limit: 1000, // Load all users for now
                    page: 1,
                    react_count: 1
                };

                if (this.ug_id && +this.ug_id !== 0) {
                    params.ug_id = this.ug_id
                }

                if (this.trashed) {
                    params.trashed = true
                }

                const response = await usersApi.getUsers(params);
                this.users = response.data || response || [];
            } catch (error) {
                console.error('Error loading users:', error);
                this.users = [];
            } finally {
                this.loading = false;
            }
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

        onRowClick(item) {
            this.onActionEdit([item])
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
    .users-data-table {
        --easy-table-border: 1px solid #dee2e6;
        --easy-table-row-border: 1px solid #dee2e6;
        --easy-table-header-font-size: 14px;
        --easy-table-header-height: 50px;
        --easy-table-header-font-color: #374151;
        --easy-table-header-background-color: #f8f9fa;
        --easy-table-row-hover-color: rgba(0, 123, 255, 0.05);
        --easy-table-body-row-height: 46px;
        --easy-table-body-row-font-size: 14px;
        --easy-table-footer-background-color: #f8f9fa;
        --easy-table-footer-font-color: #374151;
        --easy-table-footer-font-size: 12px;
        --easy-table-footer-padding: 0px 10px;
        --easy-table-footer-height: 50px;
        --easy-table-rows-per-page-selector-width: 70px;
        --easy-table-rows-per-page-selector-option-padding: 10px;
        --easy-table-scrollbar-track-color: #f1f1f1;
        --easy-table-scrollbar-color: #6b7280;
        --easy-table-scrollbar-thumb-color: #6b7280;
        --easy-table-scrollbar-corner-color: #f1f1f1;
        --easy-table-loading-color: #2563eb;
        --easy-table-empty-message-font-size: 16px;
        --easy-table-empty-message-font-color: #6b7280;
    }
}
</style>
