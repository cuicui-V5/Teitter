import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { teitter, userInfo } from "@/interfaces/pubInterface";
axios.defaults.withCredentials = true;

export const useTeitterStore = defineStore("teitter", () => {
    // const isLoading = ref(false);
    // const data = ref({
    //     isLogin: false,
    //     teitterCount: -1, // 推文总数
    //     teitterCurrentPage: 1, // 当前是第几页的推文

    //     userInfo: {
    //         nickName: "",
    //         userName: "",
    //         avatarUrl: "",
    //     },
    //     teitters: <unknown>[],
    // });

    const teitters = ref<teitter[]>([]);
    const userInfo = ref<userInfo>({
        isLogin: false,
    });

    const option = ref({
        isLoading: false,
        teitterCount: -1,
    });
    let teitterCurrentPage = 1;

    // axios.defaults.baseURL = "https://www.heron.love:8090/teitter/api";

    async function getTeitter() {
        // 发送请求时让isLoading为真, 防止发送重复请求
        option.value.isLoading = true;

        const { data: resData } = await axios.get(
            `/getAllTweet/${teitterCurrentPage++}`,
        );
        console.log(resData);

        option.value.teitterCount = resData.data.total;

        const resTeitters: Array<teitter> = resData.data.records;

        // 追加到现有的数据中
        resTeitters.forEach((item) => {
            teitters.value.push(item);
        });

        // 如果当前页码超过总页码. 那么就不加载了
        if (resData.data.current > resData.data.pages) {
            console.log("没有更多了");

            option.value.isLoading = true;
        } else {
            option.value.isLoading = false;
        }
    }
    getTeitter();
    // todo 获取登陆状态的函数
    return { teitters, getTeitter, option, userInfo };
});
