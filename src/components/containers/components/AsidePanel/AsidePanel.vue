<template>
    <div class="aside-panel">
        <transition name="slide" @after-leave="afterLeave" @after-enter="$emit('after-enter',$event)">
            <div class="aside-panel__dialog" v-show="open_val">
                <div v-bar class="aside-panel__body">
                    <div>
                        <div class="aside-panel__content">
                            <action-toolbar v-if="!hideActionToolbar">
                                <action-group>
                                    <action-button
                                        v-if="!hideBackAction"
                                        title="Back"
                                        :icon="$icons.back"
                                        @action="hide('back')">
                                    </action-button>
                                    <slot name="actions"></slot>
                                </action-group>
                                <slot name="action-toolbar"></slot>
                            </action-toolbar>
                            <slot v-if="(lazy===true && open_val) || (lazy===false)"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="aside-panel__backdrop" v-if="open_val" @click="clickOutside"></div>
        </transition>
    </div>
</template>

<script>

import DialogEvent from "@modules/dialogs/DialogEvent";

export default {
    name: 'AsidePanel',
    model: {
        prop: 'open',
        event: 'change'
    },
    props: {
        open: {
            type: Boolean,
            default: false
        },
        lazy: {
            type: Boolean,
            default: false
        },
        allowCloseClickOutside: {
            type: Boolean,
            default: true,
        },
        hideBackAction: {
            type: Boolean,
            default: false,
        },
        hideActionToolbar: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            open_val: this.open
        }
    },
    watch: {
        open(value) {
            this.open_val = value
        },
        '$route'() {
            this.hide('router')
        }
    },
    methods: {
        show() {
            this.open_val = true
            this.$emit('change', true)
        },
        hide(trigger) {
            this.open_val = false
            this.$emit('change', false)
            this.$emit('hide', this.buildEvent(trigger))
        },
        clickOutside(e) {
            if (this.allowCloseClickOutside) this.hide('backdrop')
        },
        afterLeave() {
            this.$nextTick(_ => {
                this.$emit('hidden')
            })
        },
        buildEvent(trigger) {
            return new DialogEvent(this, trigger);
        },
    }
}
</script>
<style lang="scss">
@import "src/assets/scss/vue-component";

.aside-panel {
    position: absolute;
    z-index: 1025;

    &__dialog {
        position: fixed;
        top: 0; //$app-header-height;
        right: 0;
        bottom: 0;
        width: 98%;
        max-width: 1400px;
        z-index: 1025;
        background-color: $exo-bg;
        border-left: 1px solid $exo-gray-line;
        box-shadow: 1px 20px 50px 7px rgba(45, 45, 45, 0.32);
    }

    &__backdrop {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1024;
        width: 100vw;
        height: 100vh;
        background-color: #2b2b2b;
        opacity: 0.5;
    }

    &__body {
        position: relative;
        height: 100%;
    }

    &__content {
        padding-left: 1.1rem;
    }

    .slide-leave-active,
    .slide-enter-active {
        transition: 0.3s;
    }

    /* before the element is shown, start off the screen to the right */
    .slide-enter, .slide-leave-active {
        right: -100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
}

.mode-popup .aside-panel {
    .aside-panel__dialog {
        top: $popup-header-height;
    }

    .aside-panel__backdrop {
        top: $popup-header-height;
        height: calc(100vh - #{$popup-header-height});
    }
}
</style>
