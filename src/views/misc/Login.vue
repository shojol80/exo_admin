<template>
    <unsplash-backgroud class="center-position">
        <b-card
            v-show="state === 'LOGIN'"
            no-body
            class="p-3 animated fadeIn auth-card"
            img-src="/img/brand/logo.png"
            img-alt="ExologCMS"
        >
            <b-card-body>
                <waiter :show="isLoading">
                    <b-form>
                        <b-input-group class="mb-3" size="lg">
                            <b-input-group-prepend>
                                <b-input-group-text>
                                    <icon
                                        :icon="$icons.user"
                                        class="fa-fw"
                                    ></icon>
                                </b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input
                                type="text"
                                class="form-control"
                                placeholder="📧 Your Email Address"
                                ref="emailEl"
                                autocomplete="username email"
                                @keyup.native.enter="login"
                                :state="error ? false : null"
                                v-model="u_email"
                            ></b-form-input>
                        </b-input-group>
                        <b-input-group class="mb-3" size="lg">
                            <b-input-group-prepend>
                                <b-input-group-text>
                                    <icon
                                        icon="fas fa-key"
                                        class="fa-fw"
                                    ></icon>
                                </b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-invalid-feedback
                                id="inputLiveFeedback"
                                class="order-last"
                                v-if="error"
                                style="display: block"
                            >
                                <!-- This will only be shown if the preceeding input has an invalid state -->
                                {{ error }}
                            </b-form-invalid-feedback>
                            <b-form-input
                                type="password"
                                class="form-control"
                                placeholder="Password"
                                autocomplete="current-password"
                                :state="error ? false : null"
                                v-model="u_password"
                                @keyup.native.enter="login"
                            >
                            </b-form-input>
                        </b-input-group>
                        <b-input-group class="mb-4" size="md">
                            <b-form-checkbox v-model="remember"
                                >Remember me</b-form-checkbox
                            >
                        </b-input-group>

                        <b-row>
                            <b-col class="d-flex justify-content-between">
                                <b-button
                                    variant="link"
                                    class="px-0"
                                    @click="state = 'FORGOT_PASSWORD'"
                                >
                                    Forgot password?
                                </b-button>
                                <b-button
                                    variant="success"
                                    size="lg"
                                    class="btn-min"
                                    v-on:click="login"
                                    >🎯 Sign In (UPDATED)
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </waiter>
            </b-card-body>
        </b-card>
        <!---->
        <b-card
            v-show="state === '2FA'"
            no-body
            class="p-3 auth-card"
            img-src="/img/brand/logo.png"
            img-alt="ExologCMS"
        >
            <b-card-body>
                <waiter :show="isLoading">
                    <b-form @submit.prevent="">
                        <div class="mb-4">
                            <input-two-factor-auth-code
                                class="auth-card__code"
                                ref="inputCode"
                                v-model="gaCode"
                                :error="error"
                                @enter="login"
                            >
                            </input-two-factor-auth-code>
                            <b-button
                                variant="link"
                                class="px-0"
                                @click="lostCode"
                            >
                                Can't enter code?
                            </b-button>
                        </div>
                        <b-row>
                            <b-col class="d-flex justify-content-between">
                                <b-button
                                    variant="link"
                                    class="px-0"
                                    @click="goBack"
                                    >← Back
                                </b-button>

                                <b-button
                                    variant="primary"
                                    class="btn-min"
                                    @click="login"
                                    >Login
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </waiter>
            </b-card-body>
        </b-card>
        <!---->
        <b-card
            v-show="state === 'FORGOT_PASSWORD'"
            no-body
            class="p-3 animated fadeIn auth-card"
            img-src="/img/brand/logo.png"
            img-alt="ExologCMS"
        >
            <b-card-body>
                <waiter :show="isLoading">
                    <b-form>
                        <p class="text-muted">
                            Enter your email address and we will send you
                            instructions on how to reset your password.
                        </p>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text>
                                    <icon :icon="$icons.user"></icon>
                                </b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input
                                type="text"
                                class="form-control"
                                placeholder="Username"
                                autocomplete="username email"
                                v-model="u_email"
                            ></b-form-input>
                        </b-input-group>

                        <b-row>
                            <b-col class="d-flex justify-content-between">
                                <b-button
                                    variant="link"
                                    class="px-0"
                                    @click="state = 'LOGIN'"
                                    >Login page
                                </b-button>

                                <b-button
                                    variant="primary"
                                    class="btn-min"
                                    :disabled="u_email === ''"
                                    @click="resetPassword"
                                    >Reset password
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </waiter>
            </b-card-body>
        </b-card>
    </unsplash-backgroud>
</template>

<script>
import InputTwoFactorAuthCode from "@/components/InputTwoFactorAuthCode";
import UnsplashBackgroud from "@/components/UnsplashBackgroud";

export default {
    name: "Login",
    components: {
        UnsplashBackgroud,
        InputTwoFactorAuthCode,
    },
    data() {
        return {
            state: "LOGIN",
            gaCode: "",
            u_email: process.env.VUE_APP_LOGIN || "",
            u_password: process.env.VUE_APP_PASSWORD || "",
            remember: !!process.env.VUE_APP_PASSWORD,
        };
    },
    computed: {
        error() {
            return this.$store.state.auth.error;
        },
        isLoading() {
            return this.$store.getters["auth/status"] === "loading";
        },
    },
    mounted() {
        if (this.$route.params.redir) {
            this.$store.dispatch(
                "auth/saveRouteBeforeAuth",
                this.$route.params.redir
            );
        }
        this.$refs.emailEl.focus();
    },
    methods: {
        async login() {
            const { u_email, u_password, remember } = this;
            let gaCode = undefined;

            if (this.state === "2FA") gaCode = this.gaCode;

            if (this.state === "2FA" && !gaCode) {
                this.$store.commit("auth/error", "code is empty");
                return;
            }
            await this.$store.dispatch("auth/request", {
                u_email,
                u_password,
                gaCode,
                remember,
            });
            if (this.$store.getters["auth/status"] === "need_2fa") {
                this.state = "2FA";
                this.$nextTick(() => {
                    this.$refs.inputCode.focus();
                });
                return;
            }
            if (this.$store.getters["auth/status"] === "success") {
                exoEventBus.$emit("exolog-confirm-login");
                return this.$router.replace(this.$store.state.auth.from_path);
            }
        },
        resetPassword() {
            const { u_email } = this;
            this.$store.dispatch("auth/SendPasswordLink", u_email).then(() => {
                this.state = "LOGIN";
                this.$awn.success(
                    `The instruction has been sent to your email. Please check.`
                );
            });
        },
        lostCode() {
            this.$awn.info(
                'Please contact with administrator. <a href="mailto:info@exolog.nl?subject=Dealer two step verification">info@exolog.nl</a>'
            );
        },
        goBack() {
            this.state = "LOGIN";
            this.gaCode = "";
            this.$store.dispatch("auth/reset");
        },
    },
};
</script>
