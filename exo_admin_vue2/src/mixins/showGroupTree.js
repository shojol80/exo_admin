export default {
    computed: {
        showGroupTree() {
            return !(this.$store.getters['app/screenMode'] === 'POPUP' && this.$route.meta.hideTreeInPopup)
        }
    },
}
