<template>
    <app-screen>
        <div class="code-editor">
            <waiter ref="waiter">
                <action-toolbar>
                    <action-group class="mx-2">
                        <action-button
                            title="Save"
                            :icon="$icons.save"
                            @action="onActionSave()"
                            shortkey="['ctrl', 's']">
                        </action-button>
                    </action-group>

                </action-toolbar>
                <main class="">
                    <x-code-editor
                        :full-height="true"
                        ref="cm"
                        :options="options"
                        v-model="modelCode">
                    </x-code-editor>
                </main>
            </waiter>
        </div>
    </app-screen>
</template>

<script>
import XCodeEditor from "@/components/XCodeEditor"
import exoEventBus from "@modules/exoEventBus"

export default {
    name: 'CodeEditor',
    props: {
        'code': String,
        'mode': {
            type: String,
            default: 'htmlmixed'
        }
    },
    components: {
        XCodeEditor
    },

    data() {
        return {
            modelCode: '',
            options: {
                mode: 'htmlmixed',
            },
        }
    },

    watch: {
        code: {
            immediate: true,
            handler(newVal) {
                this.modelCode = newVal
            }
        },
        mode: {
            immediate: true,
            handler(newVal) {
                this.options.mode = newVal
            }
        }
    },
    mounted() {
    },

    methods: {
        onActionSave() {
            exoEventBus.$emit('exo-save-code', this.modelCode);
        },
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

</style>
