<template>
    <div class="select-layout-template">
        <label class="select-layout-template__label">Layout template</label>
        <x-select
            :disabled="disabled"
            placeholder="Select layout template"
            :clearable="false"
            :options="options"
            :value="value"
            @select="onSetTemplate">
        </x-select>
    </div>
</template>

<script>

export default {
    name: 'SelectLayoutTemplate',
    data() {
        return {}
    },
    computed: {
        templates() {
            return this.$store.state.rl.templates
        },
        options() {
            return Object.keys(this.templates).map(k => ({id: k, label: k}))
        },
        value() {
            return this.$store.getters['rl/getTemplateName']
        },
        disabled() {
            return !this.$store.getters['rl/getScope']
        }
    },
    methods: {
        async onSetTemplate(obj) {
            await this.$store.dispatch('rl/setTemplateName', {template_name: obj.id})
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

.select-layout-template {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .x-select {
        min-width: 300px;
    }

    &__label {
        margin: 0;
        color: $primary;
    }
}
</style>
