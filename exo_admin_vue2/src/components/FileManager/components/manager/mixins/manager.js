// Event bus
import EventBus from './../../../eventBus';
import TextCodeEditDialog from '@/components/dialogs/TextCodeEditDialog'
import editCodeAside from '@/components/FileManager/mixins/editCodeAside'

export default {
    mixins: [editCodeAside],
    computed: {
        /**
         * Selected disk for this manager
         * @returns {default.computed.selectedDisk|(function())|default.selectedDisk|null}
         */
        selectedDisk() {
            return this.$store.state.fm[this.manager].selectedDisk;
        },

        /**
         * Selected directory for this manager
         * @returns {default.computed.selectedDirectory|(function())|default.selectedDirectory|null}
         */
        selectedDirectory() {
            return this.$store.state.fm[this.manager].selectedDirectory;
        },
        /**
         * Selected items
         * @returns []
         */
        selectedItems() {
            return this.$store.getters['fm/selectedItems'];
        },

        /**
         * Files list for selected directory
         * @returns {*}
         */
        files() {
            return this.$store.getters[`fm/${this.manager}/files`];
        },

        /**
         * Directories list for selected directory
         * @returns {*}
         */
        directories() {
            return this.$store.getters[`fm/${this.manager}/directories`];
        },

        /**
         * Selected files and folders
         * @returns {default.computed.selected|(function())|selected|{directories, files}|string|*|boolean}
         */
        selected() {
            return this.$store.state.fm[this.manager].selected;
        },

        /**
         * ACL On/Off
         */
        acl() {
            return this.$store.state.fm.settings.acl;
        },

        /**
         * Check if current path is at root level
         * @return {boolean}
         */
        isRootPath() {
            return this.$store.state.fm[this.manager].selectedDirectory === null ||
                this.$store.state.fm[this.manager].selectedDirectory === 0 ||
                this.$store.state.fm[this.manager].selectedDirectory === this.$store.getters['fm/settings/rootPath'];
        },
    },
    methods: {
        /**
         * Load selected directory and show files
         * @param path
         */
        selectDirectory(path) {
            this.$store.dispatch(`fm/${this.manager}/selectDirectory`, {path, history: true});
        },

        /**
         * Level up directory
         */ async levelUp() {
            // if this a not root directory
            if (this.selectedDirectory) {
                // calculate up directory path
                let pathUp = await this.$store.dispatch('fm/getPathUp', this.selectedDirectory)
                if (pathUp !== -1) {
                    // load directory
                    await this.$store.dispatch(`fm/${this.manager}/selectDirectory`, {
                        path: pathUp || null,
                        history: true
                    });
                }
            }
        },

        /**
         * Check item - selected
         * @param type
         * @param path
         */
        checkSelect(type, path) {
            return this.selected[type].includes(path);
        },

        /**
         * Select items in list (files + folders)
         * @param type
         * @param path
         * @param event
         */
        selectItem(type, path, event) {
            // search in selected array
            const alreadySelected = this.selected[type].includes(path);

            // if pressed Ctrl -> multi select
            if (event.ctrlKey) {
                if (!alreadySelected) {
                    // add new selected item
                    this.$store.commit(`fm/${this.manager}/setSelected`, {type, path});
                } else {
                    // remove selected item
                    this.$store.commit(`fm/${this.manager}/removeSelected`, {type, path});
                }
            }

            // single select
            if (!event.ctrlKey && !alreadySelected) this.$store.commit(`fm/${this.manager}/changeSelected`, {
                type,
                path
            });
        },

        /**
         * Show context menu
         * @param item
         * @param event
         */
        contextMenu(item, event) {
            // el type
            const type = item.type === 'dir' ? 'directories' : 'files';
            // search in selected array
            const alreadySelected = this.selected[type].includes(item.path);

            // select this element
            if (!alreadySelected) {
                // select item
                this.$store.commit(`fm/${this.manager}/changeSelected`, {
                    type,
                    path: item.path,
                });
            }

            // create event
            EventBus.$emit('contextMenu', event);
        },

        /**
         * Select and Action
         * @param path
         * @param extension
         */ async selectAction(path, extension) {

            if (this.$store.state.fm.settings.mode === 'select') {
                this.$store.dispatch('fm/confirmSelect')
                return;
            }
            // if is set fileCallback
            if (this.$store.state.fm.fileCallback) {
                this.$store.dispatch('fm/url', {
                    disk: this.selectedDisk,
                    path,
                }).then((data) => {
                    this.$store.state.fm.fileCallback(data.url);
                });

                return;
            }

            // if extension not defined
            if (!extension) {
                return;
            }

            // show, play..
            if (this.$store.state.fm.settings.imageExtensions
                .includes(extension.toLowerCase())) {
                // show image
                this.$store.commit('fm/modal/setModalState', {
                    modalName: 'Preview',
                    show: true,
                });
            } else if (Object.keys(this.$store.state.fm.settings.textExtensions)
                .includes(extension.toLowerCase())) {

                await this.editCodeAside({
                    disk: this.selectedDisk,
                    selectedFile: this.selectedItems[0],
                })

            } else if (this.$store.state.fm.settings.audioExtensions
                .includes(extension.toLowerCase())) {
                // show player modal
                this.$store.commit('fm/modal/setModalState', {
                    modalName: 'AudioPlayer',
                    show: true,
                });
            } else if (this.$store.state.fm.settings.videoExtensions
                .includes(extension.toLowerCase())) {
                // show player modal
                this.$store.commit('fm/modal/setModalState', {
                    modalName: 'VideoPlayer',
                    show: true,
                });
            }
        },
    },
};
