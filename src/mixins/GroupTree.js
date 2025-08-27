export default {
    methods: {
        selectByRoute(params) {
            this.$nextTick(() => {
                let tree = this.$refs.xtree.tree
                if (tree.selected().length > 0) return
                let nodes = tree.find({
                    id: +this.$route.params[params.id]
                })

                if (!nodes || nodes.length === 0) {
                    nodes = tree.find({
                        id: +this.$route.query[params.parent]
                    })
                }

                if (!nodes || nodes.length === 0) {
                    nodes = tree.find({
                        id: '0'
                    })
                }

                if (nodes && nodes.length > 0) {
                    this.$refs.xtree.selectAndExpand(nodes[0])
                }
            })
        }
    }
}
