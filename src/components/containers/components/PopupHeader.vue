<template>
    <div class="popup-header">
        <div>
            <action-back-browser class="popup-header__back"></action-back-browser>
        </div>
        <div class="popup-header__title">
            <h2>
                {{ title }}
                <portal-target name="popupHeader" slim/>
            </h2>
            <portal-target name="breadcrumbAfter"/>
        </div>
        <div>
            <action-button
                class="popup-header__close"
                :icon="$icons.close"
                variant="white"
                @action="close">
            </action-button>
        </div>
    </div>
</template>

<script>
import exoEventBus from "@modules/exoEventBus"

export default {
    name: "PopupHeader",
    props: {
        title: '',
        fixed: {
            type: Boolean,
            default: false
        }
    },

    mounted() {
        this.isFixed(this.fixed)
    },

    methods: {
        isFixed(fixed) {
            fixed ? document.body.classList.add('header-fixed') : document.body.classList.remove('header-fixed')
            return fixed
        },
        close() {
            exoEventBus.$emit('exo-popup-header-close-outer', {}, 1);
        },
    },
}
</script>

<style lang="scss">

@import "src/assets/scss/vue-component";

.popup-header {
    padding: 0 15px;
    width: 100%;
    background: $exo-gray;
    color: $exo-white;
    font-size: 20px;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .action-button {
        color: $exo-white;
    }


    > h2 {
        font-size: $h3-font-size;
        margin: 0;

        .info-icon {
            font-size: 15px;
            color: $exo-white
        }
    }
}

.header-fixed .popup-header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1021;
}
</style>
