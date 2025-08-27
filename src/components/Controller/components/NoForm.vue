<template>
    <div class="no-forms my-5">
        <h4 class="text-muted">No forms have been added to the group. Please go to settings and setup forms.</h4>
        <action-button :icon=$icons.setup @action="$router.push({name: R_CONTROLLER_SETTINGS()})">SETTING
        </action-button>
    </div>
</template>
<script>
import {R_CONTROLLER_SETTINGS} from "@modules/routs";

export default {
    methods: {
        R_CONTROLLER_SETTINGS() {
            return R_CONTROLLER_SETTINGS
        }
    }
}

</script>

<style lang="scss">
.no-forms {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>
