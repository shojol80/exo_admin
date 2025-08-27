<template>
    <action-toolbar :sticky="false" class="fm-disk-list">
        <action-group>
            <action-button
                v-for="(disk, index) in disks" :key="index"
                size="sm"
                :icon="'fa-fw far fa-hdd'"
                :active="disk === selectedDisk"
                @action="selectDisk(disk)">
                {{ disk }}
            </action-button>
        </action-group>
    </action-toolbar>
</template>

<script>
export default {
    name: 'DiskList',
    props: {
        // manager name - left or right
        manager: {type: String, required: true},
    },
    computed: {
        /**
         * Disk list
         * @returns {Array}
         */
        disks() {
            return this.$store.getters['fm/diskList'];
        },

        /**
         * Selected Disk for this manager
         * @returns {default.computed.selectedDisk|(function())|default.selectedDisk|null}
         */
        selectedDisk() {
            return this.$store.state.fm[this.manager].selectedDisk;
        },
    },
    methods: {
        /**
         * Select disk
         * @param disk
         */
        selectDisk(disk) {
            if (this.selectedDisk !== disk) {
                this.$store.dispatch('fm/selectDisk', {
                    disk,
                    manager: this.manager,
                });
            }
        },
    },
};
</script>

<style lang="scss">
.fm-disk-list {

}
</style>
