<template>
        <base-dialog :show="!!error" title="An Error Occurred!!" @close="handleError">
                <p>{{ error }}</p>
        </base-dialog>

        <section>
                <coach-Filter @change-filter="setFilters"></coach-Filter>
        </section>
        <section>
                <base-card>
                        <div class="controls">
                                <base-button mode="outline"
                                        @click="loadCoaches(forceRefresh=true)">Refresh</base-button>
                                <base-button link to="/auth?redirect=register" v-if="!isAuthenticated">Login to register
                                        as coach</base-button>
                                <base-button link to="/register" v-if="!isLoading && isAuthenticated">Register as
                                        Coach</base-button>
                        </div>
                        <div v-if="isLoading">
                                <base-spinner></base-spinner>
                        </div>
                        <ul v-else-if="hasCoaches">
                                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id"
                                        :firstName="coach.firstName" :lastName="coach.lastName" :rate="coach.hourlyRate"
                                        :areas="coach.areas">
                                </coach-item>
                        </ul>
                        <h3 v-else> No Coaches Found </h3>
                </base-card>
        </section>
</template>
<script>
import coachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'
export default {
        data() {
                return {
                        activeFilters: {
                                frontend: true,
                                backend: true,
                                career:true,
                        },
                        error:null,
                        isLoading:false
                }
        },
        components: {
                coachItem,
                CoachFilter
        },
        computed: {
                filteredCoaches() {
                        const coaches =   this.$store.getters['coaches'];
                        const activeFilters = this.activeFilters;

                        return coaches.filter(coach => {
                                return (activeFilters.frontend && coach.areas.includes('frontend')) ||
                                        (activeFilters.backend && coach.areas.includes('backend')) ||
                                        (activeFilters.career && coach.areas.includes('career'));
                        });;
                },
                hasCoaches() {
                        return !this.isLoading && this.$store.getters['hasCoaches']
                },
                isAuthenticated() {
                        return this.$store.getters.isAuthenticated;
                }
        },
        created() {
                this.loadCoaches();
        },
        methods: {
                setFilters(updatedFilters) {
                        this.activeFilters= updatedFilters
                },
                async loadCoaches(forceRefresh=false) {
                        try {
                        this.isLoading= true
                                await this.$store.dispatch('loadCoaches', { forceRefresh: forceRefresh });
                                
                        } catch (error) {
                                this.error = error.message || 'Something Went wrong'
                        }
                        this.isLoading = false


                },
                handleError() {
                        this.error= null
                }
        }
}
</script>
<style scoped>
ul {
        list-style: none;
        margin: 0;
        padding: 0;
}

.controls {
        display: flex;
        justify-content: space-between;
}
</style>