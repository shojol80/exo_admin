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
        <codemirror
            ref="cm"
            v-bind="$attrs"
            v-on="$listeners"
            :options="cmOptions">
            <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData"/>
            </template>
        </codemirror>
    </div>
</template>

<script>
import {merge} from 'lodash'
//  import MonacoEditor from 'vue-monaco'
import {codemirror, CodeMirror} from 'vue-codemirror'
// require styles
import 'codemirror/lib/codemirror.css'
// languages
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/sass/sass.js'
// theme css
//import 'codemirror/theme/darcula.css'
//import 'codemirror/theme/idea.css'
//import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/zenburn.css'
//addon
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'

import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/matchbrackets'

import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/xml-fold.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/comment-fold.js'

import 'codemirror/addon/display/panel.js'

import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'

import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/addon/search/jump-to-line.js'

import 'codemirror-formatting/formatting'
import emmet from '@emmetio/codemirror-plugin';
import cmModeByFileName from '@/shared/cmModeByFileName'


export default {
    name: "XCodeEditor",
    components: {
        //MonacoEditor
        codemirror
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
    data() {
        return {
            modes: [
                {id: 'php', label: 'php'},
                {id: 'javascript', label: 'javascript'},
                {id: 'json', label: 'json'},
                {id: 'xml', label: 'xml'},
                {id: 'text', label: 'text'},
                {id: 'css', label: 'css'},
                {id: 'sass', label: 'sass'},
                {id: 'htmlmixed', label: 'html'},
            ],

            cmOptions: {
                toolbar: {
                    save: false
                },
                lineWrapping: false,
                // codemirror options
                tabSize: 4,
                indentUnit: 4,
                mode: 'php',
                //theme: 'ambiance',
                //theme: 'darcula',
                theme: 'zenburn',
                lineNumbers: true,
                line: true,
                height: 'dynamic',
                scrollbarStyle: 'simple',
                autoCloseBrackets: true,
                matchBrackets: true,
                //fullScreen:true,
                markTagPairs: true,
                // Enable tag auto-rename (enabled by default).
                // Requires `markTagPairs` to be enabled
                autoRenameTags: true,
                extraKeys: {
                    'Ctrl-S': this.save,
                    'Ctrl-Q': function (cm) {
                        cm.foldCode(cm.getCursor());
                    },
                    'Tab': 'emmetExpandAbbreviation',
                    'Enter': 'emmetInsertLineBreak',
                    'Ctrl-Space': 'autocomplete'
                },
                foldGutter: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
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
            return this.$refs.cm.codemirror
        },

    },
    mounted() {
        // Register emmet extension on CodeMirror constructor
        emmet(CodeMirror);
    },
    methods: {
        save() {
            this.$emit('save')
        },
        mergeOptions(options) {
            this.$set(this, 'cmOptions', merge(this.cmOptions, options))
        },

        getSelectedRange() {
            return {from: this.codemirror.getCursor(true), to: this.codemirror.getCursor(false)};
        },

        autoFormatSelection() {
            let range = {
                from: {
                    ch: 0,
                    line: 0
                },
                to: {
                    ch: this.codemirror.doc.getLine(this.codemirror.doc.lastLine()).length,
                    line: this.codemirror.doc.lastLine()
                },
                resetSelection: true,
            };
            if (this.codemirror.doc.somethingSelected()) {
                range = this.getSelectedRange()
                range.resetSelection = false
            }
            this.codemirror.autoFormatRange(range.from, range.to);
            if (range.resetSelection) this.codemirror.doc.setCursor(0, 0)
        },

        lineWrapping() {
            this.cmOptions.lineWrapping = !this.codemirror.getOption('lineWrapping')
            this.codemirror.setOption('lineWrapping', this.cmOptions.lineWrapping)
        },

        markClean() {
            return this.codemirror.doc.markClean()
        },

        isClean() {
            return this.codemirror.doc.isClean()
        },
        refresh() {
            this.codemirror.refresh()
        }

    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

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
