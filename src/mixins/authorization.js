export default {
    computed: {
        isDeveloper() {
            return this.$store.getters['auth/isDeveloper']
        }
    }
}
