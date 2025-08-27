<template>
    <app-screen>
        <template slot="aside" v-if="showGroupTree">
            <edition-tree class="mt-2"></edition-tree>
        </template>
    </app-screen>
</template>

<script>

import EditionTree from './parties/EditionTree'
import showGroupTree from '@/mixins/showGroupTree'

export default {
    name: 'Sitemap',
    mixins: [showGroupTree],
    components: {
        EditionTree,
    },
}
</script>

<style scoped lang="scss">

</style>
