import { createStore } from 'vuex'
import coachesModule from './modules/coaches/index'
import requestsModule from "./modules/requests/index";
const store = createStore({
  namespaced: true,
  state() {
    return {
      userId:'c3'
    }
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  },
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
  },
});
export default store;