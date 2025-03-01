import { routes } from "@/routes";
import { createRouter, createWebHistory } from "vue-router";

export const routerPlugin = createRouter({
  history: createWebHistory(),
  routes,
});
