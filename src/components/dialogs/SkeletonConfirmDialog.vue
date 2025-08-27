<template>
<!--TODO revert after move maintenance to $dialogs.show    @hidden="onModalHidden"-->
    <dialog-modal v-bind="$dialogsProps"
                  @hide="onModalHide"
                  :ok-disabled="localValue.skeletons.length===0"
                  ref="modal">
        <b-form-group label="Select skeletons:">
            <b-form-checkbox
                class="mb-1"
                v-for="option in options"
                v-model="localValue.skeletons"
                :key="option.value"
                :value="option.value">
                {{ option.text }}
            </b-form-checkbox>
        </b-form-group>
    </dialog-modal>
</template>

<script>

import withBModal from "@modules/dialogs/mixins/withBModal";

export default {
    name: "SkeletonConfirmDialog",
    mixins: [withBModal],
    data() {
        return {
            localValue: {skeletons: []},
        }
    },
    computed: {
        options() {
            let skeletons = []
            for (const [key, value] of Object.entries(this.ECO.skeletons)) {
                if (value['name']) {
                    skeletons.push({text: value['name'], value: key})
                } else {
                    skeletons.push({text: key, value: key})
                }

            }
            return skeletons
        }
    },
    mounted() {
        for (const [key, value] of Object.entries(this.ECO.skeletons)) {
            if (value['repeatable']) {
                this.localValue.skeletons.push(key)
            }
        }
    },
}
</script>

<style scoped>

</style>
