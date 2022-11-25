import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { teitter } from "@/interfaces/pubInterface";
axios.defaults.withCredentials = true;

export const useTeitterStore = defineStore("teitter", () => {
    const isLoading = ref(false);
    const data = ref({
        isLogin: false,
        teitterCount: -1, // 推文总数
        teitterCurrentPage: 1, // 当前是第几页的推文

        userInfo: {
            nickName: "",
            userName: "",
            avatarUrl: "",
        },
        teitters: <unknown>[],
    });

    // axios.defaults.baseURL = "https://www.heron.love:8090/teitter/api";

    async function getTeitter() {
        // 发送请求时让isLoading为真, 防止发送重复请求
        isLoading.value = true;

        const res = await axios.get(
            `/getAllTweet/${data.value.teitterCurrentPage++}`,
        );
        console.log(res);

        data.value.teitterCount = res.data.teitterCount;

        // 如果用户登录了, 那么设置信息
        if (res.data.isLogin == true) {
            data.value.isLogin = true;
            data.value.userInfo = res.data.userInfo;
            data.value.userInfo.avatarUrl =
                "https://www.heron.love:8888/" + res.data.userInfo.avatarUrl;
            data.value.userInfo.userName = "@" + res.data.userInfo.userName;
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
