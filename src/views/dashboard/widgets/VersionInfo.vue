<template>
    <b-card class="widget">
        <div class="mb-4 d-flex justify-content-between">
            <p v-if="state==='loading'" class="mb-0 mr-3 font-weight-bold">loading</p>
            <p v-else-if="state==='ready' && isVersionUnknown" class="mb-0 mr-3 text-danger font-weight-bold">
                Failed to get update information.
            </p>
            <p v-else-if="state==='ready' && isLastVersion" class="mb-0 mr-3 text-success font-weight-bold"></p>
            <p v-else-if="state==='ready' && !isLastVersion" class="mb-0 mr-3 text-warning font-weight-bold">
                <icon icon="fas fa-exclamation-circle" class="mr-1"></icon>
                A new version is available.
            </p>
            <p v-else-if="state==='error'" class="mb-0 mr-3 text-danger font-weight-bold">{{message}}</p>
            <div class="h1 mb-0 text-muted">
                <icon :icon="$icons.app_version" class="icon-info"></icon>
            </div>
        </div>
        <div class="h4 mb-0">{{verInfo.version.COMMIT_REF_NAME}} - {{verInfo.version.COMMIT_SHORT_SHA}}
        </div>
        <small class="text-muted text-uppercase font-weight-bold">Version</small>
    </b-card>
</template>

<script>
import exoadmin from '@/services/api/exoadmin'
import isEmpty from '@modules/isEmpty'

export default {
    name: "VersionInfo",
    data() {
        return {
            state: 'loading',
            verInfo: {
                last_version: {
                    COMMIT_SHORT_SHA: ''
                },
                version: {
                    COMMIT_REF_NAME: '',
                    COMMIT_SHORT_SHA: ''
                }
            },
        }
    },
    computed: {
        isLastVersion() {
            return this.verInfo.version.COMMIT_SHORT_SHA === this.verInfo.last_version.COMMIT_SHORT_SHA
        },
        isVersionUnknown() {
            return isEmpty(this.verInfo.last_version.COMMIT_SHORT_SHA)
        }
    },
    async mounted() {
        this.state = 'loading'
        try {
            this.verInfo = await exoadmin.getVersion()
            this.state = 'ready'
        } catch (e) {
            console.error(e)
            this.message = e.message
            this.state = 'error'
        }

    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

.widget {
    border-color: $border-color; //$exo-gray-line;
}
</style>
