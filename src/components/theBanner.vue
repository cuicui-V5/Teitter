<template>
    <div class="banner animate__animated animate__slideInUp animate__faster">
        <div class="text">
            <h1>新鲜事一网打尽</h1>
            <h2>在 Teitter 上的人会第一时间知道。</h2>
        </div>
        <div class="buttons">
            <button
                class="login"
                @click="gologin"
            >
                登录
            </button>
            <button
                class="register"
                @click="goRegister"
            >
                注册
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import router from "@/router";

    function gologin() {
        router.push({
            name: "login",
        });
    }
    function goRegister() {
        router.push({
            name: "register",
        });
    }
</script>

<style scoped lang="scss">
    .banner {
        box-shadow: 0vmax 4.2vmax 2.2vmax 3.2vmax black;
        display: flex;
        justify-content: space-between;
        color: white;
        z-index: 99;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 7.3vmax;
        width: 100vw;
        background-color: #1d9bf0;
        .text {
            margin: 1vmax 10vmax 1vmax 10vmax;
            h1 {
                font-size: 2.125vmax;
            }
            h2 {
                font-size: 1.375vmax;
                font-weight: normal;
            }
        }
        .buttons {
            margin-right: 2vmax;
            height: 100%;
            width: 15vmax;
            justify-content: space-around;
            display: flex;
            align-items: center;
            button {
                background-color: #fff;
                width: 6vmax;
                height: 4vmax;
                border: 1px solid #71c0f6;
                border-radius: 2vmax;
                background-color: #1a8cd8;
                color: white;
                font-size: 1.5vmax;
                font-weight: bold;
            }
            .register {
                background-color: #eff3f4;
                color: black;
            }
        }
    }
</style>
