import { i18n } from "@/plugins/i18n";
import { router } from "@/routes";
import "@/styles.css";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";

createApp(App)
  .use(createHead())
  .use(createPinia())
  .use(i18n)
  .use(router)
  .use(Toast, { bodyClassName: "font-kumbh-sans font-medium" })
  .mount("#app");
