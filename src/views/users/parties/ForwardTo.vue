<template>
    <x-multiselect
        v-bind="$attrs"
        :value="value"
        v-on="$listeners"
        :options="aliases"
        :taggable="true"
        label="name"
        track-by="name"
        :multiple="true"
        @tag="addTag"
        @input="onInput"
        tag-placeholder="Add this as new email"
        placeholder="Search or add a new email"></x-multiselect>
</template>

<script>
import XMultiselect from '@/components/XMultiselect'

export default {
    name: 'ForwardTo',
    components: {XMultiselect},
    props: {
        aliases: {
            type: Array,
            default() {
                return []
            }
        },
        value: {
            type: Array,
            required: true
        },
        userEmail: {
            type: String,
            default: ''
        }
    },
    computed: {},
    methods: {
        addTag(newTag) {
            // Validate that the new tag is not the same as the user's email
            if (this.userEmail && newTag.toLowerCase() === this.userEmail.toLowerCase()) {
                this.$awn.warning(`Cannot forward to the same address: ${newTag}`);
                return;
            }

            // Check if email already exists in the list
            const existingEmail = this.value.find(item =>
                item.name && item.name.toLowerCase() === newTag.toLowerCase()
            );

            if (existingEmail) {
                this.$awn.warning(`Email ${newTag} is already in the forward list`);
                return;
            }

            const tag = {
                name: newTag,
            }
            this.aliases.push(tag)
            this.value.push(tag)
        },

        onInput(selectedValues) {
            // Filter out any selections that match the user's email
            if (this.userEmail && selectedValues) {
                const filteredValues = selectedValues.filter(item => {
                    const isUserEmail = item.name && item.name.toLowerCase() === this.userEmail.toLowerCase();
                    if (isUserEmail) {
                        this.$awn.warning(`Cannot forward to the same address: ${item.name}`);
                        return false;
                    }
                    return true;
                });

                // Only emit if the filtered values are different
                if (filteredValues.length !== selectedValues.length) {
                    this.$emit('input', filteredValues);
                    return;
                }
            }

            // Emit the original values if no filtering was needed
            this.$emit('input', selectedValues);
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

</style>
