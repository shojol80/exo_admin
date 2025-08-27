<template>
    <b-form-group>
        <p class="text-muted">
            Enter code that you see in the app
        </p>
        <b-input-group label="asda">
            <b-input-group-prepend>
                <b-input-group-text>6 digit code</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="text" class="form-control"
                          placeholder=""
                          ref="codeEl"
                          :state="error?false:null"
                          @keyup.native.enter="$emit('enter')"
                          :value="gaCode"
                          @input="$emit('input', $event)">
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedbackCode">
                {{error}}
            </b-form-invalid-feedback>
        </b-input-group>
    </b-form-group>
</template>

<script>

export default {
    name: "InputTwoFactorAuthCode",
    model: {
        prop: 'gaCode',
        event: 'input'
    },
    props: {
        error: '',
        gaCode: '',
    },
    data() {
        return {}
    },
    mounted() {

    },
    methods: {
        focus() {
            let me = this;
            me.$nextTick(() => {
                me.$refs.codeEl.focus()
            })
        }
    }
}
</script>

<style scoped>

</style>
