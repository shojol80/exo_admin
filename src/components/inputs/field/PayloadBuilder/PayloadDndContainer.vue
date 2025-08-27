<template>
    <div class="payload-dnd-container"
         :class="{'payload-dnd-container--empty': !payloadFields || payloadFields.length === 0}"
         data-empty-title="Drag a field type from the right to this area">
        <Container group-name="1"
                   class="list-group"
                   :get-child-payload="getChildPayload"
                   @drop="onDrop"
                   drag-handle-selector=".column-drag-handle"
                   :drop-placeholder="placeholderOptions">
            <Draggable v-for="(item, index) in payloadFields" :key="item.field_id">
                <PayloadFieldBase
                    :field="payloadFields[index]"
                    @change="onChange(index, $event)"
                    :active="active === index"
                    @delete="onDeleteField(item, index)"
                    @collapse="collapse(index)"
                    :holder-id="holderId"
                    :holder-parent-type="holderParentType"
                    :holder-parent-id="holderParentId"
                    class="draggable-item list-group-item">
                </PayloadFieldBase>
            </Draggable>
        </Container>
    </div>
</template>

<script>
import {Container, Draggable} from "vue-smooth-dnd"
import PayloadFieldBase from "./PayloadFieldBase.vue"

export default {
    name: "PayloadDndContainer",
    components: {
        Container,
        Draggable,
        PayloadFieldBase
    },
    model: {
        prop: 'payloadFields',
        event: 'change'
    },
    props: {
        payloadFields: {type: Array, default: () => []},
        holderId: {},
        holderParentType: {},
        holderParentId: {}
    },
    data() {
        return {
            active: -1,
            placeholderOptions: {
                className: 'payload-drop-preview',
                animationDuration: '150',
                showOnTop: false
            },
        }
    },
    computed: {
        isEmpty() {
            return !this.payloadFields || this.payloadFields.length === 0
        },
    },
    methods: {
        collapse(index) {
            this.active = this.active === index ? -1 : index
        },

        onChange(index, field) {
            const newFields = [...this.payloadFields]
            newFields[index] = field
            this.$emit('change', newFields)
        },

        onDeleteField(field, index) {
            const newFields = [...this.payloadFields]
            newFields.splice(index, 1)
            this.$emit('change', newFields)
            
            // Adjust active index
            if (this.active === index) {
                this.active = -1
            } else if (this.active > index) {
                this.active--
            }
        },

        onDrop({removedIndex, addedIndex, payload}) {
            let itemToAdd = null

            if (payload && payload.id) {
                // New field type from the right panel
                const fieldName = this.getUniqueFieldName(payload.name.toLowerCase())
                itemToAdd = {
                    field_id: fieldName,
                    field_name: fieldName,
                    field_displayname: fieldName,
                    field_type: payload.id,
                    field_value: this.getDefaultValue(payload.id),
                    field_icon: payload.icon
                }
                // Open new field for editing
                this.active = addedIndex !== null ? addedIndex : this.payloadFields.length
            } else {
                // Reordering existing fields
                if (removedIndex === this.active) {
                    this.active = addedIndex
                } else if (addedIndex <= this.active && removedIndex >= this.active) {
                    this.active++
                } else if (addedIndex >= this.active && removedIndex <= this.active) {
                    this.active--
                }
            }

            const result = [...this.payloadFields]

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0]
            }

            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd)
            }

            this.$emit('change', result)
        },

        getChildPayload(index) {
            return this.payloadFields[index]
        },

        getUniqueFieldName(baseName, n = 0) {
            const fieldName = baseName + (n === 0 ? '' : '_' + n)
            if (this.payloadFields.some(field => field.field_name === fieldName)) {
                return this.getUniqueFieldName(baseName, n + 1)
            }
            return fieldName
        },

        getDefaultValue(type) {
            switch (type) {
                case 'picture':
                    return {
                        picture_id: null,
                        picture_alt: '',
                        picture_title: ''
                    }
                case 'container':
                    return {}
                case 'smtp':
                    return {
                        host: '',
                        port: 587,
                        username: '',
                        password: ''
                    }
                case 'date':
                case 'datetime':
                    return null
                case 'textarea':
                case 'text':
                default:
                    return ''
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.payload-dnd-container {
    position: relative;
    min-height: 300px;
    padding: 1rem;

    &--empty {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px dashed lighten($border-color, 10%);
        border-radius: $border-radius;
        background-color: lighten($light, 3%);

        &:after {
            position: absolute;
            transform: translate(-50%, -50%);
            font-size: 1rem;
            color: $text-muted;
            top: 50%;
            left: 50%;
            text-align: center;
            content: attr(data-empty-title);
            max-width: 300px;
            line-height: 1.4;
        }
    }

    .payload-drop-preview {
        background-color: lighten($primary, 48%);
        border: 2px dashed lighten($primary, 20%);
        border-radius: $border-radius;
        margin-bottom: 0.75rem;
        min-height: 50px;
        z-index: 10;
        opacity: 0.9;
        transition: all 0.2s ease;
    }

    .smooth-dnd-container {
        min-height: 50px;

        &.vertical {
            .smooth-dnd-draggable-wrapper {
                overflow: visible;
                transition: transform 0.2s ease;
            }

            .smooth-dnd-ghost {
                opacity: 0.5;
                transform: rotate(2deg);
                transition: all 0.2s ease;
            }
        }
    }

    .list-group {
        border: none;

        .list-group-item {
            border: none;
            padding: 0;
            background: transparent;
            margin-bottom: 0.75rem;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
