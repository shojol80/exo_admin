<template>
    <b-form-group
        :label-cols-sm="labelColsSm"
        :label-cols-lg="labelColsLg"
        :label-for="nameComputed"
        class="x-form-group"
        :class="{ 'x-form-group--padding': controlPadding }"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <span slot="label" v-b-tooltip.hover="{ delay: 1000 }" :title="dbField">
            {{ title }}
            <template v-if="$slots['info']">
                <info-icon>
                    <slot name="info" />
                </info-icon>
            </template>
        </span>
        <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
        <template
            v-for="(_, name) in $scopedSlots"
            :slot="name"
            slot-scope="slotData"
        >
            <slot :name="name" v-bind="slotData" />
        </template>
    </b-form-group>
</template>

<script>
export default {
    name: "XFormGroup",
    props: {
        title: String,
        info: String,
        dbField: String,
        name: {
            type: String,
            default: null,
        },
        controlPadding: {
            type: Boolean,
            default: false,
        },
        labelColsSm: {
            default: 3,
        },
        labelColsLg: {
            default: 2,
        },
    },
    computed: {
        nameComputed() {
            return this.name || this.dbField;
        },
    },
};
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.x-form-group {
    &--padding {
        .form-row > .col {
            padding-top: add($input-padding-y, $input-border-width);
            padding-bottom: add($input-padding-y, $input-border-width);
        }
    }
}
</style>
