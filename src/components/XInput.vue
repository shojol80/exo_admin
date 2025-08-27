<template>
    <b-input-group>
        <b-form-input v-bind="$attrs"
                      :value="value"
                      v-on="$listeners">
        </b-form-input>
        <b-input-group-append v-if="showEditor">
            <b-button variant="outline-secondary" @click="editContent">
                <icon :icon="$icons.edit"></icon>
            </b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
import TextCodeEditDialog from '@/components/dialogs/TextCodeEditDialog'

export default {
    name: "XInput",
    props: {
        value: {},
        showEditor: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        async editContent() {
            const response = await this.$dialogs.show(TextCodeEditDialog, {
                title: 'Edit',
                text: this.value
            })
            if (response.trigger !== 'ok') return
            this.$emit('input', response.value)
        }
    }
}
</script>

<style scoped>

</style>
