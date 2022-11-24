import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "../public/main.less";
import "animate.css";
import axios from "axios";
// axios.defaults.baseURL = "https://www.heron.love:8090/teitter/api";
axios.defaults.baseURL = "/teitter/api";
axios.defaults.withCredentials = true;

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
