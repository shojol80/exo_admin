<template>
    <x-nestable v-bind="$attrs"
                v-on="$listeners"
                :value="reacts"
                @input="$emit('input',$event)">
        <x-nestable-handle slot="default" slot-scope="props" v-bind="props">
            <template slot="content">
                <react-nestable-row
                    :item="props.item">
                </react-nestable-row>
            </template>
        </x-nestable-handle>
        <template #placeholder>
            Press "+" to add items to this group.
        </template>
    </x-nestable>
</template>

<script>
import XNestable from '@/components/XNestable/XNestable'
import XNestableHandle from '@/components/XNestable/XNestableHandle'
import ReactNestableRow from './ReactNestableRow'

export default {
    name: 'ReactNestable',
    components: {
        XNestableHandle,
        ReactNestableRow,
        XNestable,
    },
    model: {
        prop: 'reacts',
        event: 'input'
    },
    props: {
        reacts: Array,
    }
}
</script>

<style scoped>

</style>
