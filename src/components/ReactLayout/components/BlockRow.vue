<template>
    <b-list-group-item class="list-base-item block-row" :class="{'block-row--out-scope':react.out_of_scope}">
        <div class="drag-handle">
            <icon :icon="$icons.dragable"></icon>
        </div>
        <div>{{ react.react_title }}</div>
        <div class="block-row__secondary ml-auto"><span class="text-muted">{{ react.react_id }}</span></div>
        <div class="block-row__actions">
            <action-group>
                <action-button @action="$emit('remove')"
                               title="Remove block"
                               :icon="$icons.group_remove">
                </action-button>
                <action-button @action="$emit('edit')"
                               title="Edit block"
                               :icon="$icons.edit">
                </action-button>
            </action-group>
        </div>
    </b-list-group-item>
</template>

<script>
export default {
    name: 'BlockRow',
    props: {
        'block': {
            type: Object
        }
    },
    computed: {
        react() {
            return this.$store.state.rl.blocks[this.block.react_id] || {
                react_title: `Out of scope (${this.block.react_id})`,
                out_of_scope: true
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

.block-row {
    padding-left: 2px;
    display: flex;
    position: relative;
    //font-size: 1.1rem;
    gap: 1rem;

    .drag-handle {
        cursor: move;
        color: $gray-400;
    }

    &__actions {
        display: none;
        top: 0;
        right: 1px;
        height: 100%;
        position: absolute;
        //background-color: $exo-bg;
        //box-shadow: -30px 0 10px -6px $exo-bg;
        overflow: visible;
    }

    &:hover {
        .block-row__actions {
            display: flex;
        }

        .block-row__secondary {
            visibility: hidden;
        }
    }

    &--out-scope {
        opacity: 0.8;
        color: $secondary;
    }

}
</style>
