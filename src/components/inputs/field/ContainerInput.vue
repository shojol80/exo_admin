<template>
    <action-button :disabled="isDisabled"
                   :icon="icon"
                   :title="isDisabled?'You need save entity to edit container':''"
                   @action.prevent="onActionEdit">
        <slot v-if="!hideText">Edit container ({{ count_str }})</slot>
    </action-button>
</template>
<script>
import {R_CONTROLLER} from '@modules/routs'
import objectToContainerId from '@modules/utils/objectToContainerId'
import flattenTree from '@/shared/flattenTree'

export default {
    name: 'ContainerInput',
    props: {
        holderType: {},       //react, var, unit, form_permalink
        holderKey: {},        //only for unit
        holderId: {},         //react_id, var_id, fq_name, fp_id
        holderParentId: {},   //only for unit react_id
        holderParentType: {}, //react, var
        fq_name: {},
        value: {},
        icon: {
            default: 'far fa-edit'//this.$icons.edit
        },
        hideText: {default: false},
    },
    computed: {
        isDisabled() {
            if (this.holderType === 'unit') {
                return !this.holderParentId || !this.holderId
                    || this.holderParentId < 1 || this.holderId < 1
                    || this.holderParentId === 'new' || this.holderId === 'new';
            } else {
                return !this.holderId || this.holderId < 1 || this.holderId === 'new';
            }
        },
        count() {
            try {
                let c = typeof this.value === 'object' && this.value !== null ? this.value : JSON.parse(this.value)
                let items = c && c.items || 0
                if (!items) return 0
                items = flattenTree(items, 'children')
                return items.length
            } catch (e) {
                console.error(e)
                return 0
            }
        },
        count_str() {
            switch (this.count) {
                case 0:
                    return 'empty'
                case 1:
                    return '1 item'
                default:
                    return `${this.count} items`
            }
        }
    },
    methods: {
        async onActionEdit() {
            let response = await this.$dialogs.confirm({message: 'You will be redirected to another screen. All unsaved data will be lost.  Continue?'})
            if (response.trigger !== 'ok') return
            let container = objectToContainerId({
                'holderType': this.holderType,
                'holderKey': this.holderKey,
                'holderId': this.holderId,
                'holderParentId': this.holderParentId,
                'holderParentType': this.holderParentType,
                'fq_name': this.fq_name
            })

            this.$emit('click')

            this.$router.push({
                name: R_CONTROLLER,
                params: {
                    container
                },
                query: {
                    back: this.$route.path
                }
            })

        }
    }
}
</script>
