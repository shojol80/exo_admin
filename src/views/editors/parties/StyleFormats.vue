<template>
    <div class="style-formats">
        <waiter ref="waiter" class="style-formats">
            <action-toolbar>
                <action-group class="mr-2">
                    <action-button
                        title="Save"
                        :icon="$icons.save"
                        @action="onActionSave"
                        shortkey="['ctrl', 's']">
                    </action-button>
                    <action-button
                        title="Reload"
                        :icon="$icons.reload"
                        @action="onActionReload">
                    </action-button>
                </action-group>
            </action-toolbar>
            <x-code-editor
                :full-height="true"
                ref="cm"
                :options="options"
                v-model="content"
            >
            </x-code-editor>
        </waiter>
    </div>
</template>

<script>
import editor from '@/services/api/editor'
import XCodeEditor from "@/components/XCodeEditor";


export default {
    name: 'StyleFormats',
    components: {
        XCodeEditor
    },
    data() {
        return {
            content: null,
            path: null,
            options: {
                mode: 'javascript',
            },
        }
    },
    computed: {},
    async mounted() {
        await this.load();
    },
    methods: {

        async load() {
            ({path: this.path, content: this.content} = await this.$refs.waiter.wait(editor.getStyleFormats()))
            this.$refs.cm.codemirror.refresh()
        },

        onActionSave() {
            try {
                JSON.parse(this.content)
                editor.saveStyleFormats({
                    path: this.path,
                    content: this.content,
                })
            } catch (e) {
                this.$awn.alert('Can`t parse formats file. Please check syntax.')
            }
        },
        onActionReload() {
            this.load()
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

.style-formats {
    background: $body-bg;
}
</style>
