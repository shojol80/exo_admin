<template>
    <div class="custom-params-input">
        <b-form-textarea
            class="custom-params-input__textarea"
            id="textarea"
            :value="value"
            @input="$emit('input', $event)"
            placeholder="Enter custom params"
            rows="3">
        </b-form-textarea>
        <action-group v-if="0">
            <action-button class="ml-1" title="Edit" :icon="$icons.edit" @action="onEdit">
            </action-button>
        </action-group>
    </div>
</template>

<script>
export default {
    name: "CustomParamsInput",
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        value: null,
    },
    methods: {
        onEdit() {

        }
    }
}
</script>

<style scoped lang="scss">
.custom-params-input {
    display: flex;
    align-items: flex-start;
    width: 100%;

    &__textarea {

    }

}
</style>
