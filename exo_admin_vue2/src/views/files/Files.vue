<template>
    <file-manager
        :mode="mode"
        :settings="{folderBack, startFolder, startSelection, startDisk}"
        @select="select">
    </file-manager>
</template>

<script>

import FileManager from '@/components/FileManager/FileManager'

export default {
    name: "Files",
    components: {FileManager},
    props: ['mode', 'startFolder', 'startDisk', 'folderBack', 'startSelection'],
    data() {
        return {}
    },
    methods: {
        select(files, disk) {
            let namespace = this.$route.query.namespace ? '.' + this.$route.query.namespace : ''
            //exoEventBus extract payload array to arguments
            exoEventBus.$emit('exo-filemanager-select' + namespace, [files, disk])
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/vue-component";
</style>
