<template>
    <b-modal modal-class="modal-primary modal-min-btn"
             centered
             ref="modal"
             :size="modalSize"
             v-model="showModal">
        <template v-slot:modal-header>
            <h5 class="modal-title">{{ lang.clipboard.title }}</h5>
            <button type="button" class="close" aria-label="Close" @click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>
        <template>
            <template v-if="clipboard.type">
                <div class="d-flex justify-content-between">
                    <div class="w-75 text-truncate">
                        <span>
                           <i class="far fa-hdd"></i>{{ clipboard.disk }}
                        </span>
                    </div>
                    <div class="text-right text-muted">
                        <span :title="`${lang.clipboard.actionType} - ${lang.clipboard[clipboard.type]}`">
                            <i v-if="clipboard.type === 'copy'" class="fas fa-copy"></i>
                            <i v-else class="fas fa-cut"></i>
                        </span>
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between"
                     v-for="(dir, index) in directories"
                     :key="`d-${index}`">
                    <div class="w-75 text-truncate">
                        <span>
                            <icon :icon="$icons.folder"></icon>{{ dir.name }}
                        </span>
                    </div>
                    <div class="text-right">
                        <button type="button" class="close"
                                :title="lang.btn.delete"
                                @click="deleteItem('directories', dir.path)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="d-flex justify-content-between"
                     v-for="(file, index) in files"
                     :key="`f-${index}`">
                    <div class="w-75 text-truncate">
                        <span>
                            <i class="far" :class="file.icon"></i>{{ file.name }}
                        </span>
                    </div>
                    <div class="text-right">
                        <button type="button" class="close"
                                :title="lang.btn.delete"
                                @click="deleteItem('files', file.path)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </template>
            <template v-else>
                <span>{{ lang.clipboard.none }}</span>
            </template>
        </template>
        <template v-slot:modal-footer>
            <button class="btn btn-light" @click="hideModal">{{ lang.btn.cancel }}</button>
            <button class="btn btn-primary"
                    :disabled="!clipboard.type"
                    @click="resetClipboard">{{ lang.btn.clear }}
            </button>
        </template>
    </b-modal>
</template>

<script>
import modal from './../mixins/modal';
import translate from './../../../mixins/translate';
import helper from './../../../mixins/helper';

export default {
    name: 'Clipboard',
    mixins: [modal, translate, helper],
    computed: {
        /**
         * Clipboard state
         * @returns {*}
         */
        clipboard() {
            return this.$store.state.fm.clipboard;
        },

        /**
         * Paths and names for directories
         * @returns {{path: *, name: *}[]}
         */
        directories() {
            return this.$store.state.fm.clipboard.directories.map(item => ({
                path: item,
                name: item.split('/').slice(-1)[0],
            }));
        },

        /**
         * File names, paths and icons
         * @returns {{path: *, name: *, icon: *}[]}
         */
        files() {
            return this.$store.state.fm.clipboard.files.map((item) => {
                const name = item.split('/').slice(-1)[0];
                return {
                    path: item,
                    name,
                    icon: this.extensionToIcon(name.split('.').slice(-1)[0]),
                };
            });
        },
    },
    methods: {
        /**
         * Delete item from clipboard
         * @param type
         * @param path
         */
        deleteItem(type, path) {
            this.$store.commit('fm/truncateClipboard', {type, path});
        },

        /**
         * Reset clipboard
         */
        resetClipboard() {
            this.$store.commit('fm/resetClipboard');
        },
    },
};
</script>

<style lang="scss">
.fm-modal-clipboard {

    .modal-body .far {
        padding-right: 0.5rem;
    }
}
</style>
