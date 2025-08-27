export default {
    directives: {
        /**
         * AutoFocus for inputs
         */
        focus: {
            inserted(el) {
                el.focus();
            },
        },
    },
    computed: {
        /**
         * Active manager
         * @returns {default.computed.activeManager|(function())|string|activeManager}
         */
        activeManager() {
            return this.$store.state.fm.activeManager;
        },
        showModal: {
            get() {
                return this.$store.state.fm.modal.showModal
            },
            set() {
                this.$store.commit('fm/modal/setModalState', {
                    modalName: null,
                    show: false,
                });
            }
        },

        /**
         * Selected modal name
         * @returns {null|*}
         */
        modalName() {
            return this.$store.state.fm.modal.modalName;
        },
        /**
         * Modal size style
         * @returns {{'modal-lg': boolean, 'modal-sm': boolean}}
         */
        modalSize() {
            return this.modalName === 'Preview' ? 'xl' : this.modalName === 'VideoPlayer' ? 'lg' : ''
        },
    },
    methods: {
        /**
         * Hide modal window
         */
        hideModal() {
            this.$store.commit('fm/modal/setModalState', {
                modalName: null,
                show: false,
            });
        },
    },
};
