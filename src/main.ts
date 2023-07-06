import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style/main.less";
import "animate.css";
import "nprogress/nprogress.css";
import networkErrorVue from "@/components/networkError.vue";
import { registerSW } from "virtual:pwa-register";
import { useRegisterSW } from "virtual:pwa-register/vue";
import { inject } from "@vercel/analytics";

inject();
// 自动更新
// registerSW({ immediate: true });

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("networkErrorVue", networkErrorVue);

app.mount("#app");
