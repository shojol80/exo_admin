<template>
    <x-select
        v-bind="$attrs"
        v-on="$listeners"
        :value="outerValue"
        @input="onInput"
        class="usergroup-select"
        id-key="ug_id"
        label-key="ug_name"
        children-key="ug_children"
        :placeholder="placeholder"
        :options="usergroupsTree">
        <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
               :class="labelClassName">
            <span class="text-muted">[{{ node.id }}]</span>
            {{ node.label }}
        </label>
        <div slot="value-label" slot-scope="{ node }">
            <span class="text-muted">[{{ node.id }}]</span>
            {{ node.label }}
        </div>
    </x-select>

</template>

<script>

export default {
    name: "SelectUsergroup",
    model: {
        prop: 'outerValue',
        event: 'input'
    },
    props: {
        outerValue: {
            type: null,
        },
        type: {
            type: String,
            default: 'html'
        },
        placeholder: {
            type: String,
            default: "Select a user group"
        }
    },
    computed: {
        usergroupsTree() {
            return this.$store.getters['usergroups/usergroupsTree']
        }
    },
    methods: {
        onInput(event) {
            this.$emit('input', event)
        },
    }
}
</script>

<style lang="scss">
.usergroup-select {
    .vue-treeselect__control {
        width: auto;
    }
}
</style>
