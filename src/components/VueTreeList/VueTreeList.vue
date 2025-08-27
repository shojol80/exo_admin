<template>
    <div class="vtl">
        <div
            v-if="model.name !== 'root'"
            :id="model.id"
            class="vtl-node"
            :class="{ 'vtl-leaf-node': model.isLeaf, 'vtl-tree-node': !model.isLeaf }"
        >
            <div
                class="vtl-border vtl-up"
                :class="{ 'vtl-active': isDragEnterUp }"
                @drop="dropBefore"
                @dragenter="dragEnterUp"
                @dragover="dragOverUp"
                @dragleave="dragLeaveUp"
            />
            <!--
                        :draggable="!model.dragDisabled"
            -->
            <div
                :class="treeNodeClass"
                :draggable="false"
                @dragstart="dragStart"
                @dragover="dragOver"
                @dragenter="dragEnter"
                @dragleave="dragLeave"
                @drop="drop"
                @dragend="dragEnd"
                @mouseover="mouseOver"
                @mouseout="mouseOut"
                @click.stop="click"
            >
<!--                v-if="model.children && model.children.length > 0"-->
                <span class="vtl-caret vtl-is-small" v-if="!model.isLeaf">
                    <i class="vtl-icon" :class="caretClass" @click.prevent.stop="toggle"></i>
                </span>
                <span v-if="model.isLeaf">
                    <slot name="leafNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
                        <i class="vtl-icon vtl-menu-icon vtl-icon-file"></i>
                    </slot>
                </span>
                <span v-else>
                    <slot name="treeNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
                        <i class="vtl-icon vtl-menu-icon vtl-icon-folder"></i>
                    </slot>
                </span>
                <div class="vtl-node-content" v-if="!editable">
                    <slot name="leafNameDisplay" :expanded="expanded" :model="model" :root="rootNode">
                        {{ model.name }}
                    </slot>
                </div>
                <input
                    v-else
                    class="vtl-input"
                    type="text"
                    ref="nodeInput"
                    :value="model.name"
                    @input="updateName"
                    @blur="setUnEditable"
                />
                <!--                v-show="isHover"-->
                <div class="vtl-operation">
                    <action-dropdown size="sm" variant="white" :icon="$icons.more">
                        <template slot="dropdown">
                            <action-dropdown-item
                                :icon="$icons.add"
                                :title="defaultAddTreeNodeTitle"
                                @click.stop.prevent="addChild(false)"
                                v-if="!model.isLeaf && !model.addTreeNodeDisabled">
                                <slot name="addTreeNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
                                    New directory
                                </slot>
                            </action-dropdown-item>
                            <action-dropdown-item
                                :icon="$icons.new"
                                :title="defaultAddLeafNodeTitle"
                                @click.stop.prevent="addChild(true)"
                                v-if="!model.isLeaf && !model.addLeafNodeDisabled">
                                <slot name="addLeafNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
                                    New file
                                </slot>
                            </action-dropdown-item>
                            <action-dropdown-item
                                :icon="$icons.edit"
                                title="rename" @click.stop.prevent="setEditable" v-if="!model.editNodeDisabled">
                                <slot name="editNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
                                    Rename
                                </slot>
                            </action-dropdown-item>
                            <action-dropdown-item
                                :icon="$icons.delete"
                                title="delete" @click.stop.prevent="delNode" v-if="!model.delNodeDisabled">
                                <slot name="delNodeIcon" :expanded="expanded" :model="model" :root="rootNode">
                                    Delete
                                </slot>
                            </action-dropdown-item>
                        </template>
                    </action-dropdown>
                </div>
            </div>
            <div
                v-if="model.children && model.children.length > 0 && expanded"
                class="vtl-border vtl-bottom"
                :class="{ 'vtl-active': isDragEnterBottom }"
                @drop="dropAfter"
                @dragenter="dragEnterBottom"
                @dragover="dragOverBottom"
                @dragleave="dragLeaveBottom"
            ></div>
        </div>

        <div
            :class="{ 'vtl-tree-margin': model.name !== 'root' }"
            v-show="model.name === 'root' || expanded"
            v-if="isFolder"
        >
            <item
                v-for="model in model.children"
                :default-tree-node-name="defaultTreeNodeName"
                :default-leaf-node-name="defaultLeafNodeName"
                :default-expanded="defaultExpanded"
                :model="model"
                :key="model.id"
            >
                <template v-slot:leafNameDisplay="slotProps">
                    <slot name="leafNameDisplay" v-bind="slotProps"/>
                </template>
                <template v-slot:addTreeNodeIcon="slotProps">
                    <slot name="addTreeNodeIcon" v-bind="slotProps"/>
                </template>
                <template v-slot:addLeafNodeIcon="slotProps">
                    <slot name="addLeafNodeIcon" v-bind="slotProps"/>
                </template>
                <template v-slot:editNodeIcon="slotProps">
                    <slot name="editNodeIcon" v-bind="slotProps"/>
                </template>
                <template v-slot:delNodeIcon="slotProps">
                    <slot name="delNodeIcon" v-bind="slotProps"/>
                </template>
                <template v-slot:leafNodeIcon="slotProps">
                    <slot name="leafNodeIcon" v-bind="slotProps"/>
                </template>
                <template v-slot:treeNodeIcon="slotProps">
                    <slot name="treeNodeIcon" v-bind="slotProps"/>
                </template>
            </item>
        </div>
    </div>
</template>

<script>
import {TreeNode} from './Tree.js'
import {addHandler, removeHandler} from './tools.js'

let compInOperation = null

export default {
    name: 'vue-tree-list',
    data: function () {
        return {
            isHover: false,
            editable: false,
            isDragEnterUp: false,
            isDragEnterBottom: false,
            isDragEnterNode: false,
            expanded: this.defaultExpanded
        }
    },
    props: {
        model: {
            type: Object
        },
        defaultLeafNodeName: {
            type: String,
            default: 'Leaf Node'
        },
        defaultTreeNodeName: {
            type: String,
            default: 'Tree Node'
        },
        defaultAddTreeNodeTitle: {
            type: String,
            default: 'Add Tree Node'
        },
        defaultAddLeafNodeTitle: {
            type: String,
            default: 'Add Leaf Node'
        },
        defaultExpanded: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        rootNode() {
            if (this.model.name === 'root') return this
            var node = this.$parent
            while (node._props.model.name !== 'root') {
                node = node.$parent
            }
            return node
        },

        caretClass() {
            return this.expanded ? 'vtl-icon-caret-down' : 'vtl-icon-caret-right'
        },

        isFolder() {
            return this.model.children && this.model.children.length
        },
        treeNodeClass() {
            const {
                model: {dragDisabled, disabled},
                isDragEnterNode
            } = this

            return {
                'vtl-node-main': true,
                'vtl-active': isDragEnterNode,
                'vtl-drag-disabled': dragDisabled,
                'vtl-disabled': disabled
            }
        }
    },
    beforeCreate() {
        this.$options.components.item = require('./VueTreeList').default
    },
    mounted() {
        const vm = this
        addHandler(window, 'keyup', function (e) {
            // click enter
            if (e.keyCode === 13 && vm.editable) {
                vm.editable = false
            }
        })
    },
    beforeDestroy() {
        removeHandler(window, 'keyup')
    },
    methods: {
        updateName(e) {
            var oldName = this.model.name
            this.model.changeName(e.target.value)
            this.rootNode.$emit('change-name', {
                id: this.model.id,
                oldName: oldName,
                newName: e.target.value,
                node: this.model
            })
        },

        delNode() {
            this.rootNode.$emit('delete-node', this.model)
        },

        async setEditable() {
            let oldName = this.model.name
            let response = await this.$dialogs.prompt({
                title: 'Rename',
                okTitle: 'RENAME',
                message: 'New name',
                value: oldName,
                required: true,
            })
            if (response.trigger !== 'ok') return

            if (response.value === oldName) return

            this.model.changeName(response.value)

            this.rootNode.$emit('change-name', {
                id: this.model.id,
                node: this.model,
                oldName: oldName,
                newName: response.value,
                eventType: 'blur'
            })

            /*this.editable = true
            this.$nextTick(() => {
                const $input = this.$refs.nodeInput
                $input.focus()
                $input.setSelectionRange(0, $input.value.length)
            })*/
        },

        setUnEditable(e) {
            this.editable = false
            let oldName = this.model.name
            this.model.changeName(e.target.value)
            this.rootNode.$emit('change-name', {
                id: this.model.id,
                node: this.model,
                oldName: oldName,
                newName: e.target.value,
                eventType: 'blur'
            })
        },

        toggle() {
            //if (this.isFolder) {
                this.expanded = !this.expanded
            //}
        },

        mouseOver() {
            if (this.model.disabled) return
            this.isHover = true
        },

        mouseOut() {
            this.isHover = false
        },

        click() {
            this.rootNode.$emit('click', {
                toggle: this.toggle,
                ...this.model
            })
        },

        async addChild(isLeaf) {
            let name = isLeaf ? this.defaultLeafNodeName : this.defaultTreeNodeName
            this.expanded = true
            let response = await this.$dialogs.prompt({
                title: 'Create',
                okTitle: 'CREATE',
                message: 'Name',
                value: name,
                required: true,
            })
            if (response.trigger !== 'ok') return
            name = response.value
            let node = new TreeNode({name, isLeaf})
            this.model.addChildren(node, true)
            this.rootNode.$emit('add-node', node)
        },

        dragStart(e) {
            if (!(this.model.dragDisabled || this.model.disabled)) {
                compInOperation = this
                // for firefox
                e.dataTransfer.setData('data', 'data')
                e.dataTransfer.effectAllowed = 'move'
                return true
            }
            return false
        },
        dragEnd() {
            compInOperation = null
        },
        dragOver(e) {
            e.preventDefault()
            return true
        },
        dragEnter() {
            if (!compInOperation) return
            if (compInOperation.model.id === this.model.id || !compInOperation || this.model.isLeaf)
                return
            this.isDragEnterNode = true
        },
        dragLeave() {
            this.isDragEnterNode = false
        },
        drop() {
            if (!compInOperation) return
            const oldParent = compInOperation.model.parent
            compInOperation.model.moveInto(this.model)
            this.isDragEnterNode = false
            this.rootNode.$emit('drop', {
                target: this.model,
                node: compInOperation.model,
                src: oldParent
            })
        },

        dragEnterUp() {
            if (!compInOperation) return
            this.isDragEnterUp = true
        },
        dragOverUp(e) {
            e.preventDefault()
            return true
        },
        dragLeaveUp() {
            if (!compInOperation) return
            this.isDragEnterUp = false
        },
        dropBefore() {
            if (!compInOperation) return
            const oldParent = compInOperation.model.parent
            compInOperation.model.insertBefore(this.model)
            this.isDragEnterUp = false
            this.rootNode.$emit('drop-before', {
                target: this.model,
                node: compInOperation.model,
                src: oldParent
            })
        },

        dragEnterBottom() {
            if (!compInOperation) return
            this.isDragEnterBottom = true
        },
        dragOverBottom(e) {
            e.preventDefault()
            return true
        },
        dragLeaveBottom() {
            if (!compInOperation) return
            this.isDragEnterBottom = false
        },
        dropAfter() {
            if (!compInOperation) return
            const oldParent = compInOperation.model.parent
            compInOperation.model.insertAfter(this.model)
            this.isDragEnterBottom = false
            this.rootNode.$emit('drop-after', {
                target: this.model,
                node: compInOperation.model,
                src: oldParent
            })
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.vtl-caret {
    width: 25px;
    margin-left: -25px;

    .vtl-icon {
        position: relative;

        &:after {
            content: "";
            border: 1.5px solid #494646;
            position: absolute;
            border-left: 0;
            border-top: 0;
            left: 14px;
            top: 50%;
            height: 6px;
            width: 6px;
            transform: rotate(-45deg) translateY(-50%) translateX(0);
            transition: transform .25s;
            transform-origin: center;
        }

        &.vtl-icon-caret-down {
            &:after {
                transform: rotate(45deg) translateY(-50%) translateX(-5px);
                // border-color: #fff;
                //transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            }
        }
    }
}

.vtl-border {
    height: 5px;

    &.vtl-up {
        margin-top: -5px;
        background-color: transparent;
    }

    &.vtl-bottom {
        background-color: transparent;
    }

    &.vtl-active {
        border-bottom: 3px dashed $primary;
        /*background-color: blue;*/
    }
}

.vtl-node-main {
    position: relative;
    display: flex;
    align-items: center;
    padding: 3px 0 3px 1.2rem;
    min-height: 30px;
    cursor: pointer;


    .vtl-input {
        border: none;
        max-width: 150px;
        border-bottom: 1px solid $primary;
    }

    &:hover {
        background-color: $secondary;
        color: $white;

        .vtl-caret .vtl-icon {
            &:after {
                border-color: $white;
            }
        }

        .vtl-operation {
            display: block;
        }
    }

    &.vtl-active {
        outline: 2px dashed pink;
    }


}

.vtl-node-content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.vtl-operation {
    display: none;
    margin-left: auto;
    letter-spacing: 1px;
}

.vtl-item {
    cursor: pointer;
}

.vtl-tree-margin {
    margin-left: 2em;
    //TODO need remove for DnD
    margin-top: -10px;
}
</style>
