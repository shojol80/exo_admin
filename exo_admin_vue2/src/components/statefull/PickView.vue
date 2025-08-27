<template>
    <div class="pick-view">
        <waiter ref="waiter">
            <action-toolbar>
                <action-group class="mr-2">
                    <action-button
                        @action="onActionSelect()"
                        title="Use this view"
                        :icon="$icons.confirm">
                    </action-button>
                </action-group>
                <select-view
                    class="pick-view__select"
                    @input="onChangeView"
                    :path="path"
                    :clearable="false"
                    :value="view_val"/>
                <action-group class="mx-2">
                    <action-button
                        :disabled="!view_val"
                        title="Save"
                        :icon="$icons.save"
                        @action="onActionSave()"
                        shortkey="['ctrl', 's']">
                    </action-button>
                    <action-button
                        :disabled="!view_val"
                        @action="onActionDelete()"
                        title="Delete"
                        :icon="$icons.delete">
                    </action-button>
                    <action-button
                        @action="onActionNew()"
                        title="New"
                        :icon="$icons.new"
                        shortkey="['ctrl', 'o']">
                    </action-button>
                </action-group>
            </action-toolbar>
            <x-code-editor
                :full-height="false"
                ref="cm"
                :options="options"
                v-model="file.content">
            </x-code-editor>
        </waiter>
    </div>
</template>

<script>
import isEmpty from '@modules/isEmpty'
import XCodeEditor from '@/components/XCodeEditor'
import viewToPath from '@/shared/viewToPath'
import filemanager from '@/services/api/filemanager'
import getFilenamePath from '@/shared/getFilenamePath'
import getFilename from '@/shared/getFilename'

export default {
    name: 'PickView',
    props: {
        view: {type: String},
        path: {
            type: String,
            default: ''
        }
    },
    components: {
        XCodeEditor
    },
    data() {
        return {
            view_val: this.view,
            file: {
                content: ''
            },
            options: {
                mode: 'php',
            },
        }
    },

    computed: {
        viewPath() {
            if (isEmpty(this.view_val)) return undefined
            return viewToPath(this.normalizePath(this.view_val));
        },
        canonicalPath() {
            return this.path.replace(/\./g, '/');
        }
    },

    watch: {
        view(newVal) {
            this.view_val = newVal
            this.load()
        },
    },

    mounted() {
        this.load()
    },

    methods: {
        onChangeView(value) {
            this.view_val = value
            this.load()
        },

        onActionSave() {
            this.save()
        },

        normalizePath(view) {
            if (isEmpty(this.path)) return view
            return (this.path + '.' + view)
        },

        async onActionNew() {
            let response = await this.$dialogs.prompt({
                message: 'Enter name:',
                required: true,
            })
            if (response.trigger !== 'ok') return
            let name = response.value;

            let viewname
            if (name.endsWith('.blade.php')) {
                viewname = name.replace('.blade.php', '')
            } else {
                viewname = name
                name = name + '.blade.php';
            }
            await filemanager.createFile({
                    disk: 'site',
                    path: 'resources/views/' + this.canonicalPath,
                    name: name
                }
            )
            this.view_val = viewname
            this.file.content = `@props(['unit', 'holder','params'])`
            await this.save()
            await this.load()
        },

        async onActionDelete() {
            let response = await this.$dialogs.confirmDelete({
                title: 'Delete view',
                message: `Are you sure want to delete view <b>"${this.view_val}"</b>?`
            })
            if (response.trigger !== 'ok') return

            await filemanager.delete({
                    disk: 'site',
                    items: [{
                        path: this.viewPath,
                        type: "file"
                    }]
                }
            )
            await this.load()
            this.view_val = undefined
        },

        async onActionSelect() {
            if (this.view_val && !this.$refs.cm.isClean()) {
                let response = await this.$dialogs.confirm({
                    message: `You have unsaved changes in the view <b>"${this.view_val}"</b>. Do you want to save changes?`,
                    cancelTitle: 'DISCARD AND CONTINUE',
                    okTitle: 'SAVE AND CONTINUE',
                })
                if (response.trigger === 'ok') {
                    await this.save()
                } else {
                    await this.load()
                }
            }
            this.$emit('select', this.view_val)
        },

        async load() {
            if (isEmpty(this.viewPath)) {
                this.file.content = ''
                return
            }
            this.file.content = await filemanager.getFile({disk: 'site', path: this.viewPath})
            this.$nextTick(_ => this.$refs.cm.markClean())
        },
        async save() {
            const formData = new FormData();
            formData.append('disk', 'site')
            formData.append('path', getFilenamePath(this.viewPath))
            formData.append('file', new Blob([this.file.content]), getFilename(this.viewPath))
            await filemanager.updateFile(formData)
            this.$refs.cm.markClean()
        },
        refresh() {
            if (this.$refs.cm) this.$refs.cm.refresh()
        }

    }
}
</script>

<style lang="scss">

@import "src/assets/scss/vue-component";

.pick-view {
    &__select {
        min-width: 300px;
        max-width: 400px;
    }

    .x-code-editor {
        height: calc(100vh - #{$action-toolbar-height} - 1rem);
    }
}

.mode-popup .pick-view {
    .x-code-editor {
        height: calc(100vh - #{$action-toolbar-height} - #{$popup-header-height} - 2rem);
    }
}

</style>
