<template>
    <RouterView></RouterView>
    <Teleport to="html">
        <msgBox
            :msg="msg"
            :warn="Warn"
            v-if="showMsgBox"
        ></msgBox>
    </Teleport>
</template>

<script setup lang="ts">
    import { isLogin } from "./api";
    import msgBox from "@/components/msgBox.vue";
    import { provide, ref } from "vue";
    import { useTeitterStore } from "./stores/teitter";
    import { checkDarkMode, changeDarkModeAsSystem } from "@/utils/darkMode";

    const store = useTeitterStore();

    const showMsgBox = ref(false);
    const msg = ref("");
    const Warn = ref(false);
    let timer: any;
    const sendMsg = (message: string, isWarn = false, timeout = 2000) => {
        console.log(message);
        if (timer) {
            clearTimeout(timer);
        }
        msg.value = message;
        showMsgBox.value = true;
        timer = setTimeout(() => {
            showMsgBox.value = false;
        }, timeout);
        Warn.value = isWarn;
    };
    provide("sendMsg", sendMsg);

    const init = async () => {
        await isLogin();
        await store.getNotice();
    };
    init();

    // 定时获取通知
    setInterval(() => {
        init();
    }, 20000);

    checkDarkMode();
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", changeDarkModeAsSystem);
</script>

<style></style>
