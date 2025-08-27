<template>
    <div class="payload-field-types">
        <div class="field-types-header">
            <h4 class="field-types-title">
                <icon icon="field_container" class="mr-2"></icon>
                Field Types
            </h4>
            <p class="field-types-subtitle">
                Drag to add fields
            </p>
        </div>

        <div class="field-types-list">
            <Container
                group-name="1"
                behaviour="copy"
                :get-child-payload="getChildPayload"
                :get-ghost-parent="getGhostParent"
                :remove-on-drop-out="false">
                <Draggable v-for="item in fieldTypes" :key="item.id">
                    <div class="field-type-item draggable-item">
                        <icon :icon="item.icon" class="field-type-icon"></icon>
                        <span class="field-type-name">{{ item.name }}</span>
                    </div>
                </Draggable>
            </Container>
        </div>
    </div>
</template>

<script>
import {Container, Draggable} from 'vue-smooth-dnd'

export default {
    name: "PayloadFieldTypes",
    components: {Container, Draggable},
    data() {
        return {
            fieldTypes: [
                {id: 'text', name: 'Text', icon: 'field_text'},
                {id: 'textarea', name: 'Textarea', icon: 'field_textarea'},
                {id: 'picture', name: 'Picture', icon: 'field_picture'},
                {id: 'container', name: 'Container', icon: 'field_container'},
                {id: 'date', name: 'Date', icon: 'field_date'},
                {id: 'datetime', name: 'DateTime', icon: 'field_datetime'},
                {id: 'smtp', name: 'SMTP', icon: 'field_smtp'},
            ]
        }
    },
    methods: {
        getChildPayload(index) {
            return this.fieldTypes[index]
        },
        getGhostParent() {
            return document.body;
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

.payload-field-types {
    .field-types-header {
        padding: 0 0 1.25rem 0;
        border-bottom: 1px solid lighten($border-color, 5%);
        margin-bottom: 1.25rem;
    }

    .field-types-title {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        color: $primary;
        font-weight: 600;
        display: flex;
        align-items: center;
    }

    .field-types-subtitle {
        margin: 0;
        font-size: 0.85rem;
        color: $text-muted;
        font-style: italic;
    }

    .field-types-list {
        .smooth-dnd-container {
            // Remove gap to prevent layout issues
        }
    }

    .field-type-item {
        display: flex;
        align-items: center;
        padding: 0.875rem 1rem;
        margin-bottom: 0.75rem;
        background-color: $white;
        border: 1px solid $border-color;
        border-radius: $border-radius;
        cursor: move;
        transition: background-color 0.15s ease, border-color 0.15s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

        &:last-child {
            margin-bottom: 0;
        }

        &:hover {
            background-color: lighten($primary, 48%);
            border-color: lighten($primary, 25%);
        }

        &:active {
            background-color: lighten($primary, 45%);
        }
    }

    .field-type-icon {
        margin-right: 0.75rem;
        color: $primary;
        font-size: 1rem;
    }

    .field-type-name {
        font-weight: 500;
        color: $body-color;
        font-size: 0.9rem;
    }
}
</style>
