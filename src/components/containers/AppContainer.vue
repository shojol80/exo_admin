<template>
    <component v-bind:is="currentView">
        <slot>
            <router-view></router-view>
        </slot>
    </component>
</template>

<script>

import AppSidebarContainer from './components/AppSidebarContainer'
import PopupContainer from './components/PopupContainer'

export default {
    components: {
        AppSidebarContainer,
        PopupContainer
    },
    data() {
        return {}
    },
    props:
        ['mode'],

    computed: {
        currentView() {
            return this.$store.getters['app/screenMode'] === 'FULLSCREEN' ? 'AppSidebarContainer' : 'PopupContainer'
        }
    },
}
</script>
