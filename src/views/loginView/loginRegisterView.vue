<template>
    <div class="mask">
        <div class="main animate__animated animate__fadeIn">
            <div class="top">
                <RouterLink
                    :to="{
                        name: 'home',
                    }"
                    class="close iconfont icon-close"
                ></RouterLink>
                <span class="logo"></span>
            </div>
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
    .mask {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background-color: #0000004a;
        .main {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40vw;
            min-height: 31vw;
            padding: 1vw;
            border-radius: 2vw;
            background-color: white;
            transform: translate(-50%, -50%);
            .top {
                height: 5vw;
                .close {
                    position: absolute;
                    top: 0.2vw;
                    left: 0.2vw;
                    width: 3vw;
                    height: 3vw;
                    border-radius: 50%;
                    color: #0f1419;
                    text-align: center;
                    text-decoration: none;
                    font-size: 2vw;
                    line-height: 3vw;
                    transition: all 0.2s;
                    &:hover {
                        background-color: #e7e7e8;
                    }
                }
                .logo {
                    display: block;
                    width: 5vw;
                    height: 5vw;
                    margin: 0 auto;
                    background-image: url(../../img/logo.png);
                    background-size: contain;
                }
            }
        }
    }
</style>
