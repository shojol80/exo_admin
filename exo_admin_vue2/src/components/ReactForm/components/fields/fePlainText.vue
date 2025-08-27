<template>
    <div class="fe-plain-text">
        <p v-html="fq.fq_info"></p>
    </div>
</template>

<script>

import inputs from './mixins/inputs'

export default {
    name: "fePlainText",
    mixins: [inputs],
}
</script>
