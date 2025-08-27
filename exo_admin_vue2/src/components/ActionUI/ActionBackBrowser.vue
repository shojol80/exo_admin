<template>
    <action-button
        v-show="hasHistory(this.$route)"
        :title="'back to '+$routerHistory.previous().path"
        :icon="$icons.back"
        v-bind="$attrs"
        @action="onAction">
    </action-button>
</template>
<script>

export default {
    name: "ActionBackBrowser",
    computed: {},
    methods: {
        hasHistory() {
            return this.$routerHistory.hasPrevious() && this.$routerHistory.previous().path !== '/loading/'
        },
        onAction(e) {
            this.$router.push({path: this.$routerHistory.previous().path})
        }
    }
}
</script>
