import {
  type RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";
import Home from "./pages/Home.vue";

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
