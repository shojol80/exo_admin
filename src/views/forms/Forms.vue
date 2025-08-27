<template>
    <app-screen>
        <template #aside v-if="showGroupTree">
            <form-group-tree class="mt-3"></form-group-tree>
        </template>
    </app-screen>
</template>

<script>
import FormGroupTree from './parties/FormGroupTree'
import showGroupTree from '@/mixins/showGroupTree'

export default {
    name: "Forms",
    mixins: [showGroupTree],
    components: {
        FormGroupTree
    }
}
</script>

<style scoped>

</style>
