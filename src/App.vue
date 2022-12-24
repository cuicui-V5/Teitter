<template>
    <RouterView></RouterView>
    <Teleport to="html">
        <msgBox
            :msg="msg"
            v-if="showMsgBox"
        ></msgBox>
    </Teleport>
</template>

<script setup lang="ts">
    import { isLogin } from "./api";
    import msgBox from "@/components/msgBox.vue";
    import { provide, ref } from "vue";
    isLogin();

    const showMsgBox = ref(false);
    const msg = ref("");
    let timer: any;
    const sendMsg = (message: string, timeout = 2000) => {
        console.log(message);
        if (timer) {
            clearTimeout(timer);
        }
        msg.value = message;
        showMsgBox.value = true;
        timer = setTimeout(() => {
            showMsgBox.value = false;
        }, timeout);
    };
    provide("sendMsg", sendMsg);
</script>

<style scoped></style>
