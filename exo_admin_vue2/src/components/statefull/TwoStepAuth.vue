<template>
    <b-card-group class="two-step-auth">
        <b-card no-body
                footer-bg-variant="success"
                class="animated fadeIn">

            <b-card-header v-show="!hideHeader">
                <h2 class="text-primary mb-0">Set up Authenticator</h2>
            </b-card-header>

            <b-card-body v-show="step===1">
                <div v-if="!showCode">
                    <ol class="text-dark">
                        <li>
                            Get the Authenticator App from the Play Store.
                            <div class="d-flex flex-row align-items-center">
                                <div class="exo-2FA-steps__link-android">
                                    <a href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
                                    >
                                        <img
                                            style="display:inline-block;width:150px;"
                                            alt='Get it on Google Play'
                                            src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a>

                                </div>
                                <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8"
                                   style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/assets/shared/badges/en-us/appstore-lrg.svg) no-repeat;width:135px;height:40px;background-size:contain;"></a>
                            </div>

                        </li>
                        <li> In the App select Set up account.
                        </li>
                        <li> Choose Scan a barcode.
                        </li>
                    </ol>
                    <div class="text-center mb-4 mt-4">
                        <vue-qrcode v-if="barcode" :value="barcode" :options="{ width: 200 , color:{dark:'#00919c'}}"></vue-qrcode>
                    </div>
                    <div class="text-center">
                        <a href="#" @click.prevent="showCode=true">Can't scan it? or want backup code?</a>
                    </div>
                </div>

                <div v-else>
                    <ol class="text-dark">
                        <li>Tap Menu, then Set up account.</li>
                        <li>Tap Enter provided key.</li>
                        <li>Enter your email address and this key:
                            <b-alert show variant="dark" class="mt-3">{{secretCode}}</b-alert>
                        </li>
                        <li>Make sure Time based is turned on, and tap Add to finish.</li>
                    </ol>
                    <div class="text-center">
                        <a href="#" @click.prevent="showCode=false">Show QR code</a>
                    </div>
                </div>

            </b-card-body>

            <b-card-body v-show="step===2">
                <waiter ref="step2waiter">
                    <div>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text>6-digit code</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input type="text" class="form-control"
                                          placeholder="Enter code that you see in the app"
                                          ref="input"
                                          :state="(gaCodeState && !verifyError)?null:false"
                                          @input="verifyError=''"
                                          @keyup.enter="verify"
                                          v-model="ga_code"></b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">
                                {{verifyError}}
                            </b-form-invalid-feedback>
                        </b-input-group>
                    </div>
                </waiter>


            </b-card-body>

            <b-card-body v-show="step===3">
                <b-alert variant="success" show>
                    <h4 class="text-center mb-0">2-Step Verification turned on</h4>
                </b-alert>
            </b-card-body>

            <b-card-footer
                footer-bg-variant="light"
                class="text-right">
                <b-button variant="light" v-show="step>1 && step<3"
                          class="px-4 mx-1 btn-min"
                          @click="step--">BACK
                </b-button>
                <b-button variant="primary" v-show="step<2"
                          class="px-4 mx-1 btn-min"
                          @click="step++">NEXT
                </b-button>
                <b-button variant="primary" v-show="step===2"
                          class="px-4 mx-1 btn-min"
                          @click="verify"
                          :disabled=!gaCodeState>VERIFY
                </b-button>
                <b-button variant="primary" v-show="step===3"
                          class="px-4 mx-1 btn-min"
                          @click="onClose">DONE
                </b-button>
            </b-card-footer>
        </b-card>
    </b-card-group>
</template>

<script>
import auth from '@/services/api/auth'
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
    name: "TwoStepAuth",
    components: {VueQrcode},
    props: {
        u_id: {
            default: undefined
        },
        hideHeader: {
            default: false
        }
    },
    data() {
        return {
            step: 1,
            barcode: '',
            secretCode: '',
            showCode: false,
            ga_code: '',
            verifyError: ''
        }
    },
    watch: {
        step(newVal, oldVal) {
            if (newVal === 2) {
                this.ga_code = ''
                this.$nextTick(() => {
                    this.$refs.input.focus()
                })
            }
        }
    },
    computed: {
        gaCodeState() {
            return this.ga_code.length === 6 ? true : this.ga_code.length === 0 ? null : false
        },
        error() {
            return this.$store.state.auth.error
        }
    },
    methods: {
        verify() {
            if (!this.gaCodeState) return
            this.verifyError = ''
            this.$refs.step2waiter.wait(
                auth.enable2FA({
                    u_id: this.u_id,
                    ga_code: this.ga_code
                }).then(() => {
                    this.step++
                }).catch(error => {
                    if (error.data && error.data.error) {
                        this.verifyError = error.data.error
                    } else {
                        throw error;
                    }
                })
            )

        },
        onClose() {
            this.$emit('done')
        }
    },
    mounted() {
        auth.create2FA({
            u_id: this.u_id
        }).then(result => {
            this.barcode = result.barcode
            this.secretCode = result.code
        })
    }
}
</script>

<style scoped lang="scss">
.two-step-auth {
    .card-body {
        min-height: 400px;
    }
}
</style>
