<template>
    <div :class="stateClass" class="fe-base-control form-control">
        <slot>
            <span>Please set field components</span>
        </slot>
    </div>
</template>

<script>
export default {
    name: "feBaseControl",
    props: {
        state: {default: null}
    },
    computed: {
        stateClass() {
            return this.state === true ? 'is-valid' : this.state === false ? 'is-invalid' : ''
        },
    }
}
</script>
