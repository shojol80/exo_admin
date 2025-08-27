<template>
    <div class="VueTables__search-field">
        <label :for="`VueTables__search_${props.id}`" :class="props.theme.label">
            {{ props.display("filter") }}
        </label>
        <input :class="`VueTables__search__input ${props.theme.input} ${props.theme.small}`"
               type="text"
               :placeholder="props.display('filterPlaceholder')"
               @keyup="e=>search(e, props)"
               :id="`VueTables__search_${props.id}`"
               autocomplete="off"
        />
    </div>
</template>

<script>
import debounce from "debounce";

export default {
    name: "XGenericFilter",
    props: ['props'],
    methods: {
        search: debounce((e, props) => {
            props.search(false)(e)
        }, 600)
    }
}
</script>
