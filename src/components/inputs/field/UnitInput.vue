<template>
    <div class="unit-input">
        <div class="unit-input__row">
            <select-view
                placeholder="Unit view"
                path="components.units"
                v-model="value.component"
            />
            <action-group class="ml-2">
                <action-edit-view
                    v-model="value.component"
                    path="components.units">
                    Edit view
                </action-edit-view>
                <action-button
                    icon="fa fa-th-list"
                    @action.prevent="showPayload=true">
                    Payload
                </action-button>
            </action-group>
        </div>
        <aside-panel v-model="showPayload"
                     :hide-back-action="true">
            <template #actions>
                <action-button
                    :icon="$icons.confirm"
                    @action.prevent="showPayload=false">
                </action-button>
            </template>
            <unit-payload
                class="mt-2"
                v-model="value.payload"
                :holder-id="holderId"
                :holder-parent-id="holderParentId"
                :holder-parent-type="holderParentType"
            ></unit-payload>
        </aside-panel>
    </div>

</template>
<script>

import AsidePanel from '@/components/containers/components/AsidePanel'
import UnitPayload from './UnitPayload'
import ActionEditView from '@/components/ReactForm/components/ActionEditView'

export default {
    name: 'UnitInput',
    components: {ActionEditView, AsidePanel, UnitPayload},
    props: {
        holderId: {},   //fq_id, react_id, var_id
        holderParentId: {}, //only for unit react_id, var_id
        holderParentType: {}, //  react, var
        value: {}
    },
    data() {
        return {
            showPayload: false
        }
    },
    watch: {
        value: {
            immediate: true,
            handler() {

            }
        }
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.unit-input {
    &__row {
        display: flex;
        .select-view {
            flex: 1 0 auto;
        }
    }
}
</style>
