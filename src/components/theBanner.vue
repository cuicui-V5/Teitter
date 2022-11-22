<template>
    <div class="banner">
        <div class="text">
            <h1>新鲜事一网打尽</h1>
            <h2>在 Teitter 上的人会第一时间知道。</h2>
        </div>
        <div class="buttons">
            <button
                class="login"
                @click="isShowLogin = !isShowLogin"
            >
                登录
            </button>
            <button
                class="register"
                @click="gologin"
            >
                注册
            </button>
            <Teleport
                to="html"
                v-if="isShowLogin"
            >
                <theLoginVue></theLoginVue>
            </Teleport>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useTeitterStore } from "@/stores/teitter";
    import { ref, Teleport, toRefs } from "vue";

    import router from "@/router";
    import theLoginVue from "./login/theLogin.vue";
    const store = useTeitterStore();
    const { data } = toRefs(store);
    const isShowLogin = ref(false);

    function gologin() {
        router.push({
            name: "login",
        });
    }
</script>

<style scoped lang="scss">
    .banner {
        box-shadow: 0vw 4.2vw 2.2vw 3.2vw black;
        display: flex;
        justify-content: space-between;
        color: white;
        z-index: 99;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 7.3vw;
        width: 100vw;
        background-color: #1d9bf0;
        .text {
            margin: 1vw 10vw 1vw 10vw;
            h2 {
                font-weight: normal;
            }
        }
        .buttons {
            margin-right: 2vw;
            height: 100%;
            width: 15vw;
            justify-content: space-around;
            display: flex;
            align-items: center;
            button {
                background-color: #fff;
                width: 6vw;
                height: 4vw;
                border: 1px solid #71c0f6;
                border-radius: 2vw;
                background-color: #1a8cd8;
                color: white;
                font-size: 1.5vw;
                font-weight: bold;
            }
            .register {
                background-color: #eff3f4;
                color: black;
            }
        }
    }
</style>
