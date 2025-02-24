import { createPinia } from "pinia";
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./pages/Home.vue";
import { i18n } from "./plugins/i18n";
import { router } from "./routes";
import "./styles.css";

createApp(App)
  .use(createPinia())
  .use(i18n)
  .use(router)
  .use(Toast, { bodyClassName: "font-kumbh-sans font-medium" })
  .mount("#app");
