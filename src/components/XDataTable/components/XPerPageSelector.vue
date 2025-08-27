<template>
    <fragment>
        <b-dropdown-item v-for="val in props.perPageValues" :key="val"
                         :active="$refs.table && $refs.table.limit===val"
                         @click="props.selectEvents.change(val)">{{ val }}
        </b-dropdown-item>
    </fragment>
</template>

<script>
export default {
    name: "XPerPageSelector",
    props: ['props']
}
</script>
