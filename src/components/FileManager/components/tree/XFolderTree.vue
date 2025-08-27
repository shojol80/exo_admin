<template>
    <div class="fm-tree">
        <x-tree
            ref="xtree"
            :options="treeOptions"
            @add="onAdd"
            @edit="onEdit"
            @delete="onDelete"
            @click="onClick">
        </x-tree>
    </div>
</template>

<script>

import translate from './../../mixins/translate';
import Str from 'laravel-js-str';

export default {
    name: 'XFolderTree',
    mixins: [translate],
    data() {
        return {
            treeOptions: {
                customNodeEdit: true,
                //fetchData: this.fetchData,
                propertyNames: {
                    text: 'basename',
                    children: 'directories',
                    id: 'path'
                },
                //fetchData :this.fetchData,
                store: {
                    store: this.$store,
                    getter: () => {
                        return this.$store.getters['fm/xtree/tree']
                    },
                    dispatcher(tree) {
                        //we have no update action in component
                        //if update tree need convert to our format
                        //this.$store.commit('fm/xtree/setTree', tree)
                    },
                    mutations: ['fm/xtree/setTree']
                }
            },
        }
    },
    computed: {

        /**
         * Selected Disk
         * @returns {*}
         */
        selectedDisk() {
            return this.$store.getters['fm/selectedDisk'];
        },
        isRootSelected() {
            return this.$store.state.fm.left.selectedDirectory === null ||
                this.$store.state.fm.left.selectedDirectory === 0 ||
                this.$store.state.fm.left.selectedDirectory === this.$store.getters['fm/settings/rootPath'];
        },
    },
    watch: {
        '$store.state.fm.left.selectedDirectory'(path) {
            this.selectDirectory(path)
        },
        '$store.state.fm.xtree.directories'() {
            if (this.$store.state.fm.left.selectedDirectory) {
                this.selectDirectory(this.$store.state.fm.left.selectedDirectory)
            }
        }
    },
    methods: {

        selectDirectory(path) {
            let tree = this.$refs.xtree.tree
            let nodes = tree.find({
                id: path ? String(path) : ''
            })
            if (!nodes || nodes.length === 0) {
                nodes = tree.find({
                    id: '0'
                })
            }
            if (nodes && nodes.length > 0) {
                this.$refs.xtree.selectAndExpand(nodes[0])
            }
        },
        /**
         * Check, is this directory selected?
         * @param path
         * @returns {boolean}
         */
        isDirectorySelected(path) {
            return this.$store.state.fm.left.selectedDirectory === path;
        },

        onAdd(node) {
            this.$dialogs.prompt({
                title: this.lang.modal.newFolder.title,
                okTitle: this.lang.btn.create,
                message: this.lang.modal.newFolder.fieldName,
                value: '',
                required: true,
            }).then(response => {
                if (response.trigger !== 'ok') return
                const directoryName = response.value;
                this.$store.dispatch('fm/createDirectory', {name: directoryName, path: node.id})
            })
        },

        async onEdit(node) {
            let response = await this.$dialogs.prompt({
                title: this.lang.modal.rename.title,
                okTitle: this.lang.btn.rename,
                message: this.lang.modal.rename.fieldName,
                value: node.data.text,
                required: true,
            })

            if (response.trigger !== 'ok') return
            let newName = response.value
            if (this.selectedDisk !== 'DB') {
                newName = Str.of(node.id.toString()).beforeLast(node.data.text) + response.value
            }
            await this.$store.dispatch('fm/rename', {
                type: 'dir',
                newName,
                oldName: node.id,
            })
            //reselect if current dir selected
            if (this.isDirectorySelected(node.id)) {
                await this.$store.dispatch(`fm/left/selectDirectory`, {path: newName, history: false});
            }
        },

        onDelete(node) {
            this.$dialogs.confirmDelete({
                title: this.lang.modal.delete.title,
                message: `Are you sure want to delete the directory "${node.data.text}"?`
            }).then(response => {
                if (response.trigger !== 'ok') return

                this.$store.dispatch('fm/delete', [{path: node.id, type: 'dir'}]).then(() => {
                    //go up if current group selected
                    if (this.isDirectorySelected(node.id)) {
                        this.$store.dispatch('fm/left/selectDirectory', {path: node.parent.id, history: false});
                    }
                });

            })
        },

        onClick(node) {
            let path = node.id
            if (node.data.type === 'root' && this.selectedDisk !== 'DB') {
                path = null
            }
            if (!this.isDirectorySelected(path)) {

                this.$store.dispatch('fm/left/selectDirectory', {path: path, history: true});
            }
        },
    }
};
</script>

<style lang="scss">

@import "@/assets/scss/vue-component";

.fm-tree {
    //border-right: 1px solid #6d757d;

    & > .fm-folders-tree {
        padding-left: 0.2rem;
    }

    .fm-tree-disk {
        display: block;
        text-decoration: none;
        margin-bottom: 0.1rem;
        padding: 0.4rem 0.4rem;
        white-space: nowrap;
        cursor: pointer;
        //background-color: white;

        &:hover,
        &.selected {
            background-color: $secondary;
            color: $white;
        }
    }

    .fm-tree-disk > i {
        padding-left: 0.2rem;
        padding-right: 0.5rem;
    }
}
</style>
