<template>
    <list-base title="Available field types" :items="fqt" :key-name="'fqt_name'">
        <template #default="{item}">
            <icon :icon="item.icon" class="mr-1"></icon>{{item.fqt_displayname}}
        </template>
    </list-base>
</template>

<script>
import ListBase from './ListBase'
import helpers from '../mixins/helpers'

export default {
    name: "ListFields",
    mixins: [helpers],
    components: {ListBase}
}
</script>
