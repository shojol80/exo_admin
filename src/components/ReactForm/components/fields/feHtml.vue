<template>
    <div class="fe-html" v-html="fq.fq_info">
    </div>
</template>

<script>

import inputs from './mixins/inputs'

export default {
    name: "feHtml",
    mixins: [inputs],
}
</script>

<style lang="scss">

</style>
