<template>
    <component v-bind:is="currentView">
        <slot>
            <router-view></router-view>
        </slot>
    </component>
</template>

<script>

import DefaultContainer from './components/DefaultContainer'
import PopupContainer from './components/PopupContainer'

export default {
    components: {
        PopupContainer,
        DefaultContainer
    },
    data() {
        return {}
    },
    props:
        ['mode'],

    computed: {
        currentView() {
            return this.$store.getters['app/screenMode'] === 'FULLSCREEN' ? 'DefaultContainer' : 'PopupContainer'
        }
    },

}
</script>
