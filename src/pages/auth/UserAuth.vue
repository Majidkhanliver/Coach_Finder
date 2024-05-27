<template>
        <div>
                <base-dialog :show="!!error" title="An error occured" @close="handleError">
                        <p>{{ error }}</p>
                </base-dialog>
                <base-dialog fixed :show="!!isLoading" title="Authenticating...">
                        <p>Authenticating</p>
                        <base-spinner></base-spinner>
                </base-dialog>
        </div>
        <base-card>
                <form @submit.prevent="submitForm">
                        <div class="form-control">
                                <label for="email">E-mail</label>
                                <input type="text" id="email" v-model.trim="email">
                        </div>
                        <div class="form-control">
                                <label for="password">Password</label>
                                <input type="text" id="password" v-model.trim="password">
                        </div>
                        <p v-if="!formIsValid">Please Enter Valid Email and password (must be 8 character long)</p>
                        <base-button>{{ submitButtonCaptions }}</base-button>
                        <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchButtonModeCaption
                                }}</base-button>
                </form>
        </base-card>
</template>
<script>
export default {
        data() {
                return {
                        email: '',
                        password: '',
                        formIsValid: true,
                        mode: 'Login',
                        isLoading: false,
                        error: null
                }
        },
        methods: {
                async submitForm() {
                        this.formIsValid = true;
                        if (this.email === "" || !this.email.includes('@') || this.password.length < 8) {
                                this.formIsValid = false;
                                return
                        }
                        try {

                                this.isLoading = true;
                                if (this.mode == "Signup") {
                                        await this.$store.dispatch('signup', { email: this.email, password: this.password })
                                } else {
                                        await this.$store.dispatch('login', { email: this.email, password: this.password })
                                }
                                let url = "/coaches"
                                debugger
                                if (this.$route.query.redirect)
                                {
                                        url = "/" + this.$route.query.redirect
                                }
                                this.$router.replace(url)
                        } catch (error) {
                                this.error = error.message || "Failed to authenticate try later!!"
                        }
                        this.isLoading = false;
                },
                switchAuthMode() {
                        if (this.mode === 'Login') {
                                this.mode = 'Signup'
                        } else {
                                this.mode = 'Login'
                        }
                },
                handleError() {
                        this.error = null;
                }
        },
       
        computed: {
                submitButtonCaptions() {
                        if (this.mode === "Login")
                                return "Login"
                        else
                                return "Signup"
                },
                switchButtonModeCaption() {
                        if (this.mode === "Login")
                                return "Signup Instead"
                        else
                                return "Login Instead"
                }
        }
}
</script>
<style scoped>
form {
        margin: 1rem;
        padding: 1rem;
}

.form-control {
        margin: 0.5rem 0;
}

label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
}

input,
textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        padding: 0.15rem;
}

input:focus,
textarea:focus {
        border-color: #3d008d;
        background-color: #faf6ff;
        outline: none;
}
</style>