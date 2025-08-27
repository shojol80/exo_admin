<template>
    <div class="fm-content d-flex flex-column">
        <disk-list :manager="manager"></disk-list>
<!--        <breadcrumb :manager="manager"></breadcrumb>-->
        <div class="fm-content-body">
            <table-view v-if="viewType === 'table'" :manager="manager"></table-view>
            <grid-view v-else :manager="manager"></grid-view>
        </div>
    </div>
</template>

<script>
// Components
import DiskList from './DiskList.vue';
import Breadcrumb from './Breadcrumb.vue';
import TableView from './TableView.vue';
import GridView from './GridView.vue';

export default {
    name: 'Manager',
    components: {
        DiskList,
        Breadcrumb,
        TableView,
        GridView,
    },
    props: {
        manager: {type: String, required: true},
    },
    computed: {
        /**
         * view type - grid or table
         * @returns {default.computed.viewType|(function())|string}
         */
        viewType() {
            return this.$store.state.fm[this.manager].viewType;
        },
    },
};
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.fm-content {
    height: 100%;

    .fm-content-body {
        overflow: auto;
    }
}
</style>
