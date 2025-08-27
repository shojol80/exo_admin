<template>
    <component
        :is="modalName"
        ref="fmModal"
    ></component>
</template>

<script>
import NewFile from './views/NewFile.vue';
import NewFolder from './views/NewFolder.vue';
import Upload from './views/Upload.vue';
import Delete from './views/Delete.vue';
import Clipboard from './views/Clipboard.vue';
import Status from './views/Status.vue';
import Rename from './views/Rename.vue';
import Properties from './views/Properties.vue';
import Preview from './views/Preview.vue';
import AudioPlayer from './views/AudioPlayer.vue';
import VideoPlayer from './views/VideoPlayer.vue';
import Zip from './views/Zip.vue';
import Unzip from './views/Unzip.vue';

export default {
    name: 'Modal',
    components: {
        NewFile,
        NewFolder,
        Upload,
        Delete,
        Clipboard,
        Status,
        Rename,
        Properties,
        Preview,
        AudioPlayer,
        VideoPlayer,
        Zip,
        Unzip,
    },
    mounted() {
        // set height
        this.$store.commit('fm/modal/setModalBlockHeight', this.$refs.fmModal.offsetHeight);
    },
    computed: {

        /**
         * Selected modal name
         * @returns {null|*}
         */
        modalName() {
            return this.$store.state.fm.modal.modalName;
        },
    },
    methods: {},
};
</script>

<style lang="scss">

</style>
