<template>
    <splitpanes class="splitpanes--exo app-screen app-screen--with-aside">
        <pane size="18" class="app-screen__aside" v-if="hasSlot('aside') && !hideTree">
            <div v-bar class="app-screen__scroll-area app-screen__scroll-area-x">
                <div>
                    <slot name="aside"></slot>
                </div>
            </div>
        </pane>
        <pane class="app-screen__main">
            <div v-bar class="app-screen__scroll-area">
                <div>
                    <slot>
                        <router-view/>
                    </slot>
                </div>
            </div>
        </pane>
    </splitpanes>
</template>

<script>
import {Pane, Splitpanes} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

import HasSlots from '@modules/mixins/HasSlots'

export default {
    name: 'AppScreen',
    mixins: [HasSlots],
    components: {
        Splitpanes,
        Pane,
    },
    data() {
        return {
            asideW: 20,
            hideTree: false
        }
    },
    mounted() {
        if (this.$route.query.hide_tree !== undefined) {
            this.hideTree = true;
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.app-screen {
    //padding-top: $app-screen-y-padding;
    @include make-container();

    &--with-aside {

        display: flex;
        position: relative;
        //height: calc(100vh - #{$app-header-height});
        height: 100%;
        padding-left: 0;
        padding-right: 0;

        .app-screen__aside {
            flex: 0 0 auto;
            overflow: hidden;

            > .app-screen__scroll-area {
                @include make-container();
            }

            //position: absolute;
            top: 0;
            max-width: 500px;
            //flex: 1 0 30%;
            width: 300px;
            //flex: 1 0 auto;
        }

        .app-screen__main {
            overflow: hidden;

            > .app-screen__scroll-area {
                @include make-container();
            }

            flex-grow: 1;
            //flex: 1 0 70%;
            //overflow: auto;
        }
    }

    &__scroll-area {
        //height: calc(100vh - #{$app-header-height});
        height: 100%;
        //overflow: auto;
        padding-right: 0 !important;

        .tree {
            //overflow: hidden;
        }
    }

    &__scroll-area-x {
        //overflow-x: auto;
    }
}

/*.aside-float {
    //overflow: visible !important;
    position: absolute;
    z-index: 100000;
    height: 100%;
    background: #eeeeee;
    padding: 1rem;
    left: 0;
    top: 0;
    box-shadow: 1px 1px 10px 0px;
    min-width: 300px;
    width: auto;
}*/

</style>
