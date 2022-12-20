import axios from "axios";
import nprogress from "nprogress";
import { useTeitterStore } from "@/stores/teitter";
const request = axios.create({
    baseURL: import.meta.env.DEV
        ? "/teitter/api"
        : "https://www.heron.love:8090/teitter/api",
    withCredentials: true,
    timeout: 3000,
});

request.interceptors.request.use(
    (config) => {
        nprogress.start();
        const store = useTeitterStore();
        store.option.requesting = true;
        return config;
    },
    (error) => {
        nprogress.done();
        const store = useTeitterStore();
        store.option.requesting = false;

        return Promise.reject(error);
    },
);
request.interceptors.response.use(
    (config) => {
        nprogress.done();
        const store = useTeitterStore();
        store.option.requesting = false;

        return config;
    },
    (error) => {
        nprogress.done();
        const store = useTeitterStore();
        store.option.requesting = false;

        return Promise.reject(error);
    },
);

export default request;
