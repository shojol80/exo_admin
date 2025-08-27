<template>
    <fieldset class="collapse-section">
        <div class="collapse-section__header">
            <action-group>
                <legend class="collapse-section__legend"
                        @click="visible=!visible">
                    <slot name="legend" v-bind="{visible}"></slot>
                </legend>
                <action-button
                    class="collapse-section__collapse"
                    title="Collapse"
                    :icon="visible? $icons.collapse_up:$icons.collapse_down"
                    @action="visible=!visible">
                </action-button>
            </action-group>
        </div>
        <b-collapse class="collapse-section__body" :visible="visible">
            <slot></slot>
        </b-collapse>
    </fieldset>
</template>

<script>

export default {
    name: "CollapseSection",
    data() {
        return {
            visible: false
        }
    },
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.collapse-section {
    border: 1px solid $input-border-color;
    border-radius: $input-border-radius;

    &__header {
        background: $white;
        padding: $input-padding-x;
        border-radius: $input-border-radius;
        >.action-group {
            justify-content: space-between;
        }
    }

    &__legend {
        font-size: 1.25rem;
        color: $primary;
        margin-bottom: 0;
        margin-right: 2rem;
        cursor: pointer;

        display: flex;
        align-items: baseline;
        //justify-content: space-between;
    }
}

</style>
