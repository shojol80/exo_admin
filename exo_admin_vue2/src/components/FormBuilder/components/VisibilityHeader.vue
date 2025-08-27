<template>
    <div v-if="container" class="fb-visibility-header">
        <div class="fb-visibility-header__group">
            <x-switch v-model="is_custom_fields"></x-switch>
            <span class="ml-1">Set custom visibility for form in this group</span>
        </div>
    </div>
</template>

<script>
import store from "@/components/FormBuilder/store";

export default {
    name: "VisibilityHeader",
    props: {},
    computed: {
        is_custom_fields: {
            get() {
                return _.get(this.form, `form_options.containers.${this.container}.is_custom_fields`, 0)
            },
            set(value) {
                _.set(this.form, `form_options.containers.${this.container}.is_custom_fields`, value)
            }
        },
        form() {
            return store.form
        },
        container() {
            return store.container
        },
    }
}
</script>

<style scoped lang="scss">

@import "src/assets/scss/vue-component";

.fb-visibility-header {
    padding: .75rem 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    color: $gray-600;

    &__group {
        display: flex;
        align-items: center;
    }
}
</style>
