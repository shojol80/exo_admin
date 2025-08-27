<template>
    <waiter ref="waiter" :show="loading">
        <!-- Simple User Group Navigation (Vue 3 Compatible) -->
        <div class="user-group-navigation">
            <div class="mb-3">
                <action-group>
                    <action-button @action="onAdd()"
                                   title="New user group"
                                   :icon="$icons.new">
                        New Group
                    </action-button>
                    <action-button @action="loadGroups"
                                   title="Refresh"
                                   :icon="$icons.reload">
                        Refresh
                    </action-button>
                </action-group>
            </div>

            <div class="user-groups-list">
                <div v-if="flatGroups.length === 0" class="text-center text-muted py-4">
                    <i :class="$icons.info" class="fs-1 mb-2"></i>
                    <p>No user groups found</p>
                </div>

                <div v-for="group in flatGroups"
                     :key="group.ug_id"
                     class="user-group-item"
                     :class="{
                         'active': selectedGroupId === group.ug_id,
                         'root-group': group.ug_id === '0'
                     }"
                     :style="{ paddingLeft: (16 + (group.level || 0) * 20) + 'px' }"
                     @click="onClick(group)">

                    <div class="group-info">
                        <div class="group-name">
                            <i :class="group.ug_id === '0' ? $icons.users : $icons.group" class="me-2"></i>
                            {{ group.ug_name }}
                        </div>
                        <div class="group-details text-muted small">
                            ID: {{ group.ug_id }} | Users: {{ group.ug_id === '0' ? 'All' : (group.user_count || 0) }}
                        </div>
                    </div>

                    <div class="group-actions" v-if="group.ug_id !== '0'">
                        <action-group @click.stop="void 0">
                            <action-button @action="onEdit(group)"
                                           title="Edit group"
                                           :icon="$icons.edit"
                                           size="sm">
                            </action-button>
                            <action-button @action="onDelete(group)"
                                           title="Delete group"
                                           :icon="$icons.delete"
                                           size="sm">
                            </action-button>
                        </action-group>
                    </div>
                </div>
            </div>
        </div>
    </waiter>
</template>

<script>
import {R_USERGROUP_EDIT, R_USERS_TABLE} from "@/router/routs"
import users from '@/services/api/users'
// import GroupTree from '@/mixins/GroupTree' // Temporarily disabled - Vue 2 compatibility

export default {
    name: "UserGroupTree",
    // mixins: [GroupTree], // Temporarily disabled - Vue 2 compatibility
    data() {
        return {
            loading: false,
            selectedGroupId: null,
            flatGroups: []
        }
    },
    computed: {
        // No computed properties needed for simple navigation
    },
    watch: {
        '$route'(to, from) {
            this.selectedGroupId = to.params.ug_id;
        }
    },
    mounted() {
        this.loadGroups();
        this.selectedGroupId = this.$route.params.ug_id;
    },
    methods: {
        async loadGroups() {
            this.loading = true;
            try {
                // Get the usergroups tree from store
                const usergroupsTree = this.$store.getters['usergroups/usergroupsTree'];

                // Create the root "All Users" group and flatten the tree
                this.flatGroups = [
                    {
                        ug_id: '0',
                        ug_name: 'All Users',
                        user_count: 'All',
                        level: 0
                    },
                    ...this.flattenTree(usergroupsTree)
                ];
            } catch (error) {
                console.error('Error loading user groups:', error);
                this.flatGroups = [];
            } finally {
                this.loading = false;
            }
        },

        flattenTree(tree, level = 0) {
            let result = [];
            if (Array.isArray(tree)) {
                for (const node of tree) {
                    result.push({
                        ...node,
                        level: level,
                        // Keep original name, use CSS for indentation
                        ug_name: node.ug_name,
                        user_count: node.user_count || 0
                    });
                    if (node.ug_children && node.ug_children.length > 0) {
                        result = result.concat(this.flattenTree(node.ug_children, level + 1));
                    }
                }
            }
            return result;
        },

        onAdd() {
            this.$router.push({
                name: R_USERGROUP_EDIT,
                params: {ug_id: 'new'},
                query: {ug_parent: this.selectedGroupId || '0'}
            })
        },

        onEdit(group) {
            this.$router.push({
                name: R_USERGROUP_EDIT,
                params: {ug_id: group.ug_id}
            })
        },

        async onDelete(group) {
            const response = await this.$dialogs.confirmDelete({
                title: 'Delete User Group',
                message: `Are you sure want to delete group "${group.ug_name}"?`
            })
            if (response.trigger === 'ok') {
                // Go to parent if current group selected
                if (this.$route.params.ug_id === group.ug_id) {
                    await this.$router.push({name: R_USERS_TABLE, params: {ug_id: '0'}})
                }
                await this.$refs.waiter.wait(async () => {
                    await users.deleteUsergroup({ug_id: group.ug_id})
                    await this.loadGroups(); // Refresh the list
                });
            }
        },

        onClick(group) {
            this.selectedGroupId = group.ug_id;
            this.$router.push({
                name: R_USERS_TABLE,
                params: {ug_id: group.ug_id}
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.user-group-navigation {
    .user-groups-list {
        background: white;
        border-radius: 4px;
        overflow: hidden;
    }

    .user-group-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 16px;
        border-bottom: 1px solid #e9ecef;
        cursor: pointer;
        transition: all 0.2s ease;
        min-height: 52px;

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background-color: #f8f9fa;
        }

        &.active {
            background-color: #e3f2fd;
            border-left: 4px solid #007bff;
            font-weight: 500;
        }

        &.root-group {
            background-color: #f8f9fa;
            font-weight: 600;
            border-bottom: 2px solid #dee2e6;

            &.active {
                background-color: #e3f2fd;
                border-left: 4px solid #007bff;
            }
        }

        .group-info {
            flex: 1;
            min-width: 0; // Allow text truncation

            .group-name {
                color: #495057;
                margin-bottom: 3px;
                font-size: 14px;
                display: flex;
                align-items: center;
                font-weight: 500;

                i {
                    color: #6c757d;
                    width: 18px;
                    flex-shrink: 0;
                    margin-right: 8px;
                }
            }

            .group-details {
                font-size: 12px;
                color: #6c757d;
                line-height: 1.3;
                font-weight: 400;
            }
        }

        .group-actions {
            opacity: 0;
            transition: opacity 0.2s ease;
            margin-left: 8px;
        }

        &:hover .group-actions {
            opacity: 1;
        }

        // Hierarchical styling for child groups
        &:not(.root-group) {
            background-color: #fdfdfd;

            &:hover {
                background-color: #f1f3f4;
            }

            &.active {
                background-color: #e8f4fd;
            }
        }
    }
}
</style>
