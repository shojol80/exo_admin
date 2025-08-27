<template>
    <x-select
        class="select-view"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        :multiple="false"
        id-key="id"
        label-key="name"
        :options="views"
        :disable-branch-nodes="true"
        :show-count="true"
        :placeholder="placeholder">
        <div slot="value-label" slot-scope="{ node }">{{ node.raw.id }}</div>
    </x-select>
</template>

<script>

export default {
    name: "SelectView",
    props: {
        value: {
            type: String,
        },
        path: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: "Select a view"
        },
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    data() {
        return {}
    },
    computed: {
        views() {
            return this.$store.getters['resources/getTreeViews'](this.path)
        }
    },
    methods: {}
}
</script>
