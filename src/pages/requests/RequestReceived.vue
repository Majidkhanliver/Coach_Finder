<template>
        <base-dialog :show="!!error" title="An Error Occurred!!" @close="handleError">
                <p>{{ error }}</p>
        </base-dialog>
        <section>
                <base-card>
                        <header>
                                <h2>Requests Received</h2>
                        </header>
                        <div v-if="isLoading">
                                <base-spinner></base-spinner>
                        </div>
                        <ul v-else-if="hasRequests">
                                <requests-item v-for="request in receivedRequests" :key="request.id"
                                        :email="request.userEmail" :message="request.message"></requests-item>
                        </ul>
                        <h3 v-else>You haven't received any requests yet</h3>
                </base-card>
        </section>
</template>
<script>
import RequestsItem from '../../components/requests/RequestItem.vue'
export default {
        data() {
                return {
                        isLoading: false,
                        error: null,
          }      
        },
        components: {
                RequestsItem
        },
        computed: {
                receivedRequests() {
                        console.log(this.$store.getters['requests/requests'])
                        return this.$store.getters['requests/requests']
                },
                hasRequests() {
                       return !this.isLoading && this.$store.getters['requests/hasRequests']
                },
                
        },
        methods: {
                async loadRequests() {
                try {
                        this.isLoading = true;
                        this.$store.dispatch('fetchRequests')
                } catch (error) {
                        this.error= error.message || 'Something Went Wrong!!'
                        }
                        this.isLoading = false;

                },
                handleError(){
                        this.error = null
                }
        },
        created() {
                this.loadRequests();
        }
}
</script>
<style scoped>
header {
        text-align: center;
}

ul {
        list-style: none;
        margin: 2rem auto;
        padding: 0;
        max-width: 30rem;
}

h3 {
        text-align: center;
}
</style>