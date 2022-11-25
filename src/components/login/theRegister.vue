<template>
    <div class="login animate__animated animate__fadeInRight animate__faster">
        <h1>现在就加入 Teitter</h1>

        <input
            type="text"
            v-model="username"
            placeholder="用户名"
            autocomplete="new-password"
        />
        <br />
        <input
            type="text"
            v-model="nickname"
            placeholder="昵称"
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
        <div class="avatarFile">
            <span>头像</span>
            <input
                class=""
                type="file"
                accept="image/*"
                ref="avatarFile"
            />
        </div>

        <button
            class="registerBtn"
            :class="{ disable: !isOK }"
            @click="register"
        >
            注册
        </button>
        已经有账号了？
        <RouterLink
            :to="{
                name: 'login',
            }"
        >
            登录
        </RouterLink>
        <button @click="test">click</button>
    </div>
</template>

<script setup lang="ts">
    import axios from "axios";
    import { ref, type Ref, watchEffect } from "vue";
    import { RouterLink } from "vue-router";

    import router from "@/router/index";

    const nickname = ref("");
    const username = ref("");
    const password = ref("");
    const rePassword = ref("");
    const isOK = ref(false);
    const avatarFile: Ref<HTMLInputElement> | Ref<null> = ref(null);

    function test() {
        console.log(avatarFile?.value?.files?.length);
    }

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

    async function register() {
        const fd = new FormData();

        fd.append("userName", username.value);
        fd.append("nickName", nickname.value);
        fd.append("userPassword", password.value);
        if (avatarFile.value?.files != null) {
            fd.append("file", avatarFile.value.files[0]);
        }
        let res;
        try {
            res = await axios.post("/RegisterUser", fd, {
                headers: {
                    "Content-Type": "multipart/form-data; ",
                },
            });
            console.log(res);
            if (res.data.status == 200) {
                alert("注册成功");
                router.push({
                    name: "login",
                });
            }
        } catch (error) {
            alert("oops 出现问题了哦");
        }
    }
</script>

<style scoped lang="scss">
    .login {
        width: 70%;
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
        .avatarFile {
            font-size: 1.5vw;
            display: flex;
            span {
                width: 8vw;
                line-height: 5vw;
            }
        }
        .registerBtn {
            margin: 1vw 0;
            width: 100%;
            height: 3vw;
            border-radius: 1.5vw;
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
