<template>
    <app-screen>
        <template #aside v-if="showGroupTree">
            <page-group-tree class="mt-2"></page-group-tree>
        </template>
    </app-screen>
</template>

<script>

import PageGroupTree from './parties/PageGroupTree'
import showGroupTree from '@/mixins/showGroupTree'

export default {
    name: 'Pages',
    mixins: [showGroupTree],
    components: {
        PageGroupTree,
    },
}
</script>

<style scoped lang="scss">

</style>
