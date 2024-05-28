import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
// import CoachDetail from '@/pages/coaches/CoachDetail.vue';
// import CoachRegister from '@/pages/coaches/CoachRegister.vue';
import CoachesList from "@/pages/coaches/CoachesList.vue";
// import ContactCoach from '@/pages/requests/ContactCoach.vue';
// import RequestReceived from '@/pages/requests/RequestReceived.vue';
import NotFound from "@/pages/NotFound.vue";
// import UserAuth from '@/pages/auth/UserAuth.vue';
import store from "../store/index.js";
const CoachDetail = () => import("@/pages/coaches/CoachDetail.vue");
const CoachRegister = () => import("@/pages/coaches/CoachRegister.vue");
const ContactCoach = () => import("@/pages/requests/ContactCoach.vue");
const RequestReceived = () => import("@/pages/requests/RequestReceived.vue");
const UserAuth = () => import("@/pages/auth/UserAuth.vue");
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/coaches",
    },
    {
      path: "/coaches",
      component: CoachesList,
    },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [
        {
          path: "contact",
          component: ContactCoach,
        },
      ],
    },
    {
      path: "/register",
      component: CoachRegister,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestReceived,
      meta: { requiresAuth: true },
    },
    {
      path: "/auth",
      component: UserAuth,
      meta: { requiresUnAuth: true },
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
});
router.beforeEach(function (to, _, next) {
  debugger;
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  }
  if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});
export default router;
