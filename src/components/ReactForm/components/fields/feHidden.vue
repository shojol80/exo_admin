<template>
    <ValidationProvider
        :name="fq.label"
        :rules="ruleObject"
        v-slot="{ errors, valid }"
        tag="div"
        class="fe-hidden">
        <input :id="id"
               v-model="value"
               type="hidden"
               :name="fq.fq_name"/>
    </ValidationProvider>
</template>

<script>

import inputs from './mixins/inputs'

export default {
    name: "feHidden",
    mixins: [inputs],
}
</script>

<style lang="scss">
.fe-hidden {
    display: none;
}
</style>
