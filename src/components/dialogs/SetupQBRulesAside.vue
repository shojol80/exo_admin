<template>
    <dialog-aside
        ref="modal"
        v-bind="$dialogsProps"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :hide-action-toolbar="false"
        :hide-back-action="true">
        <template #actions>
            <action-button
                :icon="$icons.confirm"
                @action.prevent="ok">
            </action-button>
        </template>
        <template v-if="localValue!==undefined">
            <react-query-builder
                class="mt-3"
                v-model="localValue"
                :forms="forms">
            </react-query-builder>
        </template>
    </dialog-aside>
</template>

<script>
import ReactQueryBuilder from '@/components/ReactQueryBuilder/ReactQueryBuilder'
import withDialogAside from "@modules/dialogs/mixins/withDialogAside";

export default {
    name: "SetupQBRulesAside",
    props: {
        value: {
            required: true,
        },
        forms: {
            type: Array,
            required: true,
        }
    },
    mixins: [withDialogAside],
    components: {ReactQueryBuilder},
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";


</style>
