import { i18nPlugin } from "@/plugins/i18n";
import "@/styles.css";
import { createApp } from "vue";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import { documentHeadPlugin } from "./plugins/document-head";
import { routerPlugin } from "./plugins/router";
import { storePlugin } from "./plugins/store";
import { toastOptions, toastPlugin } from "./plugins/toast";

createApp(App)
  .use(documentHeadPlugin)
  .use(i18nPlugin)
  .use(routerPlugin)
  .use(storePlugin)
  .use(toastPlugin, toastOptions)
  .mount("#app");
