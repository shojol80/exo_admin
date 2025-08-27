<template>
    <b-modal modal-class="modal-primary modal-min-btn fm-modal-rename"
             centered
             ref="modal"
             :size="modalSize"
             v-model="showModal">
        <template v-slot:modal-header>
            <h5 class="modal-title">{{ lang.modal.rename.title }}</h5>
            <button type="button" class="close" aria-label="Close" @click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>
        <div class="form-group">
            <label for="fm-input-rename">{{ lang.modal.rename.fieldName }}</label>
            <b-input type="text" class="form-control" id="fm-input-rename"
                     :class="{'is-invalid': checkName}"
                     v-model="name"
                     autofocus
                     @keyup="validateName">
            </b-input>
            <div class="invalid-feedback" v-show="checkName">
                {{ lang.modal.rename.fieldFeedback }}
                {{ directoryExist ? ` - ${lang.modal.rename.directoryExist}` : ''}}
                {{ fileExist ? ` - ${lang.modal.rename.fileExist}` : ''}}
            </div>
        </div>
        <template v-slot:modal-footer>
            <button class="btn btn-light" @click="hideModal">{{ lang.btn.cancel }}</button>
            <button class="btn btn-primary"
                    :disabled="submitDisable"
                    @click="rename">{{ lang.btn.rename }}
            </button>
        </template>
    </b-modal>
</template>

<script>
import modal from './../mixins/modal';
import translate from './../../../mixins/translate';

export default {
    name: 'Rename',
    mixins: [modal, translate],
    data() {
        return {
            name: '',
            directoryExist: false,
            fileExist: false,
        };
    },
    computed: {
        /**
         * Selected item
         * @returns {*}
         */
        selectedItem() {
            return this.$store.getters[`fm/${this.activeManager}/selectedList`][0];
        },

        /**
         * Check new name
         * @returns {boolean}
         */
        checkName() {
            return this.directoryExist || this.fileExist || !this.name;
        },

        /**
         * Submit button disable
         * @returns {*|boolean}
         */
        submitDisable() {
            return this.checkName || this.name === this.selectedItem.basename;
        },
    },
    mounted() {
        // initiate item name
        this.name = this.selectedItem.basename;
    },
    methods: {
        /**
         * Validate item name
         */
        validateName() {
            if (this.name !== this.selectedItem.basename) {
                // if item - folder
                if (this.selectedItem.type === 'dir') {
                    // check folder name matches
                    this.directoryExist = this.$store.getters[`fm/${this.activeManager}/directoryExist`](this.name);
                } else {
                    // check file name matches
                    this.fileExist = this.$store.getters[`fm/${this.activeManager}/fileExist`](this.name);
                }
            }
        },

        /**
         * Rename item
         */
        rename() {
            // create new name with path
            const newName = this.selectedItem.dirname ?
                `${this.selectedItem.dirname}/${this.name}` :
                this.name;

            this.$store.dispatch('fm/rename', {
                type: this.selectedItem.type,
                newName,
                oldName: this.selectedItem.path,
            }).then(() => {
                // close modal window
                this.hideModal();
            });
        },
    },
};
</script>
