<template>
    <div class="login">
        <h1>现在就加入 Teitter</h1>

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
        <input
            type="password"
            v-model="password"
            placeholder="确认密码"
        />
        <br />
        <button class="registerBtn">注册</button>
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
    import { ref } from "vue";
    import { RouterLink } from "vue-router";

    const username = ref("");
    const password = ref("");
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
        .registerBtn {
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
