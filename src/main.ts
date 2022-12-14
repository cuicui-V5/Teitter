import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./style/main.less";
import "animate.css";
import "nprogress/nprogress.css";
import networkErrorVue from "@/components/networkError.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("networkErrorVue", networkErrorVue);

app.mount("#app");
