<template>
    <div class="mask">
        <div class="main">
            <div class="top">
                <RouterLink
                    :to="{
                        name: 'home',
                    }"
                    class="close"
                >
                    x
                </RouterLink>
                <span class="logo"></span>
            </div>
            <div class="login">
                <h1>登录 Teitter</h1>

                <input
                    type="text"
                    id=""
                    v-model="username"
                    placeholder="用户名"
                />
                <br />

                <input
                    type="password"
                    id=""
                    v-model="password"
                    placeholder="密码"
                />
                <br />
                <button class="loginBtn">登录</button>
                还没有账号？
                <a href="">注册</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    const username = ref("");
    const password = ref("");
</script>

<style scoped lang="scss">
    .mask {
        position: absolute;
        top: 0%;
        left: 0%;
        right: 0%;
        bottom: 0%;
        background-color: #0000004a;
        z-index: 999;
        .main {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40vw;
            height: 31vw;
            background-color: white;
            border-radius: 2vw;
            .top {
                height: 5vw;
                .close {
                    position: absolute;
                    color: #0f1419;
                    left: 0;
                    top: 0;
                    height: 5vw;
                    width: 5vw;
                    border-radius: 50%;
                    text-align: center;
                    font-size: 3vw;
                    line-height: 4vw;
                    text-decoration: none;
                    &:hover {
                        background-color: #e7e7e8;
                    }
                }
                .logo {
                    display: block;
                    height: 5vw;
                    width: 5vw;
                    margin: 0 auto;
                    background-image: url(../../img/logo.png);
                    background-size: contain;
                }
            }
            .login {
                width: 60%;
                margin: 0 auto;
                h1 {
                    font-size: 3.1vw;
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
                    margin-top: 1vw;
                    width: 100%;
                    height: 3vw;
                    border-radius: 1.5vw;
                    background-color: #0f1419;
                    color: white;
                }
            }
        }
    }
</style>
