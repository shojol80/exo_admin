<template>
    <app-screen>
        <div class="btn-settings">
            <waiter ref="waiter">
                <div class="btn-settings__toolbar">
                    <draggable v-model="toolbarBtns"
                               v-bind="dragOptions"
                               @end="onEndMove"
                               class="toolbar">
                        <div v-for="code in toolbarBtns" :key="code"
                             :class="{'toolbar-btn':true,'toolbar-btn--text':text_buttons.includes(code)}">
                            <span v-if="text_buttons.includes(code)">{{ buttons[code] }} <i
                                class="mce-caret"></i></span>
                            <i v-else :class="`mce-ico mce-i-${code}`" :title="buttons[code]"></i>
                        </div>
                    </draggable>
                    <div class="button-set mt-4">
                        <h4 class="">available buttons</h4>
                        <draggable v-model="toolbarBtnsSet"
                                   v-bind="dragOptions"
                                   @end="onEndMove"
                                   class="set-toolbar">
                            <div v-for="(code) in toolbarBtnsSet" :key="code"
                                 :class="{'set-toolbar-btn':true,'set-toolbar-btn--text':text_buttons.includes(code)}">
                                <i v-if="!text_buttons.includes(code)" :class="`mce-ico mce-i-${code}`"
                                   :title="buttons[code]"></i>
                                <span>
                                    {{ buttons[code] }}
                                </span>
                                <i v-if="text_buttons.includes(code)" class="mce-caret"></i>
                            </div>
                        </draggable>
                    </div>
                    <div class="mt-4">
                        <h4>Additional settings</h4>
                        <div>
                            <div class="mt-3">
                                <x-switch label-position="right"
                                          v-model="disableInheritanceMenu"
                                          @change="onCheckInherence">
                                    Disable inheritance for this editable region
                                </x-switch>
                            </div>
                            <div class="mt-3">
                                <x-switch label-position="right"
                                          v-model="contextmenu"
                                          @change="onCheckContextMenu">
                                    Enable right-click context menu
                                </x-switch>
                            </div>
                        </div>
                    </div>
                </div>
            </waiter>
        </div>
    </app-screen>
</template>

<script>

import editor from '@/services/api/editor'
import {get} from "lodash"
/* import '../../../../exo_editor/src/exologEditor/exoTinyMCE/skins/exolog/skin.min.css' */
import draggable from 'vuedraggable'

export default {
    name: 'BtnSettings',
    components: {draggable},
    data() {
        return {
            config: {},
            editable: true,
            loaded: false,
            toolbarBtns: [],
            toolbarBtnsSet: [],
            disableInheritanceMenu: false,
            contextmenu: false

        }
    },
    computed: {
        buttons() {
            return get(this.config, 'toolbar.buttons')
        },
        text_buttons() {
            return get(this.config, 'toolbar.text_buttons')
        },
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: !this.editable,
                ghostClass: "ghost"
            };
        },
    },
    mounted() {
        this.load()
    },
    methods: {
        onCheckInherence(e) {
            this.save({
                id: this.$route.query.id,
                field: 'extra_' + this.$route.query.field,
                extra: true,
                items: {
                    'disableInheritanceMenu': Boolean(this.disableInheritanceMenu).toString()
                }
            });
        },
        onCheckContextMenu(e) {

            this.save({
                id: this.$route.query.optionId,
                field: 'extra_' + this.$route.query.field,
                extra: true,
                items: {
                    'contextmenu': Boolean(this.contextmenu).toString()
                }
            });
        },
        onEndMove(e) {
            this.save({
                id: this.$route.query.optionId,
                field: this.$route.query.field,
                items: this.toolbarBtns
            })
        },
        async load() {
            this.config = await editor.loadToolbarButtons({
                ...this.$route.query
            })
            this.toolbarBtns = this.config.options ? Object.values(this.config.options) : []
            this.toolbarBtnsSet = Object.keys(get(this.config, 'toolbar.buttons')).filter(i => !this.toolbarBtns.includes(i))
            this.disableInheritanceMenu = this.config.fieldExtraOptions.disableInheritanceMenu === 'true'
            this.contextmenu = this.config.extraOptions.contextmenu === 'true'
            this.loaded = true
        },

        async save(params) {
            if (!this.loaded) return
            editor.saveToolbarButtons(params)
        }
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

//todo make it common
//@import "../../../../exo_editor/src/assets/scss/exolog-editor/mce";

.btn-settings {
    padding: 1rem 2rem;
    h4 {
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: bold;
        color: $primary;
    }

    .toolbar {
        border: 1px solid $border-color;
        background: $white;
        padding: 0.5rem;
        color: $gray-900;
        display: flex;
        min-height: 50px;
    }

    .toolbar-btn {
        margin: 0 0.2rem;
        padding: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid transparent;
        background: white;
        min-width: 32px;

        &:hover {
            border-color: $border-color;
            cursor: move;
        }

        &--text {
            border: 1px solid $border-color;
            padding: 4px 7px;

        }
    }

    .mce-caret {
        color: $secondary;
        margin-left: 5px;
        vertical-align: middle;
    }

    .mce-ico {
        color: $secondary;
    }

    .set-toolbar {
        border: 1px solid $border-color;
        padding: 0.5rem;
        color: $gray-900;
        display: flex;
        flex-wrap: wrap;
    }

    .set-toolbar-btn {
        font-size: 12px;
        margin: 0.2rem 0.2rem;
        padding: 2px 7px;
        //display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        overflow: hidden;
        width: 140px;
        white-space: nowrap;
        text-overflow: ellipsis;
        border: 1px solid $border-color;
        background: white;

        .mce-ico {
            margin-right: 5px;
            vertical-align: middle;
            margin-bottom: 2px;
        }

        &:hover {
            border-color: $border-color;
            cursor: move;
        }

        &.set-toolbar-btn--text {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .mce-i-responsivefilemanager:before {
        content: "\e034"
    }

    .mce-i-editcssbutton {
        content: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxMi41NTMgMzEyLjU1MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzEyLjU1MyAzMTIuNTUzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxwYXRoIGQ9Ik0zMDIuNTUzLDBIMTBDNC40NzcsMCwwLDQuNDc4LDAsMTB2MjkyLjU1M2MwLDUuNTIyLDQuNDc3LDEwLDEwLDEwaDI5Mi41NTNjNS41MjMsMCwxMC00LjQ3OCwxMC0xMFYxMCAgQzMxMi41NTMsNC40NzgsMzA4LjA3NiwwLDMwMi41NTMsMHogTTEyMC45MzQsMTkyLjgxNGMtOS4zNTgsOC4xODktMjEuMzEzLDEyLjY5OS0zMy42NiwxMi42OTkgIGMtMjcuNzQ3LDAtNTAuMzIxLTIyLjExMi01MC4zMjEtNDkuMjkzYzAtMjcuMTE5LDIyLjU3NC00OS4xODIsNTAuMzIxLTQ5LjE4MmMxMi4zNjUsMCwyNC4yNzksNC40NzIsMzMuNTQ4LDEyLjU5MiAgYzMuODczLDMuMzk0LDQuMjYyLDkuMjgzLDAuODY5LDEzLjE1NmMtMy4zOTIsMy44NzQtOS4yODMsNC4yNjUtMTMuMTU3LDAuODY5Yy01Ljg2Ny01LjE0LTEzLjQxNy03Ljk3MS0yMS4yNi03Ljk3MSAgYy0xNy40NjUsMC0zMS42NzQsMTMuNjk4LTMxLjY3NCwzMC41MzVjMCwxNi44OTgsMTQuMjA5LDMwLjY0NiwzMS42NzQsMzAuNjQ2YzcuODMsMCwxNS40MjMtMi44NzIsMjEuMzgxLTguMDg2ICBjMy44NzQtMy4zOTEsOS43NjUtMi45OTgsMTMuMTU2LDAuODc3QzEyNS4yMDEsMTgzLjUzMywxMjQuODA5LDE4OS40MjMsMTIwLjkzNCwxOTIuODE0eiBNMTY3LjM5OCwyMDQuOTcgIGMtMTIuMzQzLDAtMjQuOTM2LTUuMjA1LTMyLjg2NC0xMy41ODZjLTMuNTM5LTMuNzQtMy4zNzUtOS42NDEsMC4zNjUtMTMuMThjMy43NDEtMy41MzgsOS42NDItMy4zNzYsMTMuMTgsMC4zNjUgIGM0LjM4OCw0LjYzOCwxMi4xNTIsNy43NTQsMTkuMzE5LDcuNzU0YzcuMzA4LDAsMTUuODQyLTIuMTE0LDE1Ljg0Mi04LjA3MmMwLjA0Ny01LjY5MS0yLjgxOS03LjY5Ny0xNy4wMzYtMTIuMDAzICBjLTEyLjUyLTMuNzkxLTMxLjQzOS05LjUyMS0zMS40MzktMzEuMzY2YzAtMTYuMzI4LDE0LjE0LTI3LjI5OSwzNS4xODUtMjcuMjk5YzkuMzU4LDAsMTkuNTYzLDIuODM5LDI2LjYzMSw3LjQwOCAgYzQuMzI0LDIuNzk2LDUuNTYzLDguNTY3LDIuNzY3LDEyLjg5MmMtMi43OTUsNC4zMjUtOC41NjgsNS41NjQtMTIuODkyLDIuNzY5Yy00LjAyNi0yLjYwNC0xMC44MTQtNC40MjItMTYuNTA3LTQuNDIyICBjLTcuNjI5LDAtMTYuNTM3LDIuMjY3LTE2LjUzNyw4LjY1MmMwLDYuOTU4LDQuMDk5LDkuMjUsMTguMTk2LDEzLjUyYzEyLjEyNiwzLjY3MywzMC40NDksOS4yMjIsMzAuMjc4LDI5LjkyNyAgQzIwMS44ODgsMTk0LjIzMiwxODguMDI4LDIwNC45NywxNjcuMzk4LDIwNC45N3ogTTI0MS4xMDksMjA0Ljk3Yy0xMi4zNDQsMC0yNC45MzYtNS4yMDUtMzIuODY0LTEzLjU4NiAgYy0zLjUzOS0zLjc0LTMuMzc2LTkuNjQxLDAuMzY1LTEzLjE4YzMuNzQxLTMuNTM4LDkuNjQyLTMuMzc2LDEzLjE4LDAuMzY1YzQuMzg4LDQuNjM4LDEyLjE1Miw3Ljc1NCwxOS4zMTksNy43NTQgIGM3LjMwOCwwLDE1Ljg0Mi0yLjExNCwxNS44NDItOC4wNzJjMC4wNDctNS42OTEtMi44MTgtNy42OTctMTcuMDM1LTEyLjAwM2MtMTIuNTItMy43OTEtMzEuNDM5LTkuNTIxLTMxLjQzOS0zMS4zNjYgIGMwLTE2LjMyOCwxNC4xNC0yNy4yOTksMzUuMTg1LTI3LjI5OWM5LjM1OCwwLDE5LjU2MywyLjgzOSwyNi42MzEsNy40MDhjNC4zMjQsMi43OTYsNS41NjQsOC41NjcsMi43NjgsMTIuODkyICBjLTIuNzk1LDQuMzI1LTguNTY3LDUuNTY0LTEyLjg5MiwyLjc2OWMtNC4wMjYtMi42MDQtMTAuODE0LTQuNDIyLTE2LjUwNy00LjQyMmMtNy42MjksMC0xNi41MzgsMi4yNjctMTYuNTM4LDguNjUyICBjMCw2Ljk1OCw0LjA5OSw5LjI1LDE4LjE5NywxMy41MmMxMi4xMjUsMy42NzMsMzAuNDQ5LDkuMjIyLDMwLjI3OCwyOS45MjdDMjc1LjU5OSwxOTQuMjMyLDI2MS43MzksMjA0Ljk3LDI0MS4xMDksMjA0Ljk3eiIgZmlsbD0iIzU1NTc1OSIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
        height: 18px !important;
    }

    .mce-i-table_of_contents:before {
        content: "\e901"
    }
}

</style>
