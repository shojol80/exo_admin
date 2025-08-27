<template>
    <app-screen>
        <template slot="aside" v-if="showGroupTree">
            <user-group-tree class="mt-3"></user-group-tree>
        </template>

        <!-- Main content area for child routes -->
        <router-view></router-view>
    </app-screen>
</template>

<script>

import UserGroupTree from '@/views/users/parties/UserGroupTree'
import showGroupTree from '@/mixins/showGroupTree'

export default {
    name: 'Users',
    mixins: [showGroupTree],
    components: {
        UserGroupTree,
    },
    watch: {
        '$route'(to, from) {
            //this.updatebreadcrumb()
        }
    },

    methods: {
        updatebreadcrumb() {

        }
    },

    mounted() {
    }
}

</script>
