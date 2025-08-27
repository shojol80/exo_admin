<template>
    <unsplash-backgroud class="center-position">
        <b-card
            no-body class="p-3 animated fadeIn auth-card"
            img-src="/exo_admin/img/brand/logo.png"
            img-alt="ExologCMS">
            <b-card-body>
                <b-form>
                    <b-form-group v-show="state==='INPUT-PASSWORD'">
                        <p class="text-muted">Enter new password.</p>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text>
                                    <icon icon="fas fa-key" class="fa-fw"></icon>
                                </b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input type="password"
                                          class="form-control"
                                          ref="passwordEl"
                                          placeholder="Password"
                                          :state="passwordError?false:null"
                                          v-model="password">
                            </b-form-input>
                            <b-form-invalid-feedback id="inputPasswordFeedback">
                                <!-- This will only be shown if the preceeding input has an invalid state -->
                                {{passwordError}}
                            </b-form-invalid-feedback>
                        </b-input-group>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text><icon icon="fas fa-key" class="fa-fw"></icon></b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input type="password"
                                          class="form-control"
                                          placeholder="Confirm password"
                                          :state="passwordConfirmError?false:null"
                                          v-model="passwordConfirm"
                                          @keyup.native.enter="changePassword">
                            </b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">
                                <!-- This will only be shown if the preceeding input has an invalid state -->
                                {{passwordConfirmError}}
                            </b-form-invalid-feedback>
                        </b-input-group>
                    </b-form-group>
                    <b-row>
                        <b-col class="d-flex justify-content-between">
                            <b-button variant="link" class="px-0"
                                      @click="goLogin">
                                Login
                            </b-button>
                            <b-button variant="primary"
                                      class="btn-min"
                                      :disabled="!canChangePassword"
                                      @click="changePassword">Change password
                            </b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-card-body>
        </b-card>
    </unsplash-backgroud>
</template>

<script>
import {R_LOGIN} from '@/router/routs'
import UnsplashBackgroud from '@/components/UnsplashBackgroud'
import store from '@/store'


export default {
    name: 'ChangePassword',
    components: {
        UnsplashBackgroud
    },
    data() {
        return {
            state: 'INPUT-PASSWORD',
            password: '',
            passwordConfirm: '',
            error2FA: '',
        }
    },
    computed: {
        passwordError() {
            if (this.password.length === 0) {
                return ''
            }
            if (this.password.length < 6) {
                return 'The minimum password length is 6 characters.'
            }
            return ''

        },
        passwordConfirmError() {
            if (this.password !== this.passwordConfirm && this.passwordConfirm.length > 0) {
                return 'Passwords do not match.'
            }
            return ''
        },
        canChangePassword() {
            return this.passwordError === '' && this.passwordConfirmError === '' && this.password.length > 0 && this.passwordConfirm.length > 0
        }
    },
    mounted() {
        this.$refs.passwordEl.focus()

    },
    methods: {
        changePassword() {
            if (!this.canChangePassword) return

            let me = this;
            let hash = me.$route.query.hash;
            if (!hash) {
                me.$awn.alert('Incorrect password change link!')
                return;
            }

            const {password} = this
            this.$store.dispatch('auth/changePassword', {hash, password}).then((result) => {
                me.$awn.success('The password has been changed successfully. Please login.')
                me.$router.push({name: R_LOGIN});

            })
        },

        goLogin() {
            if (this.$store.getters['auth/status'] === 'success') {
                this.$store.dispatch('auth/logout').then(() => {
                    this.$router.push({name: R_LOGIN})
                })
            } else {
                this.$router.push({name: R_LOGIN})
            }

        }
    }

}
</script>
<style lang="scss" scoped>

</style>
