<template>
    <x-multiselect v-model="value"
                   tag-placeholder="Add this as new tag"
                   placeholder="Search or add a tag"
                   label="name"
                   track-by="code"
                   :options="options"
                   :multiple="true"
                   :taggable="true"
                   @tag="addTag"></x-multiselect>
</template>

<script>
import XMultiselect from '@/components/XMultiselect'

export default {
    components: {XMultiselect},
    data() {
        return {
            value: [],
            options: [],
        }
    },
    methods: {
        addTag(newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        }
    }
}
</script>

<style scoped>

</style>
