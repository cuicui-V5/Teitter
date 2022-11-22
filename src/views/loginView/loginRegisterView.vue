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
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

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
        }
    }
</style>
