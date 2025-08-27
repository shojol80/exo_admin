<template>
    <b-modal modal-class="modal-primary modal-min-btn fm-modal-video-player"
             centered
             ref="modal"
             :size="modalSize"
             v-model="showModal"
             hide-footer>
        <template v-slot:modal-header>
            <h5 class="modal-title w-75 text-truncate">
                {{ lang.modal.videoPlayer.title }} <small class="text-muted pl-3">{{ videoFile.basename }}</small>
            </h5>
            <button type="button" class="close" aria-label="Close" @click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>
        <video ref="fmVideo" controls></video>
    </b-modal>
</template>

<script>
// import Plyr from 'plyr/dist/plyr.min.js';
import modal from './../mixins/modal';
import translate from './../../../mixins/translate';

export default {
    name: 'Player',
    mixins: [modal, translate],
    data() {
        return {
            player: {},
        };
    },
    async mounted() {
        // TODO: Fix Plyr import issue
        console.log('VideoPlayer mounted - Plyr temporarily disabled');

        // // dynamically import Plyr
        // const Plyr = (await import('plyr')).default;
        //
        // // initiate video player
        // this.player = new Plyr(this.$refs.fmVideo);
        // load source
        this.player.source = {
            type: 'video',
            title: this.videoFile.filename,
            sources: [{
                src: `${this.$store.getters['fm/settings/baseUrl']}stream-file?disk=${this.selectedDisk}&path=${encodeURIComponent(this.videoFile.path)}`,
                type: `audio/${this.videoFile.extension}`,
            }],
        };
    },
    beforeDestroy() {
        this.player.destroy();
    },
    computed: {
        /**
         * Selected disk
         * @returns {*}
         */
        selectedDisk() {
            return this.$store.getters['fm/selectedDisk'];
        },

        /**
         * Video file
         * @returns {*}
         */
        videoFile() {
            return this.$store.getters['fm/selectedItems'][0];
        },
    },
    methods: {},
};
</script>

<style lang="scss">
.fm-modal-video-player {

}
</style>
