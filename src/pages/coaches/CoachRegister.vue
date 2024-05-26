
<template>
         <section>
                <base-card>
                <h2>Register as a coach now!</h2>
                <coach-form @save-data="registerCoach"></coach-form>
                </base-card>
         </section>
</template>
<script>
import coachForm from '../../components/coaches/CoachForm.vue'
export default {
        data() {
                return {}
        },
        components: {
                coachForm     
        },
        methods: {
                registerCoach(formData) {
                        this.$store.dispatch('registerCoach', formData);
                        this.$router.replace('/')
                }
        }
}

 </script>
