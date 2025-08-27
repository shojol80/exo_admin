<template>
    <b-dropdown
        v-bind="$attrs"
        class="action-dropdown"
        :class="dClass"
        @keypress.enter="onAction" tabindex="0"
        @click="onAction"
        v-shortkey="shortkey" @shortkey="onAction"
        :disabled="disabled"
        v-b-tooltip.hover="{delay:1000}" :title="titleWithShortkey"
        :split="split"
        :split-class="btnSplitClass"
        variant="link"
        :toggle-class="btnClass"
        ref="menu"
        no-caret>
        <template v-slot:button-content>
            <icon class="action-icon" v-if="!!icon" :icon="icon"></icon>
            <slot></slot>
        </template>
        <slot name="dropdown"></slot>
    </b-dropdown>
</template>

<script>
import {replace} from 'lodash'
import HasSlots from '@modules/mixins/HasSlots'


export default {
    name: "ActionDropdown",
    mixins: [HasSlots],
    props: {
        title: {
            type: String,
        },
        icon: {
            type: [String, Object],
            reqired: true
        },
        disabled: {
            type: Boolean
        },
        shortkey: {
            type: String,
        },
        size: {
            type: String,
            default: 'md'
        },
        variant: {
            type: String,
            default: 'primary'
        },
        split: {
            type: Boolean
        }
    },
    computed: {
        dClass() {
            return {
                [`action-dropdown--${this.variant}`]: true,
                'action-dropdown--split': this.split,
                [`action-dropdown--${this.size}`]: true
            }
        },
        btnSplitClass() {
            return {
                'action-button': true,
                'action-button--text': this.hasDefaultSlot,
                //'action-button--split': this.split,
                [`action-button--${this.variant}`]: true,
                [`action-button--${this.size}`]: true
            }
        },
        btnClass() {
            return {
                'action-button': true,
                'action-button--text': this.hasDefaultSlot,
                'action-button--split': this.split,
                [`action-button--${this.variant}`]: true,
                [`action-button--${this.size}`]: true
            }
        },
        titleWithShortkey() {
            if (this.shortkey) {
                let keys = JSON.parse(replace(this.shortkey, /'/g, '"'));
                if (this.title) {
                    return this.title + ' (' + keys.join('+') + ')';
                } else {
                    return keys.join('+')
                }
            } else {
                return this.title;
            }
        }
    },
    methods: {
        onAction(e) {
            if (this.disabled) return
            this.$emit('action', e)
            this.$el.blur()
        },
        hide() {
            this.$refs.menu.hide()
        }
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.action-dropdown {
    display: flex;
    padding: 0;
    position: relative;
    color: $primary;
    text-align: center;
    cursor: pointer;
    background: none;
    border: none;

    .action-button {
        @include action-button;
    }

    &--split {
        > .btn-link {
            //@include action-button;
        }
    }

    &--sm {

    }
}
</style>
