<template>
    <b-modal modal-class="modal-primary modal-min-btn"
             centered
             ref="modal"
             :size="modalSize"
             v-model="showModal">
        <template v-slot:modal-header>
            <h5 class="modal-title">{{ lang.modal.newFolder.title }}</h5>
            <button type="button" class="close" aria-label="Close" @click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>
        <slot>
            <div class="form-group">
                <label for="fm-folder-name">{{ lang.modal.newFolder.fieldName }}</label>
                <b-input type="text"
                         class="form-control"
                         id="fm-folder-name"
                         autofocus
                         :class="{'is-invalid': directoryExist}"
                         v-model="directoryName"
                         @keyup="validateDirName">
                </b-input>
                <div class="invalid-feedback" v-show="directoryExist">
                    {{ lang.modal.newFolder.fieldFeedback }}
                </div>
            </div>
        </slot>
        <template v-slot:modal-footer>
            <button class="btn btn-light" @click="hideModal">{{ lang.btn.cancel }}</button>
            <button class="btn btn-primary"
                    :disabled="!submitActive"
                    @click="addFolder">{{ lang.btn.create }}
            </button>
        </template>
    </b-modal>
</template>

<script>
import modal from './../mixins/modal';
import translate from './../../../mixins/translate';

export default {
    name: 'NewFolder',
    mixins: [modal, translate],
    data() {
        return {
            // name for new directory
            directoryName: '',

            // directory exist
            directoryExist: false,
        };
    },
    computed: {
        /**
         * Submit button - active or no
         * @returns {string|boolean}
         */
        submitActive() {
            return this.directoryName && !this.directoryExist;
        },
    },
    methods: {

        /**
         * Check the folder name if it exists or not.
         */
        validateDirName() {
            if (this.directoryName) {
                this.directoryExist = this.$store.getters[`fm/${this.activeManager}/directoryExist`](this.directoryName);
            } else {
                this.directoryExist = false;
            }
        },

        /**
         * Create new directory
         */
        addFolder() {
            this.$store.dispatch('fm/createDirectory', {name: this.directoryName}).then((data) => {
                // if new directory created successfully
                // close modal window
                this.hideModal();
            });
        },
    },
};
</script>
