import { ref } from "vue";
import { defineStore } from "pinia";
import type { teitter, userInfo } from "@/interfaces/pubInterface";

export const useTeitterStore = defineStore("teitter", () => {
    const teitters = ref<teitter[]>([]);
    const userInfo = ref<userInfo>({
        isLogin: false,
    });

    const option = ref({
        requesting: false,
        isBusy: false,
        teitterCount: -1,
    });

    return { teitters, option, userInfo };
});
