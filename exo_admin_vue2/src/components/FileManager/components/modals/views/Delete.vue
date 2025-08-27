<template>
    <b-modal modal-class="modal-danger modal-min-btn"
             centered
             ref="modal"
             :size="modalSize"
             v-model="showModal">
        <template v-slot:modal-header>
            <h5 class="modal-title">{{ lang.modal.delete.title }}</h5>
            <button type="button" class="close" aria-label="Close" @click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>
        <div v-if="selectedItems.length">
            <selected-file-list></selected-file-list>
        </div>
        <div v-else>
            <span class="text-danger">{{ lang.modal.delete.noSelected }}</span>
        </div>
        <template v-slot:modal-footer>
            <button class="btn btn-light" @click="hideModal">{{ lang.btn.cancel }}</button>
            <button class="btn btn-danger" @click="deleteItems">{{ lang.modal.delete.title }}
            </button>
        </template>
    </b-modal>
</template>

<script>
import SelectedFileList from '../additions/SelectedFileList.vue';
import modal from './../mixins/modal';
import translate from './../../../mixins/translate';

export default {
    name: 'Delete',
    mixins: [modal, translate],
    components: {SelectedFileList},
    computed: {
        /**
         * Files and folders for deleting
         * @returns {*}
         */
        selectedItems() {
            return this.$store.getters['fm/selectedItems'];
        },
    },
    methods: {
        /**
         * Delete selected directories and files
         */
        deleteItems() {
            // create items list for delete
            const items = this.selectedItems.map(item => ({
                path: item.path,
                type: item.type,
            }));

            this.$store.dispatch('fm/delete', items).then(() => {
                // close modal window
                this.hideModal();
            });
        },
    },
};
</script>
