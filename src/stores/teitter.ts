import { ref } from "vue";
import { defineStore } from "pinia";
import type { teitter, userInfo } from "@/interfaces/pubInterface";
import { reqNotice, reqSearch } from "@/api";
import type { Tweet, noticeData } from "./../interfaces/pubInterface";

export const useTeitterStore = defineStore("teitter", () => {
    const teitters = ref<Tweet[]>([]);
    const searchResultTeitters = ref<Tweet[]>([]);

    const userInfo = ref<userInfo>({
        isLogin: false,
    });

    const option = ref({
        requesting: false,
        isBusy: false,
        teitterCount: 0,
        isNetWorkError: false,
    });
    const notice = ref<noticeData[]>();
    // 获取通知
    const getNotice = async () => {
        if (userInfo.value.isLogin) {
            const res = await reqNotice();
            notice.value = res.sort((a, b) => {
                return Number(b.createDate) - Number(a.createDate);
            });
        }
    };
    const getSearchRes = async (keyWord: string, pageNum: number) => {
        try {
            const res = await reqSearch(keyWord, pageNum);
            searchResultTeitters.value = res.data.data.records;
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const isDarkMode = ref(false);

    return {
        teitters,
        searchResultTeitters,
        option,
        userInfo,
        getSearchRes,
        notice,
        getNotice,
        isDarkMode,
    };
});
