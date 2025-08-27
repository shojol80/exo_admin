<template>
    <div class="x-code-editor"
         :class="{
            ['theme-'+cmOptions.theme]:true,
            'x-code-editor--disabled':disabled,
            'x-code-editor--full-height':fullHeight}">
        <div class="x-code-editor__top-panel">
            <action-group class="editor-actions">
                <action-button
                    v-if="cmOptions.toolbar['save']"
                    title="Save"
                    :icon="$icons.save"
                    @action="save"
                    shortkey="['ctrl', 's']">
                </action-button>
                <action-button title="Tidy"
                               :icon="$icons.format_text"
                               @action="autoFormatSelection"
                               shortkey="['ctrl', 'alt', 'l']">
                </action-button>
                <action-button title="line wrapping"
                               :icon="$icons.text_wrap"
                               @action="lineWrapping"
                               :active="cmOptions.lineWrapping"
                               shortkey="['ctrl', 'alt', 'w']">
                </action-button>
            </action-group>
            <div class="ml-auto x-code-editor__mode" style="width: 110px">
                <x-select v-model="cmOptions.mode"
                          class="sm"
                          :options="modes"
                          :clearable="false"
                          :searchable="false"
                          placeholder="Pick a mode"></x-select>
            </div>
        </div>
        <Codemirror
            ref="cm"
            v-bind="$attrs"
            :extensions="extensions"
            :style="{ height: '100%' }"
            @ready="handleReady">
        </Codemirror>
    </div>
</template>

<script>
import {merge} from 'lodash'
import { ref, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { xml } from '@codemirror/lang-xml'
import { oneDark } from '@codemirror/theme-one-dark'
import cmModeByFileName from '@/shared/cmModeByFileName'


export default {
    name: "XCodeEditor",
    components: {
        //MonacoEditor
        Codemirror
    },
    props: {
        options: Object,
        disabled: null,
        fullHeight: {
            type: Boolean,
            default: false
        },
        //will detect syntax by filename/extension
        filename: String
    },
    setup(props) {
        const view = shallowRef()

        const modes = [
            {id: 'php', label: 'php'},
            {id: 'javascript', label: 'javascript'},
            {id: 'json', label: 'json'},
            {id: 'xml', label: 'xml'},
            {id: 'text', label: 'text'},
            {id: 'css', label: 'css'},
            {id: 'sass', label: 'sass'},
            {id: 'htmlmixed', label: 'html'},
        ]

        // Create extensions for CodeMirror v6
        const extensions = ref([
            basicSetup,
            javascript(), // default language
            oneDark // theme
        ])

        const handleReady = (payload) => {
            view.value = payload.view
        }

        return {
            view,
            modes,
            extensions,
            handleReady
        }
    },
    data() {
        return {
            // Keep some legacy data for compatibility
            cmOptions: {
                toolbar: {
                    save: false
                },
                lineWrapping: false,
                mode: 'php',
                theme: 'zenburn',
                lineNumbers: true,
            },
        }
    },
    watch: {
        options: {
            immediate: true,
            deep: true,
            handler(newVal) {
                this.mergeOptions(newVal)
            }
        },
        filename: {
            immediate: true,
            handler(newVal) {
                if (!newVal) return
                this.cmOptions.mode = cmModeByFileName(newVal);
            }
        }
    },

    computed: {
        codemirror() {
            return this.view
        },
    },
    methods: {
        save() {
            this.$emit('save')
        },
        mergeOptions(options) {
            // For CodeMirror v6, we would need to reconfigure extensions
            // This is a simplified version for compatibility
            this.cmOptions = merge(this.cmOptions, options)
        },

        getSelectedRange() {
            if (!this.view) return null
            const selection = this.view.state.selection.main
            return {from: selection.from, to: selection.to}
        },

        autoFormatSelection() {
            // CodeMirror v6 formatting would require additional extensions
            // This is a placeholder for compatibility
            console.warn('autoFormatSelection not implemented for CodeMirror v6')
        },

        lineWrapping() {
            // CodeMirror v6 line wrapping would require reconfiguring extensions
            console.warn('lineWrapping not implemented for CodeMirror v6')
        },

        markClean() {
            // CodeMirror v6 uses different change tracking
            console.warn('markClean not implemented for CodeMirror v6')
            return true
        },

        isClean() {
            // CodeMirror v6 uses different change tracking
            console.warn('isClean not implemented for CodeMirror v6')
            return true
        },

        refresh() {
            if (this.view) {
                this.view.requestMeasure()
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.x-code-editor {
    position: relative;
    height: 100%;
    overflow: auto;
    width: 100%;
    font-size: 15px;

    &__top-panel {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 3;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    &__mode {
        .vue-treeselect__control {
            min-height: 24px;
            text-align: center;

            .vue-treeselect__single-value {
                line-height: 23px;
            }

            .vue-treeselect__input-container {
                min-height: 24px;
            }
        }
    }


    .vue-codemirror {
        padding-top: 36px;
        height: 100%;
    }

    &--disabled {
        opacity: 0.7;
        pointer-events: none;
    }

    &--full-height {
        height: calc(100vh - #{$app-header-height} - #{$action-toolbar-height});
        padding-bottom: 1rem;
    }
}

.mode-popup .x-code-editor {
    &--full-height {
        height: calc(100vh - #{$popup-header-height} - #{$action-toolbar-height});
    }
}


.editor-actions {

}

.CodeMirror {
    height: 100%;
}

.cm-s-darcula span.cm-tag {
    text-decoration: none;
}

.theme-zenburn {
    .x-code-editor__top-panel {
        background-color: $exo-gray;
        border-bottom: 1px solid #333;
    }

    .x-code-editor__mode {
        .vue-treeselect__control {
            border-color: #999;
            color: #999;
            background-color: $exo-gray;

            .vue-treeselect__single-value {

                color: #999;
            }
        }
    }

    .CodeMirror-gutters {
        border: none;
    }

    .action-button {
        color: #999;

        &--active,
        &:hover {
            color: $white;
        }
    }

    .vue-codemirror {
        background-color: $exo-gray;
    }

    .cm-s-zenburn {
        background-color: $exo-gray;
    }

    .CodeMirror-simplescroll-horizontal, .CodeMirror-simplescroll-vertical {
        background-color: $exo-gray;
    }

    .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
        background-color: $exo-gray;
    }

    .CodeMirror-simplescroll-horizontal div, .CodeMirror-simplescroll-vertical div {
        opacity: 0.6;
    }

}

</style>
