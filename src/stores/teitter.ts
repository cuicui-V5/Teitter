import { ref } from "vue";
import { defineStore } from "pinia";
import type { teitter, userInfo } from "@/interfaces/pubInterface";
import { reqSearch } from "@/api";

export const useTeitterStore = defineStore("teitter", () => {
    const teitters = ref<teitter[]>([]);
    const searchResultTeitters = ref<teitter[]>([]);

    const userInfo = ref<userInfo>({
        isLogin: false,
    });

    const option = ref({
        requesting: false,
        isBusy: false,
        teitterCount: 0,
        isNetWorkError: false,
    });

    const getSearchRes = async (keyWord: string, pageNum: number) => {
        try {
            const res = await reqSearch(keyWord, pageNum);
            searchResultTeitters.value = res.data.data.records;
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    return { teitters, searchResultTeitters, option, userInfo, getSearchRes };
});
