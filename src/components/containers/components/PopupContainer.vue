<template>
    <div class="app">
        <popup-header fixed :title="name"></popup-header>
        <div class="app-body">
            <main class="main">
                <slot>
                </slot>
            </main>
        </div>
    </div>
</template>

<script>
import nav from '@/_nav'
import PopupHeader from './PopupHeader'

export default {
    name: 'PopupContainer',
    components: {
        PopupHeader,
    },

    data() {
        return {
            nav: nav.items
        }
    },
    computed: {
        breadcrumbLast() {
            return this.$store.getters['breadcrumb/last']
        },
        name() {
            if (this.breadcrumbLast) return this.breadcrumbLast.label;
            return (this.$route.meta && this.$route.meta.label) ? this.$route.meta.label : this.$route.name
        },
    }
}
</script>
