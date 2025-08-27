<template>
    <div :class="inputClass">
        <b-form-input
            v-bind="$attrs"
            v-on="$listeners"
            :id="idComputed"
            :value="value"
            ref="el"
            :size="size"
            @keyup="resize"
            @keypress="resize"
            @focus="resize"
            @blur="resize"
            @change="resize"
            @update="resize"
            :style="style"
            :state="inputState(errors,valid)"/>
        <span class="action-input__bar"></span>
        <div class="action-input__prop" v-text="value" ref="prop"></div>
    </div>
</template>

<script>
import xFormControl from '@/components/forms/mixins/xFormControl'

export default {
    name: "ActionInput",
    mixins: [xFormControl],
    props: {
        size: {
            type: String,
            default: 'md'
        },
    },
    data() {
        return {
            style: {
                width: '1ch'
            }
        }
    },
    computed: {
        inputClass() {
            return {
                'action-input': true,
                [`action-input--${this.size}`]: true
            }
        }
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                this.resize()
            }
        },

    },

    methods: {
        resize() {
            this.$nextTick(() => {
                this.style.width = '2ch'
                if (this.value) {
                    let test = this.$refs.prop;
                    if (test) {
                        this.style.width = (Math.min(test.clientWidth + 1, 350)) + "px";
                    }
                }
            })
        },
        focus() {
            this.$refs.el.focus()
        }
    }
}
</script>

<style scoped lang="scss">

@import "@/assets/scss/vue-component";

.action-input {
    position: relative;

    > input {
        padding: 0;
        font-size: 1.45rem;
        color: $secondary;
        border: none;
        background-color: transparent;
        border-radius: 0;
        width: auto;
        min-width: 5px !important;
        max-width: 99.99% !important;

        &:focus {
            box-shadow: none;
        }

        &.is-invalid {
            //background-color: $danger;
            background-image: none;
        }
    }


    &__bar {
        position: relative;
        display: block;
    }

    &__bar:before,
    &__bar:after {
        content: '';
        height: 2px;
        width: 0;
        bottom: 1px;
        position: absolute;
        background: $secondary;
        transition: 0.2s ease all;
    }

    &__bar:before {
        left: 50%;
    }

    &__bar:after {
        right: 50%;
    }

    /* active state */
    > input:focus ~ .action-input__bar:before,
    > input:focus ~ .action-input__bar:after {
        width: 50%;
    }

    /* active state */
    > input.is-invalid ~ .action-input__bar:before,
    > input.is-invalid ~ .action-input__bar:after {
        background: $danger;
        width: 50%;
    }

    &__prop {
        font-size: 1.45rem;;
        position: absolute;
        visibility: hidden;
        height: auto;
        width: auto;
        white-space: nowrap;
    }

    &--sm {
        > input {
            font-size: 1rem;
        }
        & .action-input__prop {
            font-size: 1rem;

        }
    }
}
</style>
