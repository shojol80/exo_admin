<template>
    <base-widget class="execute-process"
                 title="Perform maintenance"
                 @execute.stop="execute">
        <div class="d-flex mt-3">
            <x-select
                class="flex-fill"
                valueFormat="object"
                :multiple="false"
                v-model="process"
                :options="processes"
                id-key="id"
                label-key="title">
            </x-select>
            <b-button class="ml-3" variant="primary" :disabled="!process" @click="execute">Execute</b-button>
        </div>
        <div class="execute-process__desc text-muted mt-3">
            {{ process ? process.description : '' }}
        </div>
        <aside-panel v-model="showAside">
            <waiter :show="loading">
                <log-output class="log-aside-output" :log="log"></log-output>
            </waiter>
        </aside-panel>
    </base-widget>

</template>

<script>

import Api from '@/services/api/Api'
import BaseWidget from "@/components/BaseWidget";
import LogOutput from "@/components/LogOutput";

export default {
    name: 'ExecuteProcess',
    components: {BaseWidget, LogOutput},
    props: ['processId'],
    data() {
        return {
            process: undefined,
            log: [],
            loading: false,
            showAside: false,
        }
    },
    computed: {
        processes() {
            return this.ECO.maintenance.processes
        }
    },
    watch: {
        processId() {
            this.setProcessById(this.processId)
        }
    },
    mounted() {
        if (this.processId) {
            this.setProcessById(this.processId)
        }
    },
    methods: {
        setProcessById(id) {

            this.process = this.processes.find(i => i.id === id)
        },
        async execute() {
            this.log = []
            let event
            if (this.process.dialogComponent) {
                event = await this.$dialogs.showComponent(this.process.dialogComponent)
            } else {
                event = await this.$dialogs.confirm({
                    okTitle: 'EXECUTE',
                    message: `Are you sure you want to execute "${this.process.title}" process?`
                })
            }

            if (event.trigger !== 'ok') return

            this.loading = true;
            this.showAside = true;
            try {
                let data = await Api.post(this.process.api, event.value);
                this.log = data.log
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.execute-process {
    &__desc {
        min-height: 50px;
        width: 80%;
    }
}

.log-aside-output.form-control {
    margin-top: 1rem;
    height: calc(100vh - #{$action-toolbar-height} - 2rem);
}

.mode-popup .aside-panel {
    .log-aside-output.form-control {
        height: calc(100vh - #{$action-toolbar-height} - #{$popup-header-height} - 2rem);
    }
}

</style>
