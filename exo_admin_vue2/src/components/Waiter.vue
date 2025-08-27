<template>
    <div class="waiter" :class="{'waiter--active': isLoading }">
        <div class="waiter__spinner">
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <div class="waiter__wpapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Waiter",
    props: {
        show: Boolean
    },
    data() {
        return {
            isLoading: false
        }
    },
    watch: {
        show: {
            immediate: true,
            handler(newVal) {
                this.isLoading = newVal;
            }
        }
    },
    methods: {
        async wait(func) {
            if (func === true) {
                this.isLoading = true;
                return
            }
            if (func === false) {
                this.isLoading = false;
                return
            }

            this.isLoading = true;
            if (typeof func === "function") {
                try {
                    return await func(this)
                } finally {
                    this.isLoading = false
                }
            }
            return func.then(res => {
                this.isLoading = false;
                return res;
            }).finally(() => {
                this.isLoading = false;
            })
        }
    }
}
</script>

<style scoped lang="scss">
.waiter {
    position: relative;

    &__spinner {
        max-height: 70vh;
        position: absolute;
        z-index: 999;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        display: none;
        justify-content: center;
        align-items: center;
    }

    &--active {
        > .waiter__wpapper {
            opacity: 0.3;
            pointer-events: none;
        }

        > .waiter__spinner {
            display: flex;
        }
    }

}
</style>
