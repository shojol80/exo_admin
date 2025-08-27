<template>
    <div
        :style="{gridColumn:slotData.column, gridRow:slotData.row}"
        :class="classes">
        <div class="template-slot-header">
            <h4 class="slot-legend">
                {{ slotData.name }}
            </h4>
            <action-group v-if="!slotData.disabled">
                <action-dropdown :icon="$icons.add" title="Add items" size="sm">
                    <template #dropdown>
                        <b-dropdown-item @click="addNewItem">Add new block</b-dropdown-item>
                        <b-dropdown-item @click="addItems">Select existing block</b-dropdown-item>
                    </template>
                </action-dropdown>
            </action-group>
        </div>
        <b-list-group v-if="!slotData.disabled">
            <!--            drag-handle-selector=".drag-handle"-->
            <Container
                data-empty-title="Press '+' or drag a block from the right to this slot"
                group-name="1"
                :get-child-payload="getChildPayload"
                @drop="onDrop"
                drag-class="item-drag-class"
                :drop-placeholder="placeholderOptions"
                :remove-on-drop-out="false">
                <Draggable v-for="(item,index) in items" :key="item[keyName]+'_'+index">
                    <block-row :block="item"
                               @remove="removeItem(index)"
                               @edit="editItem(item['react_id'])">
                    </block-row>
                </Draggable>
            </Container>
        </b-list-group>
        <div v-else style="min-height: 33px"></div>
    </div>
</template>
<script>
import {Container, Draggable} from "vue-smooth-dnd";
import BlockRow from "@/components/ReactLayout/components/BlockRow";
import EditReactAside from "@/components/dialogs/EditReactAside";
import SelectReactsAside from "@/components/dialogs/SelectReactsAside";
import isEmpty from "@modules/isEmpty";
import rl from "@/services/api/rl";

const applyDrag = (arr, dragResult) => {
    const {removedIndex, addedIndex, payload} = dragResult
    if (removedIndex === null && addedIndex === null) return arr
    const result = [...arr]
    let itemToAdd = payload
    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }
    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }
    return result
}

export default {
    name: 'TemplateSlot',
    components: {
        Container,
        Draggable,
        BlockRow,
    },
    props: {
        slotData: {},
    },
    data() {
        return {
            keyName: 'react_id',
            placeholderOptions: {
                className: 'slot-drop-placeholder',
                animationDuration: '150',
                showOnTop: false
            },
        }
    },
    computed: {
        classes() {
            return {
                'template-slot': true,
                'template-slot--disabled': this.slotData.disabled,
                //'template-slot--empty': this.isEmpty
            }
        },
        items() {
            if (!this.slotData.name) return []
            return this.$store.getters['rl/getCurrentLayout'][this.slotData.name] || []
        }
    },
    methods: {
        getChildPayload(index) {
            return this.items[index]
        },
        getGhostParent() {
            return document.body;
        },
        onDrop(dropResult) {
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                let items = [...this.items]
                items = applyDrag(items, dropResult)
                //this.items = items
                this.$store.dispatch('rl/updateSlotItemsAndSave', {slot_name: this.slotData.name, items})
            }
        },
        removeItem(index) {
            let items = [...this.items]
            items.splice(index, 1)
            this.$store.dispatch('rl/updateSlotItemsAndSave', {slot_name: this.slotData.name, items})
        },
        async addNewItem() {
            let form = this.$store.getters['forms/getFormByName']('pageblock')
            const {value} = await this.$dialogs.show(EditReactAside, {react_id: null, form_id: form.form_id})
            if (value) {
                let items = [...this.items, {react_id: value}]
                await this.$store.dispatch('rl/updateSlotItemsAndSave', {slot_name: this.slotData.name, items})
                await this.$store.dispatch('rl/loadBlocks')
            }
        },
        async addItems() {
            let form = this.$store.getters['forms/getFormByName']('pageblock')
            const forms = isEmpty(form) ? [] : [{form_id: form.form_id}]

            const {trigger, value} = await this.$dialogs.show(SelectReactsAside, {
                forms,
                dataApi: (...args) => {
                    return rl.searchBlocks(...args)
                },
                confirmTitle: 'Add selected items to slot'
            })
            if (trigger !== 'ok') return
            let items = [...this.items, ...value.map(i => ({react_id: i.react_id}))]
            await this.$store.dispatch('rl/updateSlotItemsAndSave', {slot_name: this.slotData.name, items})
        },
        async editItem(react_id) {
            await this.$dialogs.show(EditReactAside, {react_id})
            await this.$store.dispatch('rl/loadBlocks')
        },
    }
}
</script>
<style lang="scss">
@import "src/assets/scss/vue-component";


.template-slot {
    border: 1px solid $slot-border-color;
    /* -webkit-box-shadow: 0px 1px 1.1px -1px #878484; */
    background-color: $body-bg;
    /* box-shadow: 0px 1px 1.1px -1px #878484; */
    padding: 2.2rem 1rem 1rem 1rem;
    position: relative;

    &--disabled {
        background-color: #d8d8d8;
    }

    .slot-drop-placeholder {
        //min-height: 47px;
        background-color: $drop-zone_color;
        border: $drop-zone-border;
    }

    .smooth-dnd-container {
        min-height: 47px;

        &:empty {
            border: $drop-zone-border;
            background-color: $drop-zone-color;
            position: relative;

            &:after {
                position: absolute;
                transform: translate(-50%, -50%);
                font-size: 0.9rem;
                color: $gray-400;
                top: 50%;
                left: 50%;
                text-align: center;
                content: attr(data-empty-title);
                width: 100%;
            }
        }
    }

    .slot-legend {
        color: $secondary;
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0.3rem 0 0;
    }

    .template-slot-header {
        display: flex;
        align-items: baseline;
        position: absolute;
        top: 0;
        left: 0;
        z-index: inherit;
        /* letter-spacing: normal; */
        padding: 3px 3px 3px 1rem;

        .action-group {
            // display: none;
        }

        &:hover .action-group {
            display: flex;
        }
    }
}

.item-drag-class {
    box-shadow: 1px 1px 9px 2px #ccc;
}

.smooth-dnd-ghost {
    //width: 300px!important;
}
</style>
