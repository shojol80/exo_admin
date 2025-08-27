<template>
    <div class="fe-form-group form-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "feFormGroup"
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.fe-form-group {
    .fe-control {
        position: relative;

        .fe-base-control.form-control {
            position: relative;
            padding-top: 25px;
            height: auto;
        }

        .was-validated .form-control:invalid, .form-control.is-invalid {
            background-image: none;
        }

        &__input {
            position: relative;
            padding-top: 25px;
            height: auto;
        }

        &__label {
            position: absolute;
            left: 13px;
            top: 4px;
            pointer-events: none;
            padding: 0;
            margin: 0;
            z-index: 1;
            color: $primary;
            text-transform: uppercase;
            font-weight: normal;
            font-size: 0.8rem;
        }
    }
}
</style>
