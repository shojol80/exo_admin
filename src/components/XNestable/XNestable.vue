<template>
    <vue-nestable v-bind="$attrs" v-on="$listeners">
        <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData"/>
        </template>
    </vue-nestable>
</template>

<script>

import {VueNestable} from '@modules/vue-nestable/src'

export default {
    name: "XNestable",
    components: {
        VueNestable,
    },
}

</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

/*
* Style for nestable
*/
.nestable {
    position: relative;
    color: $gray-900;
    //font-size: 16px;
}

.nestable .nestable-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.nestable-list.collapsed {
    display: none;
}


.nestable > .nestable-list {
    padding: 0;
}

.nestable-item,
.nestable-item-copy {
    //margin: 10px 0 0;
}

.nestable-item:first-child,
.nestable-item-copy:first-child {
    margin-top: 0;
}

.nestable-item .nestable-list,
.nestable-item-copy .nestable-list {
    //margin-top: 10px;
}

.nestable-item-content {
    border-bottom: 1px solid $exo-gray-line;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;

    > .nestable-handle {
        height: 100%;
        width: 100%;
    }
}

.nestable-item {
    position: relative;

    .nestable-item {
        &.is-dragging:before {
            left: 55px;
        }

        .nestable-item-content > .nestable-handle {
            padding-left: 55px;
        }

        .nestable-item {
            &.is-dragging:before {
                left: 110px;
            }

            .nestable-item-content > .nestable-handle {
                padding-left: 110px;
            }

            .nestable-item {
                &.is-dragging:before {
                    left: 165px;
                }

                .nestable-item-content > .nestable-handle {
                    padding-left: 165px;
                }

                .nestable-item {
                    &.is-dragging:before {
                        left: 220px;
                    }

                    .nestable-item-content > .nestable-handle {
                        padding-left: 220px;
                    }
                }
            }


        }
    }
}

.nestable-item.is-dragging .nestable-list {
    pointer-events: none;
}

.nestable-item.is-dragging * {
    opacity: 0;
    filter: alpha(opacity=0);
}

.nestable-item.is-dragging {
    &:before {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: $drop-zone_color;
        border: $drop-zone-border;
    }
}

.nestable-drag-layer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    pointer-events: none;
}

.nestable-drag-layer > .nestable-list {
    cursor: move;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    background-color: $exo-bg;
    border: 1px solid $exo-gray-line;
    box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60, 64, 67, .3), 0 1px 3px 1px rgba(60, 64, 67, .15);
    //box-shadow: 2px 2px $exo-gray-line;
}


.nestable [draggable="true"] {
    cursor: move;
}

.nestable-handle {
    display: inline;
}

.nestable-list-empty {
    margin-top: 1rem;
    font-size: 1rem;
    color: $gray-400;
    padding: 1rem;
    background-color: $drop-zone_color;
    border: $drop-zone-border;
}


</style>
