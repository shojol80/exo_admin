<template>
    <action-button
        :disabled="!react_id"
        title="Setup layout"
        :icon="$icons.layout"
        @action="action">
    </action-button>
</template>

<script>

import {R_REACT_LAYOUT} from "@modules/routs";
import objectToXeditId from "@modules/utils/objectToXeditId";
import {REACT_LAYOUT_SCOPE_REACT} from "@modules/constants";

export default {
    name: 'ActionEditLayout',
    components: {},
    props: {
        react_id: {},
    },
    computed: {},

    methods: {
        action() {
            //todo check for dirty
            this.$router.push({
                name: R_REACT_LAYOUT, params: {
                    layout: objectToXeditId({
                        holderId: this.react_id,
                        holderType: REACT_LAYOUT_SCOPE_REACT
                    })
                }
            })
        },
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/vue-component";

</style>
