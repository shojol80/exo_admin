<template>
    <div class="fqt-base" :class="{'fqt-base--active':active}" @click="$emit('click')">
        <fqt-header>
            <template #default="{hover}">
                <slot name="header" v-bind:fq="fq">
                    <div class="fqt-base__header-title"
                         @click="collapse($event)">
                        <icon class="fqt-base__header-icon" :icon="icon"></icon>
                        {{ fq.fq_name }}
                    </div>
                    <action-group v-show="active || hover" class="fqt-base__header-actions">
                        <action-group-separator></action-group-separator>
                        <action-button
                            title="Delete field"
                            :icon="$icons.delete"
                            @action="onActionDelete">
                        </action-button>
                        <action-dropdown
                            :icon="$icons.more">
                            <template #dropdown>
                                <b-dropdown-item
                                    @click="info=true">Show info
                                </b-dropdown-item>
                                <b-dropdown-item
                                    @click="prefix=true">Show prefix
                                </b-dropdown-item>
                                <b-dropdown-item
                                    @click="postfix=true">Show postfix
                                </b-dropdown-item>
                            </template>
                        </action-dropdown>
                        <action-button
                            class="fqt-base__collapse"
                            title="Collapse"
                            :icon="$icons.collapse_down"
                            @action="collapse($event)">
                        </action-button>
                    </action-group>
                    <span v-show="!(active || hover)" class="fqt-base__header-displayname">{{
                            fq.fq_displayname
                        }}</span>
                </slot>
            </template>
        </fqt-header>
        <b-collapse :visible="active" class="fqt-base__edit" :id="fq.fq_id+'id'">
            <div class="fqt-base__options">
                <slot name="options" v-bind:fq="fq">
                    <slot name="type" v-bind:fq="fq">
                        <x-form-select
                            title="Type"
                            :options="fqt"
                            id-key="fqt_id"
                            zIndex="9999"
                            :clearable="false"
                            label-key="fqt_name"
                            v-model="fq.fq_type">
                        </x-form-select>
                    </slot>
                    <x-form-input
                        :id="'fq_name'+fq.fq_id"
                        :disabled="isNameDisabled"
                        title="Name"
                        v-model="fq.fq_name"
                        @input="updateLabel"
                        db-field="fq_name">
                    </x-form-input>
                    <x-form-input
                        :id="'fq_displayname'+fq.fq_id"
                        title="Label"
                        v-model="fq.fq_displayname"
                        @change="labelDirty=true"
                        db-field="fq_displayname">
                    </x-form-input>
                    <x-form-text-area
                        :id="'fq_info'+fq.fq_id"
                        v-show="showInfo"
                        title="Info"
                        v-model="fq.fq_info"
                        db-field="fq_info">
                    </x-form-text-area>
                    <x-form-input
                        :id="'fq_prefix'+fq.fq_id"
                        v-show="showPrefix"
                        title="Prefix"
                        v-model="fq.fq_prefix"
                        db-field="fq_prefix">
                    </x-form-input>
                    <x-form-input
                        :id="'fq_postfix_'+fq.fq_id"
                        v-show="showPostfix"
                        title="Postfix"
                        v-model="fq.fq_postfix"
                        db-field="fq_postfix">
                    </x-form-input>
                    <slot name="required" v-bind:fq="fq">
                        <x-form-switch
                            title="Required"
                            v-model="fq.fq_isrequired"
                            db-field="fq_isrequired">
                        </x-form-switch>
                    </slot>
                    <slot name="rules" v-bind:fq="fq">
                        <x-form-input
                            :id="'fq_rules_'+fq.fq_id"
                            title="Validation rules"
                            v-model="fq.fq_rules"
                            db-field="fq_rules">
                        </x-form-input>
                    </slot>
                    <slot name="customParam" v-bind:fq="fq">
                        <x-form-group
                            class="fqt-base__custom-params"
                            title="Custom params">
                            <custom-params-input
                                v-model="fq.fq_custom_params">
                            </custom-params-input>
                        </x-form-group>
                    </slot>
                    <fq-visibility-checks :fq="fq"/>
                    <slot v-bind:fq="fq">
                    </slot>
                </slot>
            </div>
        </b-collapse>
        <slot name="footer"></slot>
    </div>
</template>

<script>
import FqtHeader from "@/components/FormBuilder/components/fqt/FqtHeader.vue";
import FqVisibilityChecks from "@/components/FormBuilder/components/FqVisibilityChecks.vue";

export default {
    name: "fqtBase",
    components: {FqVisibilityChecks, FqtHeader},
    model: {
        prop: 'fq',
        event: 'change'
    },
    props: {
        fq: {
            type: Object,
        },
        active: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            info: false,
            prefix: false,
            postfix: false,
            labelDirty: false
        }
    },
    computed: {
        showInfo() {
            return !!this.fq.fq_info || this.info
        },
        showPrefix() {
            return !!this.fq.fq_prefix || this.prefix
        },
        showPostfix() {
            return !!this.fq.fq_postfix || this.postfix
        },
        fqt() {
            return this.$store.getters['ECO/fqtArray']
        },
        icon() {
            let fqt = this.$store.getters['ECO/fqtArrayId'][this.fq.fq_type]
            if (fqt) return fqt['icon']
            else return ''
        },
        type() {
            let fqt = this.$store.getters['ECO/fqtArrayId'][this.fq.fq_type]
            if (fqt) return fqt['fqt_displayname']
            else return ''
        },
        isNameDisabled() {
            let fqt = this.$store.getters['ECO/fqtArrayId'][this.fq.fq_type]
            if (fqt) return fqt['singleton']
            else return false
        },
    },
    methods: {
        onActionDelete() {
            this.$emit('delete')
        },
        updateLabel($event) {
            if (this.fq.fq_id > 0) return
            if (this.labelDirty) return
            this.fq.fq_displayname = $event
        },
        collapse(e) {
            this.$emit('collapse')
        }
    }
}
</script>

<style lang="scss">

@import "@/assets/scss/vue-component";

.fqt-base {
    //border-left: 1px solid $exo-bg;
    position: relative;
    padding: 0;

    &:not(.fqt-base--active) {

    }

    &--active {
        border-left: 2px solid $primary;

        .fqt-base__collapse i {
            transform: rotateZ(180deg)
        }
    }

    &__header {

    }

    &__header-icon {
        margin-right: 0.8rem;
        color: $secondary;
    }

    &__header-title {
        cursor: pointer;
        margin-left: 0.8rem;
        padding: 0 5px;
        font-size: 1.1rem;
    }

    &__header-displayname {
        color: #bebebf;
        font-size: 0.9rem;
        margin-left: auto;
    }

    &__header-actions {
        margin-left: auto;
    }

    &__edit {
        > div {
            padding: $list-group-item-padding-y $list-group-item-padding-x;
            position: relative;
        }

        .column-drag-handle {
            color: $gray-400;
            position: absolute;
            top: -0.75rem;
            left: 0;
            right: 0;
            text-align: center;
            transform: rotate(90deg);
            cursor: move;
        }
    }

    &__custom-params {
        .form-row > .col {
            display: flex;
        }
    }
}


</style>
