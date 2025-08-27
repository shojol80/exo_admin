<template>
    <dialog-modal
        v-bind="$dialogsProps"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :ok-disabled="!localValue"
        ref="modal">
        <x-select v-model="localValue" :multiple="false" :options="tree" v-bind="treePropsDefault"/>
    </dialog-modal>
</template>

<script>

import withBModal from "@modules/dialogs/mixins/withBModal";

export default {
    name: "SelectDialog",
    mixins: [withBModal],
    props: {
        tree: Array,
        multiple: false,
        default: null,
        treeProps: {
            default() {
                return {
                    clearable: false
                }
            }
        }
    },
    computed: {
        treePropsDefault() {
            return {
                ...{
                    clearable: false
                },
                ...this.treeProps
            }
        }
    },
    mounted() {
        this.localValue = this.default ? this.default : null;
    },
}
</script>
