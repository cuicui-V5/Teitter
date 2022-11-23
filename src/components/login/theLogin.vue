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
        />
        <br />
        <button
            class="loginBtn"
            @click="login()"
        >
            登录
        </button>
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
    import { ref, toRefs } from "vue";
    import { RouterLink } from "vue-router";
    import { useTeitterStore } from "@/stores/teitter";
    import router from "@/router/index";
    const store = useTeitterStore();
    const { data } = toRefs(store);

    axios.defaults.baseURL = "http://117.78.0.131:8080";
    axios.defaults.withCredentials = true;

    const username = ref("");
    const password = ref("");

    async function login() {
        const user = {
            username: username.value,
            password: password.value,
        };
        let res;
        try {
            res = await axios.get("/teitter/api/login", {
                params: user,
            });
            console.log(res);
        } catch (error: unknown) {
            alert("网络错误! " + (error as Error).message);
        } finally {
            if (res?.data.status != 200) {
                alert("登录失败, 用户名或密码错误");
            } else {
                username.value = "";
                password.value = "";

                data.value.isLogin = true;
                data.value.userInfo = res.data.userInfo;
                data.value.userInfo.avatarUrl =
                    "http://117.78.0.131:8080" + res.data.userInfo.avatarUrl;
                router.push({
                    name: "home",
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .login {
        width: 60%;
        margin: 0 auto;
        h1 {
            font-size: 2.5vw;
        }
        input {
            border-radius: 0.2vw;
            border: #cfd9de 1px solid;
            padding: 0.2vw;
            width: 100%;
            height: 3vw;
            margin: 1vw 0;
            font-size: 1.5vw;
        }
        .loginBtn {
            margin: 1vw 0;

            width: 100%;
            height: 3vw;
            border-radius: 1.5vw;
            background-color: #0f1419;
            color: white;
        }
        a {
            text-decoration: none;
            color: #1f9cf0;
        }
    }
</style>
