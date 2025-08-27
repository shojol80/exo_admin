<template>
    <b-modal modal-class="modal-primary modal-min-btn fm-modal-zip"
             centered
             ref="modal"
             :size="modalSize"
             v-model="showModal">
        <template v-slot:modal-header>
            <h5 class="modal-title">{{ lang.modal.zip.title }}</h5>
            <button type="button" class="close" aria-label="Close" @click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>
        <label for="fm-zip-name">{{ lang.modal.zip.fieldName }}</label>
        <div class="input-group mb-3">
            <b-input type="text" class="form-control" id="fm-zip-name"
                     :class="{'is-invalid': archiveExist}"
                     autofocus
                     v-model="archiveName"
                     @keyup="validateArchiveName">
            </b-input>
            <div class="input-group-append">
                <span class="input-group-text">.zip</span>
            </div>
            <div class="invalid-feedback" v-show="archiveExist">
                {{ lang.modal.zip.fieldFeedback }}
            </div>
        </div>
        <hr>
        <selected-file-list></selected-file-list>
        <template v-slot:modal-footer>
            <button class="btn btn-light" @click="hideModal">{{ lang.btn.cancel }}</button>
            <button class="btn btn-primary"
                    :disabled="!submitActive"
                    @click="createArchive">{{ lang.btn.submit }}
            </button>
        </template>
    </b-modal>
</template>

<script>
import SelectedFileList from '../additions/SelectedFileList.vue';
import modal from './../mixins/modal';
import translate from './../../../mixins/translate';

export default {
    name: 'Zip',
    mixins: [modal, translate],
    components: {SelectedFileList},
    data() {
        return {
            // name for new archive
            archiveName: '',

            // archive exist
            archiveExist: false,
        };
    },
    computed: {
        /**
         * Submit button - active or no
         * @returns {string|boolean}
         */
        submitActive() {
            return this.archiveName && !this.archiveExist;
        },
    },
    methods: {
        /**
         * Check the archive name if it exists or not.
         */
        validateArchiveName() {
            if (this.archiveName) {
                this.archiveExist = this.$store.getters[`fm/${this.activeManager}/fileExist`](`${this.archiveName}.zip`);
            } else {
                this.archiveExist = false;
            }
        },

        /**
         * Create new archive
         */
        createArchive() {
            this.$store.dispatch('fm/zip', `${this.archiveName}.zip`).then(() => {
                // close modal window
                this.hideModal();
            });
        },
    },
};
</script>
