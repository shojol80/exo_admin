<template>
    <span class="info-icon">
        <icon
            :id="id"
            :icon="$icons.info"></icon>
        <b-popover
            custom-class="info-icon-popover"
            :delay="delay"
            :target="id"
            :title="title"
            :variant="variant"
            triggers="hover focus">
            <slot></slot>
        </b-popover>
    </span>
</template>

<script>
export default {
    name: "InfoIcon",
    props: {
        title: {
            default: ''
        },
        variant: {
            default: 'dark'
        },
        delay: {
            default: 100
        },

    },
    data() {
        return {
            id: 'info-icon'
        }
    },
    mounted() {
        this.id += this._uid
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.info-icon {
    color: $gray-400;
    cursor: pointer;
}

.info-icon-popover {
    max-width: 500px;
    table {
        font-family: "Consolas", monospace;
        td {
            font-weight: bold;

        }
        td, th {
            padding: 5px;
            //border-bottom: 1px solid ;
            font-size: .9rem;
        }
    }

    &.b-popover-dark {
        $po-bg-color: $dark;
        $po-border-color: darken($dark, 3%);
        $po-color: $exo-bg;
        $po-header-bg: $dark;
        $po-header-color: $exo-bg;
        $po-arrow-color: $po-bg-color;
        $po-arrow-color-bottom: $po-header-bg;
        $po-arrow-outer-color: fade-in($po-border-color, 0.05);

        &.popover {
            background-color: $po-bg-color;
            border-color: $po-border-color;
        }

        &.bs-popover-top {
            > .arrow {
                &::before {
                    border-top-color: $po-arrow-outer-color;
                }

                &::after {
                    border-top-color: $po-arrow-color;
                }
            }
        }

        &.bs-popover-right {
            > .arrow {
                &::before {
                    border-right-color: $po-arrow-outer-color;
                }

                &::after {
                    border-right-color: $po-arrow-color;
                }
            }
        }

        &.bs-popover-bottom {
            > .arrow {
                &::before {
                    border-bottom-color: $po-arrow-outer-color;
                }

                &::after {
                    // Use the header bg color
                    border-bottom-color: $po-arrow-color-bottom;
                }
            }

            .popover-header::before {
                border-bottom-color: $po-header-bg;
            }
        }

        &.bs-popover-left {
            > .arrow {
                &::before {
                    border-left-color: $po-arrow-outer-color;
                }

                &::after {
                    border-left-color: $po-arrow-color;
                }
            }
        }


        .popover-header {
            color: $po-header-color;
            background-color: $po-header-bg;
            border-bottom-color: darken($po-header-bg, 5%);
        }

        .popover-body {
            color: $po-color;
        }

    }
}
</style>
