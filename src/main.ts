import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "../public/main.less";
import "animate.css";
import axios from "axios";
axios.defaults.baseURL = "https://www.heron.love:8090/teitter/api"; // 开发环境
// axios.defaults.baseURL = "/teitter/api"; //测试环境
axios.defaults.withCredentials = true;
axios.defaults.timeout = 2000;
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
