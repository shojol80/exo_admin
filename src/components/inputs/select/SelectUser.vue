<template>
    <x-select
        v-bind="$attrs"
        v-on="$listeners"
        :value="outerValue"
        @input="onInput"
        class="user-select"
        id-key="u_id"
        label-key="u_email"
        :placeholder="placeholder"
        :options="users"
        :loading="loading">
        <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
               :class="labelClassName">
            <span class="text-muted">[{{ node.id }}]</span>
            {{ node.label }}
        </label>
        <div slot="value-label" slot-scope="{ node }">
            <span class="text-muted">[{{ node.id }}]</span>
            {{ node.label }}
        </div>
    </x-select>
</template>

<script>
import usersApi from '@/services/api/users'

export default {
    name: "SelectUser",
    model: {
        prop: 'outerValue',
        event: 'input'
    },
    props: {
        outerValue: {
            type: null,
        },
        placeholder: {
            type: String,
            default: "Select a user"
        },
        excludeUserIds: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            users: [],
            loading: false
        }
    },
    async mounted() {
        await this.loadUsers()
    },
    methods: {
        async loadUsers() {
            try {
                this.loading = true
                const response = await usersApi.getUsers({
                    limit: 1000, // Get a reasonable number of users
                    page: 1
                })
                
                // Filter out excluded users (like the user being deleted)
                this.users = response.data.filter(user => 
                    !this.excludeUserIds.includes(user.u_id)
                ).map(user => ({
                    u_id: user.u_id,
                    u_email: user.u_email
                }))
            } catch (error) {
                console.error('Failed to load users:', error)
                this.users = []
            } finally {
                this.loading = false
            }
        },
        onInput(event) {
            this.$emit('input', event)
        },
    }
}
</script>

<style lang="scss">
.user-select {
    .vue-treeselect__control {
        width: auto;
    }
}
</style>
