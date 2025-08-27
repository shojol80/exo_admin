export default {
    computed: {
        fqt() {
            return this.$store.getters['ECO/fqtArray'].filter(item => {
                return !(item.builder && item.builder.hidden)
            })
        },
    },
    methods: {
        getGhostParent() {
            return document.body;
        },
    }
}
