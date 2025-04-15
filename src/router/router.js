import { createRouter, createWebHistory } from "vue-router";
import AuthComponent from "../components/AuthComponent.vue";
import DealList from "../components/DealList.vue";

const routes = [
  {
    path: "/",
    name: "Auth",
    component: AuthComponent,
  },
  {
    path: "/deals",
    name: "Deals",
    component: DealList,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
