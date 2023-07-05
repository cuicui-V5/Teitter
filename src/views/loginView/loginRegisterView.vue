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
        background-color: var(--primary-bg);
        .main {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40vmax;
            min-height: 31vmax;
            padding: 1vmax;
            border-radius: 2vmax;
            background-color: var(--primary-bg);

            transform: translate(-50%, -50%);
            box-shadow: 0 0 3vmax 0.5vmax rgba(0, 0, 0, 0.5);
            .top {
                height: 5vmax;
                .close {
                    position: absolute;
                    color: var(--text-main);
                    top: 1.5vmax;
                    left: 1.5vmax;
                    width: 3vmax;
                    height: 3vmax;
                    border-radius: 50%;
                    text-align: center;
                    text-decoration: none;
                    font-size: 2vmax;
                    line-height: 3vmax;
                    transition: all 0.2s;
                    &:hover {
                        background-color: var(--secondary-bg);
                    }
                }
                .logo {
                    display: block;
                    width: 5vmax;
                    height: 5vmax;
                    margin: 0 auto;
                    background-image: url(../../img/logo.png);
                    background-size: contain;
                }
            }
        }
    }
</style>
