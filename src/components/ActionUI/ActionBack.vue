<template>
    <action-button
        v-if="hasHistory"
        title="Back"
        :icon="$icons.back"
        v-bind="$attrs"
        @action="onAction"
    >
    </action-button>
</template>
<script>
import { isObject } from "lodash";

export default {
    name: "ActionBack",
    props: {
        backRoute: {
            type: [String, Boolean, Object, Function],
            default: true,
        },
    },
    computed: {
        queryBack() {
            return this.$route.query.back;
        },
        route() {
            return isObject(this.backRoute) ||
                typeof this.backRoute === "string" ||
                this.backRoute instanceof String
                ? this.backRoute
                : false;
        },
        hasHistory() {
            return (
                this.backRoute !== false &&
                (this.route ||
                    this.queryBack ||
                    this.$route.meta.defaultRouteBack ||
                    window.history.length > 1)
            );
        },
    },
    methods: {
        onAction(e) {
            if (typeof this.backRoute === "function") {
                this.backRoute();
            } else {
                if (this.queryBack) {
                    this.$router.push(this.queryBack);
                } else if (this.route) {
                    if (isObject(this.route)) {
                        this.$router.push(this.route);
                    } else {
                        this.$router.push({ name: this.route });
                    }
                } else if (this.$routerHistory.hasPrevious()) {
                    this.$router.push({
                        path: this.$routerHistory.previous().path,
                    });
                } else {
                    this.$router.push({
                        name: this.$route.meta.defaultRouteBack,
                    });
                }
            }
            this.$emit("back", e);
        },
    },
};
</script>
