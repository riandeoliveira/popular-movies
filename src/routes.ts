import Home from "@/pages/Home.vue";
import {
  type RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    component: Home,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
