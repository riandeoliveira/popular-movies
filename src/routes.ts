import Home from "@/pages/Home.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    component: Home,
  },
];
