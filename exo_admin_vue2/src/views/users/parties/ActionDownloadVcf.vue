<template>
    <action-button :disabled="u_id==='new'"
                   title="Download vCard"
                   :icon="$icons.vcf"
                   @action="downdload">
        <iframe id="invisible" style="display:none;" :src="src"></iframe>
    </action-button>
</template>

<script>
import users from '@/services/api/users'

export default {
    name: 'ActionDownloadVcf',
    props: {
        u_id: {
            requared: true,
        }
    },
    data() {
        return {
            src: null,
            cache: 0,
        }
    },
    methods: {
        downdload() {
            this.cache++
            this.src = `/api/users/downloadUserVCF?u_id=${this.u_id}&cache=${this.cache}`
        }
    }
}
</script>

<style scoped>

</style>
