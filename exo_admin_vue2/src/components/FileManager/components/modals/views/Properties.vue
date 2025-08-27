<template>
    <b-modal modal-class="modal-primary modal-min-btn fm-modal-properties"
             centered
             ref="modal"
             :size="modalSize"
             v-model="showModal"
             hide-footer>
        <template v-slot:modal-header>
            <h5 class="modal-title">{{ lang.modal.properties.title }}</h5>
            <button type="button" class="close" aria-label="Close" @click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>
        <div class="row">
            <div class="col-2">{{ lang.modal.properties.disk }}:</div>
            <div class="col-9">{{ selectedDisk }}</div>
            <div class="col-1 text-right">
                <i @click="copyToClipboard(selectedDisk)"
                   :title="lang.clipboard.copy"
                   class="far fa-copy"></i>
            </div>
        </div>
        <div class="row">
            <div class="col-2">{{ lang.modal.properties.name }}:</div>
            <div class="col-9">{{ selectedItem.basename }}</div>
            <div class="col-1 text-right">
                <i @click="copyToClipboard(selectedItem.basename)"
                   :title="lang.clipboard.copy"
                   class="far fa-copy"></i>
            </div>
        </div>
        <div class="row">
            <div class="col-2">{{ lang.modal.properties.path }}(id):</div>
            <div class="col-9">{{ selectedItem.path }}</div>
            <div class="col-1 text-right">
                <i @click="copyToClipboard(selectedItem.path)"
                   :title="lang.clipboard.copy"
                   class="far fa-copy"></i>
            </div>
        </div>
        <template v-if="selectedItem.type === 'file'">
            <div class="row">
                <div class="col-2">{{ lang.modal.properties.size }}:</div>
                <div class="col-9">{{ bytesToHuman(selectedItem.size) }}</div>
                <div class="col-1 text-right">
                    <i @click="copyToClipboard(bytesToHuman(selectedItem.size))"
                       :title="lang.clipboard.copy"
                       class="far fa-copy"></i>
                </div>
            </div>
            <div class="row">
                <div class="col-2">{{ lang.modal.properties.url }}:</div>
                <div class="col-9">
                    <span v-if="url">{{ url }}</span>
                    <span v-else>
                            <button @click="getUrl" type="button"
                                    class="btn btn-sm btn-light">
                                <i class="fas fa-sm fa-link"></i> Get URL
                            </button>
                        </span>
                </div>
                <div v-if="url" class="col-1 text-right">
                    <i @click="copyToClipboard(url)"
                       :title="lang.clipboard.copy"
                       class="far fa-copy"></i>
                </div>
            </div>
        </template>
        <template v-if="selectedItem.hasOwnProperty('timestamp')">
            <div class="row">
                <div class="col-2">{{ lang.modal.properties.modified }}:</div>
                <div class="col-9">{{ timestampToDate(selectedItem.timestamp) }}</div>
                <div class="col-1 text-right">
                    <i @click="copyToClipboard(timestampToDate(selectedItem.timestamp))"
                       :title="lang.clipboard.copy"
                       class="far fa-copy"></i>
                </div>
            </div>
        </template>
        <template v-if="selectedItem.hasOwnProperty('acl')">
            <div class="row">
                <div class="col-2">{{ lang.modal.properties.access }}:</div>
                <div class="col-9">{{ lang.modal.properties['access_' + selectedItem.acl] }}</div>
            </div>
        </template>
    </b-modal>
</template>

<script>
import modal from './../mixins/modal';
import translate from './../../../mixins/translate';
import helper from './../../../mixins/helper';

export default {
    name: 'Properties',
    mixins: [modal, translate, helper],
    data() {
        return {
            url: null,
        };
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
         * Selected file
         * @returns {*}
         */
        selectedItem() {
            return this.$store.getters['fm/selectedItems'][0];
        },
    },
    methods: {
        /**
         * Get URL
         */
        getUrl() {
            this.$store.dispatch('fm/url', {
                disk: this.selectedDisk,
                path: this.selectedItem.path,
            }).then((data) => {
                this.url = data.url;
            })
        },

        /**
         * Copy text to clipboard
         * @param text
         */
        copyToClipboard(text) {
            // create input
            const copyInputHelper = document.createElement('input');
            copyInputHelper.className = 'copyInputHelper';
            document.body.appendChild(copyInputHelper);
            // add text
            copyInputHelper.value = text;
            copyInputHelper.select();
            // copy text to clipboard
            document.execCommand('copy');
            // clear
            document.body.removeChild(copyInputHelper);

            // Notification
            this.$awn.success(this.lang.notifications.copyToClipboard)
        },
    },
};
</script>

<style lang="scss">
.fm-modal-properties .modal-body {
    .row {
        margin-bottom: 0.3rem;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;

        .fa-copy {
            padding-top: 0.2rem;
            display: none;
            cursor: pointer;
        }

        &:hover {
            background-color: #f8f9fa;

            & .fa-copy {
                display: block;
            }
        }
    }

    .col-2 {
        font-weight: bold;
    }

    .col-9 {
        word-wrap: break-word;
    }
}
</style>
