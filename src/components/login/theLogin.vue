<template>
    <div class="login animate__animated animate__fadeInLeft animate__faster">
        <h1>登录 Teitter</h1>

        <input
            type="text"
            v-model="username"
            placeholder="用户名"
        />
        <br />

        <input
            type="password"
            v-model="password"
            placeholder="密码"
            @keydown.enter="loginBtn()"
        />
        <br />
        <button
            class="loginBtn"
            @click="loginBtn()"
            v-if="!isBusy"
        >
            登录
        </button>
        <TheLoad
            v-if="isBusy"
            style="width: 3vmax; height: 3vmax; margin: 0 auto"
        ></TheLoad>
        <br />

        还没有账号？
        <RouterLink
            :to="{
                name: 'register',
            }"
        >
            注册
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
    import axios from "axios";
    import { ref, toRefs, inject } from "vue";
    import { RouterLink } from "vue-router";
    import { useTeitterStore } from "@/stores/teitter";
    import router from "@/router/index";
    import TheLoad from "../theLoad.vue";
    import { login } from "@/api";
    import JSConfetti from "js-confetti";
    const jsConfetti = new JSConfetti();

    const store = useTeitterStore();
    const { userInfo } = toRefs(store);
    const sendMsg = inject("sendMsg") as Function;

    const username = ref("");
    const password = ref("");

    // 是否正在请求, 如果正在请求, 那么就播放加载的动画
    const isBusy = ref(false);

    async function loginBtn() {
        const res = await login({
            userName: username.value,
            userPassword: password.value,
        });

        if (res == "ok") {
            sendMsg("登录成功");
            store.getNotice();
            // console.log("登录成功");
            router.push({
                name: "home",
            });
            // jsConfetti.addConfetti({
            //     confettiRadius: 6,
            //     confettiNumber: 500,
            // });
        } else {
            // alert(res);
            sendMsg(res, true);
        }
    }
</script>

<style scoped lang="scss">
    .login {
        width: 60%;
        margin: 0 auto;
        h1 {
            font-size: 2.5vmax;
        }
        input {
            border-radius: 0.2vmax;
            background-color: var(--secondary-bg);
            border: #cfd9de 1px solid;
            padding: 0.2vmax;
            width: 100%;
            height: 3vmax;
            margin: 1vmax 0;
            font-size: 1.5vmax;
        }
        .loginBtn {
            margin: 1vmax 0;

            width: 100%;
            height: 3vmax;
            border-radius: 1.5vmax;
            background-color: #0f1419;
            color: white;
        }
        a {
            text-decoration: none;
            color: #1f9cf0;
        }
    }
</style>
