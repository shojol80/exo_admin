export default {
    computed: {
        showDeprecated() {
            return this.$store.getters['site/getSiteVarValue']('show_deprecated_feature')
        }
    },
}
