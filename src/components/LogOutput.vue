<template>
    <b-textarea readonly class="log-output" rows="20" :value="formatLog"></b-textarea>
</template>

<script>
import formatLog from '@modules/utils/formatLog'

export default {
    name: "LogOutput",
    props: {
        log: {
            required: true
        }
    },
    computed: {
        formatLog() {
            return formatLog(this.log)
        }
    }
}
</script>

<style scoped>

</style>
