<template>
    <div class="select-scope">
        <!--todo Create action-select-->
        <label class="select-scope__label mr-1">Layout scope</label>
        <x-select
            placeholder="select scope"
            :options="options"
            :clearable="false"
            :value="value"
            @select="onScopeSelect">
            <template #option-label="{ node, shouldShowCount, count, labelClassName, countClassName }">
                <label :class="labelClassName">
                    <span>{{ node.label }}</span>&nbsp;
                    <span class="text-muted">{{ node.raw.info }}</span>
                </label>
            </template>
            <template #value-label="{ node }">
                <span>{{ node.label }}</span>&nbsp;
                <span class="text-muted">{{ node.raw.info }}</span>
            </template>
        </x-select>
    </div>
</template>
<script>

export default {
    name: 'SelectScope',
    computed: {
        options() {
            return this.$store.getters['rl/getScopes'];
        },
        value() {
            return this.$store.getters['rl/getScope']
        }
    },
    methods: {
        onScopeSelect(obj) {
            this.$store.dispatch('rl/setScope', {scope: obj.id})
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.select-scope {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .x-select {
        min-width: 300px;
    }

    &__label {
        color: $primary;
        margin: 0;
    }
}
</style>
