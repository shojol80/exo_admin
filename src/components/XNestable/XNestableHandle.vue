<template>
    <vue-nestable-handle v-bind="$attrs" v-on="$listeners">
        <template slot="default">
            <div class="nestable-handle__icon">
                <icon :icon="$icons.dragable"></icon>
            </div>
        </template>
        <template slot="content" slot-scope="props">
            <slot name="content" v-bind="props"/>
        </template>
        <template slot="collapse" slot-scope="props">
            <button
                class="nestable-handle__collapse-toggle"
                :class="{collapsed : props.collapsed,
                        hidden:!props.hasChildren}"
                @click="props.collapse">
                <icon :icon="$icons.collapse_up"></icon>
            </button>
        </template>
    </vue-nestable-handle>
</template>

<script>

import {VueNestableHandle} from '@modules/vue-nestable/src'

export default {
    name: "XNestableHandle",
    components: {
        VueNestableHandle
    },
    methods: {}
}

</script>

<style lang="scss">

@import "src/assets/scss/vue-component";

.nestable-handle {
    display: flex;
    padding-left: 24px;
    height: 100%;
    align-items: center;

    .nestable-handle-content {
        width: 100%;
    }

    &__icon {
        color: $gray-400;
        position: absolute;
        left: 2px;
        top: 50%;
        transform: translateY(-50%);
    }

    &__collapse-toggle {
        color: $gray-400;
        border: none;
        background-color: transparent;
        padding: 0;
        height: 35px;
        width: 35px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.collapsed {
            > i {
                transform: rotateZ(180deg);
            }
        }

        &.hidden {
            visibility: hidden;
            pointer-events: none;
        }
    }
}
</style>
