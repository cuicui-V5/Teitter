<template>
    <div class="login animate__animated animate__fadeInRight animate__faster">
        <h1>现在就加入 Teitter</h1>
        <input
            type="text"
            v-model="nickname"
            placeholder="昵称"
            autocomplete="new-password"
        />
        <br />
        <input
            type="text"
            v-model="username"
            placeholder="用户名"
            autocomplete="new-password"
        />
        <br />

        <input
            type="password"
            v-model="password"
            placeholder="密码"
            autocomplete="new-password"
        />
        <div
            style="color: red"
            v-if="password.length < 6"
        >
            密码至少应为 6 位
        </div>

        <input
            type="password"
            v-model="rePassword"
            placeholder="确认密码"
            autocomplete="new-password"
        />
        <div
            style="color: red"
            v-if="password !== rePassword"
        >
            两次输入不匹配
        </div>
        <br />

        <button
            class="registerBtn"
            :class="{ disable: !isOK }"
            @click="registerBtn"
            v-if="!isBusy"
        >
            注册
        </button>
        <TheLoad
            v-if="isBusy"
            style="width: 3vmax; height: 3vmax; margin: 0 auto"
        ></TheLoad>
        <br />
        已经有账号了？
        <RouterLink
            :to="{
                name: 'login',
            }"
        >
            登录
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
    import axios from "axios";
    import { ref, type Ref, watchEffect } from "vue";
    import { RouterLink } from "vue-router";
    import TheLoad from "../theLoad.vue";

    import router from "@/router/index";
    import { register } from "@/api";

    const nickname = ref("");
    const username = ref("");
    const password = ref("");
    const rePassword = ref("");
    const isOK = ref(false);
    const avatarFile: Ref<HTMLInputElement> | Ref<null> = ref(null);

    // 是否正在请求, 如果正在请求, 那么就播放加载的动画
    const isBusy = ref(false);

    watchEffect(() => {
        if (
            nickname.value &&
            username.value &&
            password.value &&
            password.value === rePassword.value
        ) {
            isOK.value = true;
        } else {
            isOK.value = false;
        }
    });

    async function registerBtn() {
        isBusy.value = true;

        const fd = new FormData();

        fd.append("userName", username.value);
        fd.append("nickName", nickname.value);
        fd.append("userPassword", password.value);

        const res = await register(fd);
        if (res == "ok") {
            alert("注册成功");
            router.push({
                name: "login",
            });
        } else {
            alert(res);
        }
        isBusy.value = false;
    }
</script>

<style scoped lang="scss">
    .login {
        width: 70%;
        margin: 0 auto;
        h1 {
            font-size: 2.5vmax;
        }
        input {
            border-radius: 0.2vmax;
            border: #cfd9de 1px solid;
            padding: 0.2vmax;
            width: 100%;
            height: 3vmax;
            margin: 1vmax 0;
            font-size: 1.5vmax;
        }
        .avatarFile {
            font-size: 1.5vmax;
            display: flex;
            span {
                width: 8vmax;
                line-height: 5vmax;
            }
        }
        .registerBtn {
            margin: 1vmax 0;
            width: 100%;
            height: 3vmax;
            border-radius: 1.5vmax;
            background-color: #0f1419;
            color: white;
        }
        .disable {
            pointer-events: none;
            opacity: 60%;
        }
        a {
            text-decoration: none;
            color: #1f9cf0;
        }
    }
</style>
