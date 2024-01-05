import axios from "axios";
import nprogress from "nprogress";
import { useTeitterStore } from "@/stores/teitter";
import jsonbig from "json-bigint";
const request = axios.create({
    baseURL: import.meta.env.DEV
        ? "/teitter/v2/api"
        : // : "https://www.heron.love:8070/teitter/v2/api",
          "https://teitter.heron.ltd:8070/teitter/v2/api",
    withCredentials: true,
    timeout: 15000,
    transformResponse: data => {
        return jsonbig.parse(data);
    },
    // headers:{
    //     Authorization: localStorage.getItem("token"),
    // }
});

request.interceptors.request.use(
    config => {
        // 添加header
        if (localStorage.getItem("token")) {
            if (config.headers) {
                config.headers.Authorization = localStorage.getItem("token");
            }
        }

        nprogress.start();
        const store = useTeitterStore();
        store.option.requesting = true;
        return config;
    },
    error => {
        nprogress.done();
        const store = useTeitterStore();
        store.option.requesting = false;

        return Promise.reject(error);
    },
);
request.interceptors.response.use(
    config => {
        nprogress.done();
        const store = useTeitterStore();
        store.option.requesting = false;

        return config;
    },
    error => {
        nprogress.done();
        const store = useTeitterStore();
        store.option.requesting = false;

        return Promise.reject(error);
    },
);

export default request;
