import Home from "@/pages/Home.vue";
import type { RouteRecordRaw } from "vue-router";
import NotFound from "./pages/NotFound.vue";

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];
