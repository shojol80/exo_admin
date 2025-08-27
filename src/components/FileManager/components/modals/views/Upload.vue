<template>
    <b-modal modal-class="modal-primary modal-min-btn fm-modal-upload"
             centered
             ref="modal"
             :size="modalSize"
             v-model="showModal">
        <template v-slot:modal-header>
            <h5 class="modal-title">{{ lang.modal.upload.title }}</h5>
            <button type="button" class="close" aria-label="Close" @click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>
        <div class="fm-btn-wrapper" v-show="!progressBar">
            <button type="button" class="btn btn-secondary btn-block">
                {{ lang.btn.uploadSelect }}
            </button>
            <input type="file" multiple name="myfile" @change="selectFiles($event)">
        </div>
        <div class="fm-upload-list" v-if="countFiles">
            <div class="d-flex justify-content-between"
                 v-for="(item, index) in newFiles"
                 :key="index">
                <div class="w-75 text-truncate">
                    <i class="far" :class="mimeToIcon(item.type)"></i>
                    {{ item.name }}
                </div>
                <div class="text-right">
                    {{ bytesToHuman(item.size) }}
                </div>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
                <div>
                    <strong>{{ lang.modal.upload.selected }}</strong>
                    {{ newFiles.length }}
                </div>
                <div class="text-right">
                    <strong>{{ lang.modal.upload.size }}</strong>
                    {{ allFilesSize }}
                </div>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
                <div>
                    <strong>{{ lang.modal.upload.ifExist }}</strong>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input"
                           id="uploadRadio1"
                           type="radio"
                           name="uploadOptions"
                           value="0"
                           checked
                           v-model="overwrite">
                    <label class="form-check-label" for="uploadRadio1">
                        {{ lang.modal.upload.skip }}
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input"
                           id="uploadRadio2"
                           type="radio"
                           name="uploadOptions"
                           value="1"
                           checked
                           v-model="overwrite">
                    <label class="form-check-label" for="uploadRadio2">
                        {{ lang.modal.upload.overwrite }}
                    </label>
                </div>
            </div>
            <hr>
        </div>
        <div v-else><p>{{ lang.modal.upload.noSelected }}</p></div>
        <div class="fm-upload-info">
            <!-- Progress Bar -->
            <div class="progress" v-show="countFiles">
                <div class="progress-bar progress-bar-striped bg-info" role="progressbar"
                     :aria-valuenow="progressBar"
                     aria-valuemin="0"
                     aria-valuemax="100"
                     :style="{width: progressBar + '%' }">
                    {{ progressBar }}%
                </div>
            </div>
        </div>
        <hr>
        <label for="input_url">Upload from URL</label>
        <b-form-input type="text" id="input_url" v-model.trim="fileURL"></b-form-input>
        <template v-slot:modal-footer>
            <button class="btn btn-light" @click="hideModal()">{{ lang.btn.cancel }}</button>
            <button class="btn"
                    :class="[countFiles || fileURL ? 'btn-primary' : 'btn-light']"
                    :disabled="!countFiles && !fileURL"
                    @click="uploadFiles">{{ lang.btn.upload }}
            </button>
        </template>
    </b-modal>
</template>

<script>
import modal from './../mixins/modal';
import translate from './../../../mixins/translate';
import helper from './../../../mixins/helper';

export default {
    name: 'Upload',
    mixins: [modal, translate, helper],
    data() {
        return {
            // selected files
            newFiles: [],

            // overwrite if exists
            overwrite: 0,

            fileURL: '',
        }
    },
    computed: {

        /**
         * Progress bar value - %
         * @returns {number}
         */
        progressBar() {
            return this.$store.state.fm.messages.actionProgress;
        },

        /**
         * Count of files selected for upload
         * @returns {number}
         */
        countFiles() {
            return this.newFiles.length;
        },

        /**
         * Calculate the size of all files
         * @returns {*|string}
         */
        allFilesSize() {
            let size = 0;

            for (let i = 0; i < this.newFiles.length; i += 1) {
                size += this.newFiles[i].size;
            }

            return this.bytesToHuman(size);
        },

    },
    methods: {
        /**
         * Select file or files
         * @param event
         */
        selectFiles(event) {
            // files selected?
            if (event.target.files.length === 0) {
                // no file selected
                this.newFiles = [];
            } else {
                // we have file or files
                this.newFiles = event.target.files;
            }
        },

        /**
         * Upload new files
         */
        uploadFiles() {
            // if files exists
            if (this.countFiles || this.fileURL) {
                // upload files
                this.$store.dispatch('fm/upload', {
                    files: this.newFiles,
                    overwrite: this.overwrite,
                    fileURL: this.fileURL
                }).then((response) => {
                    // if upload is successful
                    // close modal window
                    this.hideModal();
                }).catch((error) => {
                    //this api error and precessed in Api.js
                    if (error && error.status === 200) return

                    if (error && error.response && error.response.status === 413) {
                        this.$awn.alert(this.lang.response.uploadToLarge)
                    } else if (error && error.response && error.response.statusText) {
                        this.$awn.alert(error.response.statusText)
                    } else {
                        this.$awn.alert(this.lang.response.unknownUploadError)
                    }
                    console.error(error)
                });
            }
        },
    },
};
</script>

<style lang="scss">
.fm-modal-upload {

    .fm-btn-wrapper {
        position: relative;
        overflow: hidden;
        padding-bottom: 6px;
        margin-bottom: 0.6rem;
    }

    .fm-btn-wrapper input[type=file] {
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }

    .fm-upload-list .far {
        padding-right: 0.5rem;
    }

    .fm-upload-list .form-check-inline {
        margin-right: 0;
    }

    .fm-upload-info > .progress {
        margin-bottom: 1rem;
    }
}
</style>
