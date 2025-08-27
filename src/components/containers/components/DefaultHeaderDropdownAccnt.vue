<template>
    <action-dropdown right no-caret>
        {{user_email}}
        <template slot="dropdown">
            <action-dropdown-header>
                Account
            </action-dropdown-header>
            <action-dropdown-item
                :icon="$icons.user"
                @click="profile">
                Profile</action-dropdown-item>
            <action-dropdown-item
                :icon="$icons.logout"
                @click="logout">
                Logout
            </action-dropdown-item>
        </template>
    </action-dropdown>
</template>

<script>
import {R_LOGIN, R_USER_EDIT} from '@/router/routs'

export default {
    name: 'DefaultHeaderDropdownAccnt',
    components: {

    },
    data: () => {
        return {}
    },
    computed: {
        user_email() {
            return this.$store.state.auth.user.email
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout').then(() => {
                this.$router.push({name: R_LOGIN})
            })
        },
        profile() {
            this.$router.push({name: R_USER_EDIT, params: {u_id: this.$store.state.auth.user.id, ug_id: 0}})
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
