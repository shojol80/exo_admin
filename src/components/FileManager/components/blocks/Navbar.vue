<template>
    <action-toolbar :border="false" class="fm-navbar justify-content-between">
        <action-group>
            <action-button
                v-if="isSelectMode"
                :disabled="confirmDisabled"
                :title="lang.btn.confirmSelect"
                @action="confirmSelect()"
                :icon="$icons.confirm">
            </action-button>
            <action-group-separator v-if="isSelectMode"/>
            <action-button
                class="hidden-popup"
                :disabled="backDisabled"
                :title="lang.btn.back"
                @action="historyBack()"
                icon="fas fa-step-backward">
            </action-button>
            <action-button
                class="hidden-popup"
                :disabled="forwardDisabled"
                :title="lang.btn.forward"
                @action="historyForward()"
                icon="fas fa-step-forward">
            </action-button>
            <action-button
                @action="refreshAll()"
                :title="lang.btn.refresh"
                :icon="$icons.reload">
            </action-button>
            <action-group-separator/>
            <action-button
                @action="showModal('NewFolder')"
                :title="lang.btn.folder"
                :icon="$icons.folder">
            </action-button>
            <action-button
                disabled
                v-if="uploading"
                :title="lang.btn.upload"
                icon="fas fa-upload">
            </action-button>
            <action-button
                v-else
                @action="showModal('Upload')"
                :title="lang.btn.upload"
                icon="fas fa-upload">
            </action-button>
            <action-button
                :disabled="!isAnyItemSelected"
                @action="showModal('Delete','modal-danger')"
                :title="lang.btn.delete"
                icon="fas fa-trash-alt">
            </action-button>
            <action-group-separator/>
            <action-button
                :disabled="!isAnyItemSelected"
                :title="lang.btn.copy"
                @action="toClipboard('copy')"
                icon="fas fa-copy">
            </action-button>
            <action-button
                :disabled="!isAnyItemSelected"
                :title="lang.btn.cut"
                @action="toClipboard('cut')"
                icon="fas fa-cut">
            </action-button>
            <action-button
                :disabled="!clipboardType"
                :title="lang.btn.paste"
                @action="paste"
                icon="fas fa-paste">
            </action-button>
        </action-group>
        <action-group class="align-self-end">
            <!--<b-form-radio-group
                id="btn-radios-1"
                size="sm"
                :checked="filter"
                @change="filterChange"
                :options="filterExtOptions"
                buttons
                button-variant="outline-secondary"
                name="radios-btn-default"
            ></b-form-radio-group>-->
            <action-button
                :class="[viewType === 'grid' ? 'active' : '']"
                @action="selectView(viewType === 'table'?'grid':'table')"
                :title="viewType === 'table'?lang.btn.grid:lang.btn.table"
                :icon="viewType === 'table'?'fas fa-th':'fas fa-th-list'">
            </action-button>

            <action-dropdown :icon="$icons.filter">
                <template slot="dropdown">
                    <b-dropdown-item v-for="(item,index) in filterOptopns" :key="index"
                                     :active="filterExt===item.value"
                                     @click="setFilterExt(item)"
                    >
                        <i :class="item.icon"></i> {{ item.text }}
                    </b-dropdown-item>
                </template>
            </action-dropdown>
            <div class="fm-navbar__search">
                <b-form-input type="text"
                              placeholder="Filter..."
                              :debounce="300"
                              v-model="filter">
                </b-form-input>
            </div>
        </action-group>
    </action-toolbar>
</template>

<script>
import translate from './../../mixins/translate';

export default {
    mixins: [translate],
    data() {
        return {
            filter: '',
        }
    },
    watch: {
        filter() {
            this.$store.dispatch(`fm/${this.activeManager}/filter`, {filter: this.filter});
        },
    },
    computed: {

        filterExt() {
            return this.$store.state.fm[this.activeManager].filterExt;
        },

        filterOptopns() {
            return this.$store.state.fm.settings.filterOptions
        },
        /**
         * The current mode select or browse*/
        isSelectMode() {
            return 'browse' !== this.$store.state.fm.settings.mode
        },
        /**
         * Active manager name
         * @returns {default.computed.activeManager|(function())|string|activeManager}
         */
        activeManager() {
            return this.$store.state.fm.activeManager;
        },

        /**
         * Back button state
         * @returns {boolean}
         */
        backDisabled() {
            return !this.$store.state.fm[this.activeManager].historyPointer;
        },

        /**
         * Confirm button state
         * @returns {boolean}
         */
        confirmDisabled() {
            return this.$store.getters['fm/selectedItems'].length === 0
        },
        /**
         * Forward button state
         * @returns {boolean}
         */
        forwardDisabled() {
            return this.$store.state.fm[this.activeManager].historyPointer ===
                this.$store.state.fm[this.activeManager].history.length - 1;
        },

        /**
         * Is any files or directories selected?
         * @returns {boolean}
         */
        isAnyItemSelected() {
            return this.$store.state.fm[this.activeManager].selected.files.length > 0 ||
                this.$store.state.fm[this.activeManager].selected.directories.length > 0;
        },

        /**
         * Manager view type - grid or table
         * @returns {default.computed.viewType|(function())|string}
         */
        viewType() {
            return this.$store.state.fm[this.activeManager].viewType;
        },

        /**
         * Upload files
         * @returns {boolean}
         */
        uploading() {
            return this.$store.state.fm.messages.actionProgress > 0;
        },

        /**
         * Clipboard - action type
         * @returns {null}
         */
        clipboardType() {
            return this.$store.state.fm.clipboard.type;
        },

        /**
         * Full screen status
         * @returns {default.computed.fullScreen|(function())|boolean|fullScreen|*|string}
         */
        fullScreen() {
            return this.$store.state.fm.fullScreen;
        },

        /**
         * Show or Hide hidden files
         * @returns {boolean}
         */
        hiddenFiles() {
            return this.$store.state.fm.settings.hiddenFiles;
        },
    },
    methods: {

        setFilterExt(item) {

            if (this.filterExt !== item.value) {
                this.$store.commit(`fm/${this.activeManager}/setfilterExt`, item.value);
            } else {
                this.$store.commit(`fm/${this.activeManager}/setfilterExt`, '');
            }
        },
        /**
         * Refresh file manager
         */
        refreshAll() {
            this.$store.dispatch('fm/refreshAll');
        },

        /**
         * History back
         */
        historyBack() {
            this.$store.dispatch(`fm/${this.activeManager}/historyBack`);
        },

        /**
         * History forward
         */
        historyForward() {
            this.$store.dispatch(`fm/${this.activeManager}/historyForward`);
        },

        /**
         * Copy
         * @param type
         */
        toClipboard(type) {
            this.$store.dispatch('fm/toClipboard', type);

            // show notification
            if (type === 'cut') {
                this.$awn.success(this.lang.notifications.cutToClipboard)
            } else if (type === 'copy') {
                this.$awn.success(this.lang.notifications.copyToClipboard)
            }
        },

        /**
         * Paste
         */
        paste() {
            this.$store.dispatch('fm/paste');
        },

        /**
         * Set Hide or Show hidden files
         */
        toggleHidden() {
            this.$store.commit('fm/settings/toggleHiddenFiles');
        },

        /**
         * Show modal window
         * @param modalName
         * @param modalClass
         */
        showModal(modalName, modalClass) {
            // show selected modal
            this.$store.commit('fm/modal/setModalState', {
                modalName,
                show: true,
                modalClass
            });
        },

        /**
         * Select view type
         * @param type
         */
        selectView(type) {
            if (this.viewType !== type) this.$store.commit(`fm/${this.activeManager}/setView`, type);
        },

        confirmSelect() {
            //todo fix me
            this.$store.dispatch('fm/confirmSelect')
        }
    },
};
</script>

<style lang="scss">
.fm-navbar {
    &__search {
        min-width: 250px;
    }
}

.mode-popup {
    .fm-navbar {

        &__search {
            min-width: 190px;
        }
    }
}

</style>
