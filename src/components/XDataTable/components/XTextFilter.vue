<template>
    <input
        @keyup="e => search(e, props)"
        :class="props.theme.input"
        :name="props.getColumnName(props.column)"
        type="text"
        autocomplete="off"
    />
</template>

<script>
import debounce from 'debounce'

export default {
    name: "XTextFilter",
    props: ['props'],
    methods: {
        search: debounce((e, props) => {
            props.search(false)(e)
        }, 600)
    }
}
</script>
