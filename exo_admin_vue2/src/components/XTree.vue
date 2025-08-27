<template>
    <tree class="x-tree"
          :data="data"
          :options="options"
          ref="refTree"
          @node:selected="onNodeSelected"
          @node:clicked="onClicked">
        <div slot-scope="{ node }" class="node-container">
            <div v-show="node.data.icon" class="node-icon">
                <i :class="node.data.icon" aria-hidden="true"></i>
            </div>
            <div class="node-text">{{ node.text }}</div>
            <ul class="node-controls" v-if="node.states.menu!==false">
                <slot name="actions"></slot>
                <action-dropdown :icon="$icons.more" right variant="white" :boundary="'viewport'">
                    <template slot="dropdown">
                        <action-dropdown-item
                            @click.prevent.stop="editNode(node)"
                            v-show="node.states.editable!==false"
                            :icon="$icons.edit">Edit
                        </action-dropdown-item>
                        <action-dropdown-item
                            @click.prevent.stop="deleteNode(node)"
                            v-show="node.states.deleteble!==false"
                            :icon="$icons.delete">Remove
                        </action-dropdown-item>
                        <action-dropdown-item
                            @click.prevent.stop="addChildNode(node)"
                            v-show="node.states.append!==false"
                            :icon="$icons.add">Add child
                        </action-dropdown-item>
                        <template v-if="node.id>0">
                            <action-dropdown-divider></action-dropdown-divider>
                            <action-dropdown-item
                                @click.prevent.stop="void 0"
                                :icon="$icons.info">Id:{{ node.id }}
                            </action-dropdown-item>
                        </template>
                    </template>
                </action-dropdown>
            </ul>
        </div>
    </tree>
</template>

<script>

import LiquorTree from 'liquor-tree'

export default {
    name: "XTree",
    components: {
        [LiquorTree.name]: LiquorTree
    },
    props: {
        data: Array,
        options: Object
    },

    data() {
        return {}
    },

    watch: {
        data: {
            immediate: false,
            handler(newVal) {
                if (newVal) this.$refs.refTree.tree.setModel(newVal)
            }
        }
    },
    computed: {
        //proxy ref to parent
        tree() {
            return this.$refs.refTree.tree
        }
    },
    mounted() {
        this.$refs.refTree.$on('node:editing:start', (node) => {
        })

        this.$refs.refTree.$on('node:editing:stop', (node, isTextChanged) => {
            this.$emit('edit', node)
        })
    },
    methods: {
        editNode(node) {
            if (!!this.options.customNodeEdit) {
                this.$emit('edit', node)
            } else {
                node.startEditing()
            }
        },

        deleteNode(node) {
            this.$emit('delete', node)
        },

        addChildNode(node) {
            this.$emit('add', node)
        },

        onNodeSelected(node) {
            this.$emit('select', node)
        },

        selectAndExpand(node) {
            if (!node) return
            node.select()
            this.expandAll(node)
        },

        expandAll(node) {
            if (!node) return
            node.expand()
            this.expandAll(node.parent)
        },

        onClicked(node) {
            this.$emit('click', node)
            if (node.states.expanded) {
                node.toggleExpand()
            }
        },
    }
}

</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.x-tree {
    &.tree {
        overflow: visible
    }

    > ul.tree-root,
    > .tree-filter-empty {
        padding: 0;
    }

    .tree-anchor {
        margin-left: 0;
        width: calc(100% - 30px);
    }

    .tree-node {
        > .tree-content {
            padding: 0.157rem;
            position: relative;
            //overflow: hidden;
            //transition: color 0.05s ease-in-out, background-color 0.05s ease-in-out
        }

    }

    .tree-node.selected > .tree-content {
        background-color: $secondary;

        > .tree-anchor {
            color: $white;
        }

        > .tree-arrow {
            &:after {
                border-color: $white;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
            }
        }

    }

    .tree-arrow.has-child:after {
        border-color: #c5c5c5;
    }

    .tree-node:not(.selected) > .tree-content:hover {
        background: $secondary;

        .tree-anchor {
            color: $white;
        }

        > .tree-arrow {
            &:after {
                border-color: $white;
            }
        }
    }

    .node-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;

        .node-icon {
            margin-right: 0.5rem;
        }

        .node-text {
            overflow: hidden;
            display: inline-block;
            flex: 1;
            max-width: inherit;
            /* height: 19px; */
            line-height: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .node-controls {
            display: none;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            padding: 0 0.7em;
            align-items: center;
            justify-content: flex-end;
            flex-wrap: nowrap;
            flex-direction: row;
            background-color: $secondary;
            box-shadow: -8px 0 10px -6px $secondary;
            list-style: none;
        }

    }

    .tree-content:hover {
        .node-controls {
            display: flex;
            //transition: right 0.15s ease-in-out;
        }
    }
}


</style>
