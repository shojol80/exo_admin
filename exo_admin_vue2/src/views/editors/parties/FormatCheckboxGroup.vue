<template>
    <fragment>
        <b-form-checkbox
            :checked="value.selected"
            :indeterminate="indeterminate"
            @change="toggleSelect">
            {{ format.title }}
        </b-form-checkbox>
        <template v-if="subOptions.length">
            <b-form-checkbox-group
                :checked="value.items"
                @change="toggleSelectItems"
                :options="subOptions"
                name="subFormats"
                class="ml-4"
                stacked
            ></b-form-checkbox-group>
        </template>
    </fragment>
</template>
<script>
export default {
    name: 'format-checkbox-group',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        format: {},
        value: {}
    },
    data() {
        return {
            allSelected: true,
            indeterminate: false,
        }
    },
    computed: {
        subOptions() {
            if (!this.format['items']) return []
            return this.toOptions(this.format['items'])
        },
        allItems() {
            if (!this.format['items']) return []
            return this.format['items'].map(i => i.title)
        }
    },
    watch: {
        'value.items': {
            immediate: true,
            handler(newValue) {
                if (newValue.length === 0) {
                    this.indeterminate = false
                } else if (newValue.length === this.allItems.length) {
                    this.indeterminate = false
                } else {
                    this.indeterminate = true
                }
            }
        }
    },
    methods: {
        toOptions(items) {
            return items.map(item => {
                return {text: item['title'], value: item['title']}
            })
        },
        toggleSelect(val) {
            this.$emit('change', {
                title: this.value.title,
                selected: val,
                items: val ? this.allItems : []
            })
        },
        toggleSelectItems(val) {
            this.$emit('change', {
                title: this.value.title,
                selected: val.length === this.allItems.length,
                items: val
            })
        }
    }
}
</script>
