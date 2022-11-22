import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { teitter } from "@/interfaces/pubInterface";
axios.defaults.withCredentials = true;

export const useTeitterStore = defineStore("teitter", () => {
    const isLoading = ref(false);
    const data = ref({
        isLogin: false,
        teitterCurrentPage: 1,

        userInfo: {
            nickName: "cuicuiV5",
            userName: "cuicuiv5",
            avatarUrl: "",
        },
        teitters: <unknown>[],
    });

    axios.defaults.baseURL = "http://117.78.0.131:8080";

    async function getTeitter() {
        // 发送请求时让isLoading为真, 防止发送重复请求
        isLoading.value = true;

        const res = await axios.get(
            `/teitter/getAllTweet/${data.value.teitterCurrentPage++}`,
        );
        console.log(res);

        //更新用户信息
        if (res.data.isLogin == true) {
            data.value.userInfo = res.data.userInfo;
            data.value.userInfo.avatarUrl =
                "http://117.78.0.131:8080" + res.data.userInfo.avatarUrl;
        }
        const resTeitters: Array<teitter> = res.data.data;

        // 追加到现有的数据中
        resTeitters.forEach((item) => {
            (data.value.teitters as teitter[]).push(item);
        });

        // 如果当前页码超过总页码. 那么就不加载了
        if (res.data.currentPageNum > res.data.totalPageNum) {
            console.log("没有更多了");

            isLoading.value = true;
        } else {
            isLoading.value = false;
        }
    }
    getTeitter();
    return { data, getTeitter, isLoading };
});
