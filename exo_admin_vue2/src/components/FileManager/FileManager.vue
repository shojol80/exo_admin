<template>
    <app-screen class="file-manager">
        <template #aside>
            <template v-if="windowsConfig === 2">
                <x-folder-tree class="mt-3"></x-folder-tree>
            </template>
        </template>

        <div class="fm"
             :class="{ 'fm-full-screen': fullScreen }">
            <navbar></navbar>
            <div class="fm-body">
                <context-menu></context-menu>
                <modal v-if="showModal"></modal>
                <template v-if="windowsConfig === 1">
                    <left-manager class="col" manager="left"></left-manager>
                </template>
                <template v-else-if="windowsConfig === 2">
                    <left-manager class="w-100" manager="left"></left-manager>
                </template>
                <template v-else-if="windowsConfig === 3">
                    <left-manager class="col-12 col-sm-6"
                                  manager="left"
                                  :click.native="selectManager('left')"
                                  :contextmenu.native="selectManager('left')">
                    </left-manager>
                    <right-manager class="col-12 col-sm-6"
                                   manager="right"
                                   :click.native="selectManager('right')"
                                   :contextmenu.native="selectManager('right')">
                    </right-manager>
                </template>
            </div>
            <info-block></info-block>
        </div>
    </app-screen>
</template>

<script>
/* eslint-disable import/no-duplicates, no-param-reassign */
import {mapState} from 'vuex';
import EventBus from './eventBus';
// Components
import Navbar from './components/blocks/Navbar.vue';
import XFolderTree from './components/tree/XFolderTree.vue';
import LeftManager from './components/manager/Manager.vue';
import RightManager from './components/manager/Manager.vue';
import Modal from './components/modals/Modal.vue';
import InfoBlock from './components/blocks/InfoBlock.vue';
import ContextMenu from './components/blocks/ContextMenu.vue';
// Mixins
import translate from './mixins/translate';

export default {
    name: 'FileManager',
    mixins: [translate],
    components: {
        Navbar,
        XFolderTree,
        LeftManager,
        RightManager,
        Modal,
        InfoBlock,
        ContextMenu,
    },
    props: {
        /**
         * View mode
         * */
        mode: {
            type: String,
            validator: (val) => ['browse', 'select', 'multi-select'].includes(val),
            default: 'browse'
        },

        /**
         * LFM manual settings
         */
        settings: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    watch: {
        mode() {
            this.$store.commit('fm/settings/mode', this.mode);
        }
    },

    created() {
        // manual settings
        this.$store.commit('fm/settings/manualSettings', this.settings);
        this.$store.commit('fm/settings/mode', this.mode);

        // initiate Axios
        //this.$store.commit('fm/settings/initAxiosSettings');
        //this.requestInterceptor();
        //this.responseInterceptor();

        // initialize app settings
        this.$store.dispatch('fm/initializeApp');

        EventBus.$on('selectfiles', (selection) => this.$emit('select', selection))
        /**
         * todo Keyboard event
         */
        /*
        window.addEventListener('keyup', (event) => {
          event.preventDefault();
          event.stopPropagation();

          EventBus.$emit('keyMonitor', event);
        });
        */
    },
    destroyed() {
        // reset state
        this.$store.dispatch('fm/resetState');

        // delete events
        EventBus.$off(['contextMenu', 'selectfiles']);
    },
    computed: {
        ...mapState('fm', {
            windowsConfig: state => state.settings.windowsConfig,
            activeManager: state => state.settings.activeManager,
            showModal: state => state.modal.showModal,
            fullScreen: state => state.settings.fullScreen,
        }),
    },
    methods: {
        /**
         * Select manager (when shown 2 file manager windows)
         * @param managerName
         */
        selectManager(managerName) {
            if (this.activeManager !== managerName) {
                this.$store.commit('fm/setActiveManager', managerName);
            }
        },
    },
};
</script>

<style lang="scss">
/*
todo broke build
*/
//@import "~plyr/src/sass/plyr.scss";
@import "src/assets/scss/vue-component";


.fm {
    position: relative;
    height: 100%;
    //padding: 1rem 1rem 0;
    //background-color: white;

    &:-moz-full-screen {
        background-color: white;
    }

    &:-webkit-full-screen {
        background-color: white;
    }

    &:fullscreen {
        background-color: white;
    }

    .fm-body {
        display: flex;
        //height: 100%;
        //margin-right: -15px;
        //margin-left: -15px;
        position: relative;
        //padding-top: 1rem;
        //padding-bottom: 1rem;
        //border-top: 1px solid #6d757d;
        height: calc(100% - #{$action-toolbar-height} - 31px);
        border-bottom: 1px solid #c8ced3;
    }

    .unselectable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
}

.fm-error {
    color: white;
    background-color: #dc3545;
    border-color: #dc3545;
}

.fm-danger {
    color: #dc3545;
    background-color: white;
    border-color: #dc3545;
}

.fm-warning {
    color: #ffc107;
    background-color: white;
    border-color: #ffc107;
}

.fm-success {
    color: #28a745;
    background-color: white;
    border-color: #28a745;
}

.fm-info {
    color: #17a2b8;
    background-color: white;
    border-color: #17a2b8;
}

.fm.fm-full-screen {
    width: 100%;
    height: 100%;
    padding-bottom: 0;
}
</style>

