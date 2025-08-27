<template>
    <waiter ref="waiter">
        <x-tree
            ref="xtree"
            :data="tree"
            :options="options"
            @click="onClick"
            @add="onAdd"
            @edit="onEdit"
            @delete="onDelete">
        </x-tree>
    </waiter>
</template>

<script>
import {R_EDITION_EDIT, R_EDITION_TABLE, R_SITE_EDIT} from "@/router/routs"
import editions from "@/services/api/editions";

export default {
    name: "PageGroupTree",
    data() {
        return {
            tree: [],
            options: {
                customNodeEdit: true,
            }
        }
    },
    watch: {
        '$route'(to, from) {
            this.selectByRoute()
        }
    },
    mounted() {
        this.load();
        exoEventBus.$on('exo-api-call:editions/saveEdition', this.load)
        exoEventBus.$on('exo-api-call:editions/deleteEdition', this.load)
        exoEventBus.$on('exo-api-call:editions/setDefaultEdition', this.load)
    },
    methods: {
        load() {
            editions.getExoAdminTree()
                .then(data => this.tree = data)
                .then(this.selectByRoute)
        },
        onAdd(node) {
            node.select()
            switch (node.data.type) {
                case 'root':
                    this.$router.push({name: R_EDITION_EDIT, params: {e_id: 'new'}})
                    break
                case 'edition':
                    /*this.$router.push({
                        name: R_PAGEGROUP_EDIT,
                        params: {
                            pagegroup_id: 'new',
                            e_id: this.getParentEdition(node),
                        }
                    })*/
                    break
            }
        },

        onEdit(node) {
            node.select()
            switch (node.data.type) {
                case 'root':
                    this.$router.push({
                        name: R_SITE_EDIT
                    })
                    break
                case 'edition':
                    this.$router.push({name: R_EDITION_EDIT, params: {e_id: node.id}})
                    break
            }
        },

        async onDelete(node) {
            let response = await this.$dialogs.confirmDelete({
                title: 'Delete',
                message: `Are you sure want to delete ${node.data.type} "${node.data.text}"?`
            })
            if (response.trigger !== 'ok') return


            node.hide()
            switch (node.data.type) {
                case 'edition':
                    this.$refs.waiter.wait(editions.deleteEdition({e_id: node.id}))
                    //if deleted item was select in tree go to common view
                    if (this.$route.name === R_EDITION_EDIT && +this.$route.params.e_id === +node.id) {
                        this.$router.replace({name: R_EDITION_TABLE})
                    }
                    break;
            }

        },

        onClick(node) {
            switch (node.data.type) {
                case 'root':
                    this.$router.push({
                        name: R_EDITION_TABLE
                    })
                    break
                case 'edition':
                    this.$router.push({
                        name: R_EDITION_EDIT,
                        params: {
                            e_id: node.id,
                        }
                    })
                    break
            }
        },

        getParentEdition(node) {
            if (node.data.type === 'edition') return node.id
            if (!node.parent) return null
            if (node.parent.data.type === 'edition') return node.parent.id
            else return this.getParentEdition(node.parent)
        },

        selectByRoute() {
            this.$nextTick(() => {
                let tree = this.$refs.xtree.tree
                if (tree.selected().length > 0) return
                let nodes = []

                if (this.$route.params.pagegroup_id > 0) {
                    nodes = tree.find({
                        id: this.$route.params.pagegroup_id,
                        data: {
                            type: 'pagegroup'
                        }
                    })
                } else {
                    nodes = tree.find({
                        id: this.$route.params.e_id,
                        data: {type: 'edition'}
                    })
                }

                if (!nodes || nodes.length === 0) {
                    nodes = tree.find({data: {type: 'root'}})
                }

                if (nodes && nodes.length > 0) {
                    this.$refs.xtree.selectAndExpand(nodes[0])
                }
            })
        }
    },


}
</script>

<style scoped>

</style>
