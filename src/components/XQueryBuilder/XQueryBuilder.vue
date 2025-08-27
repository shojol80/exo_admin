<template>
    <vue-query-builder v-bind="$attrs" v-on="$listeners" class="x-query-builder">
        <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData"/>
        </template>
    </vue-query-builder>
</template>

<script>

import "vue-query-builder/dist/VueQueryBuilder.css"
import VueQueryBuilder from "vue-query-builder";

export default {
    name: "XQueryBuilder",
    components: {
        VueQueryBuilder,
    },
}

</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.x-query-builder {
    > .vqb-group {
        margin-bottom: 0;
    }

    .vqb-children {
        .vqb-rule:last-child {
            margin-bottom: 0;
        }
    }

    .vqb-custom-component-wrap {
        flex: 1 0 auto;
        margin-right: 1rem;
    }

    .close {
        color: #7f7f7f;
        padding: 0.4rem;
    }

    .vqb-rule {
        padding: 0.8rem 1rem;
    }

    .vqb-group .rule-actions {
        margin-bottom: 1rem;
    }
}
</style>
