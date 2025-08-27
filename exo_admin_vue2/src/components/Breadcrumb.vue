<template>
    <fragment>
        <ol class="breadcrumb">
            <li class="breadcrumb-item" v-for="(routeObject, index) in routeRecords" :key="index">
                <span class="active" v-if="isLast(index)">{{routeObject.label}} <portal-target slim name="breadcrumbLast"/> </span>
                <router-link :to="routeObject" v-else>{{routeObject.label}}</router-link>
            </li>
        </ol>
        <portal-target name="breadcrumbAfter"/>
    </fragment>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {}
    },
    computed: {
        routeRecords: function () {
            return this.$store.state.breadcrumb.list
        }
    },
    methods: {
        isLast(index) {
            return index === this.routeRecords.length - 1
        },
    },

}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/vue-component";

.breadcrumb {
    background-color: $white;
    border-radius: 0;
    border: none;
    font-size: 80%;
    font-weight: 700;
    color: $secondary;
    text-transform: uppercase;
}

</style>
