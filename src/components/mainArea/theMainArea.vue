<template>
    <div
        class="mainArea"
        @scroll="scroll"
        ref="mainArea"
    >
        <!-- animate__animated animate__fadeIn -->
        <div class="tittle">
            忒特 v2.0.5
            <span
                class="iconfont"
                :class="{
                    'icon-taiyang': !store.isDarkMode,
                    'icon-moonyueliang': store.isDarkMode,
                }"
                id="darkModeButton"
                @click="changeDarkMode"
            ></span>
        </div>
        <networkErrorVue
            @event="getTeitter(true)"
            v-if="option.isNetWorkError"
        />
        <publishTeitter v-if="userInfo.isLogin"></publishTeitter>
        <TheTeitterCard
            v-for="item in teitters"
            :teitter="item"
            @flush="flush"
        ></TheTeitterCard>
        <theLoad
            class="loader"
            v-if="option.requesting"
        ></theLoad>
    </div>
</template>

<script setup lang="ts">
    import TheTeitterCard from "./theTeitterCard.vue";
    import publishTeitter from "./publishTeitter.vue";
    import { useTeitterStore } from "@/stores/teitter";
    import theLoad from "../theLoad.vue";

    import { getTeitter } from "@/api";
    import { toRefs, onActivated, onDeactivated, ref } from "vue";
    const mainArea = ref<HTMLElement>();

    let scrollTop: number;
    onActivated(() => {
        // 恢复滚动位置
        mainArea.value?.scrollTo({
            top: scrollTop,
        });
        store.getNotice();
    });
    onDeactivated(() => {});

    const store = useTeitterStore();
    const { option, userInfo, teitters } = toRefs(store);
    getTeitter(true);

    async function scroll(e: any) {
        scrollTop = e.target.scrollTop;
        let scrollProgress =
            e.target.scrollTop /
            (e.target.scrollHeight - e.target.offsetHeight);
        if (scrollProgress > 0.8 && !option.value.isBusy) {
            getTeitter();
        }
    }
    const flush = () => {
        getTeitter(true);
    };

    const changeDarkMode = () => {
        // 先判断当前的模式
        const isDark = document.documentElement.classList.contains("dark-mode");

        if (isDark) {
            // 处于深色模式
            // 切换到浅色模式
            console.log("切换到浅色模式");
            enableLight();
            localStorage.setItem("isDarkMode", "false");
        } else {
            console.log("切换到深色模式");
            enableDark();
            localStorage.setItem("isDarkMode", "true");
        }
    };
    // 在系统深色模式切换的时候, 根据系统的设定切换颜色模式
    const changeDarkModeAsSystem = () => {
        // 先判断当前的模式
        const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)");

        if (isSystemDark.matches) {
            console.log("系统切换到深色模式了, 切换到深色模式");
            enableDark();
            localStorage.setItem("isDarkMode", "true");
        } else {
            // 切换到浅色模式
            console.log("切换到浅色模式");
            enableLight();
            localStorage.setItem("isDarkMode", "false");
        }
    };
    // 启用浅色模式
    const enableLight = () => {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
        store.isDarkMode = false;
    };
    // 启用深色模式
    const enableDark = () => {
        document.documentElement.classList.remove("light-mode");
        document.documentElement.classList.add("dark-mode");
        store.isDarkMode = true;
    };
    // 初始化的时候检查是否处于深色模式
    const checkDarkMode = () => {
        const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)");
        const isDarkMode = localStorage.getItem("isDarkMode");
        if (isDarkMode == "true" || isSystemDark.matches) {
            console.log("切换到深色模式");

            enableDark();
        } else {
            console.log("切换到浅色模式");

            enableLight();
        }
    };
    checkDarkMode();
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", changeDarkModeAsSystem);
</script>

<style scoped lang="scss">
    .mainArea {
        position: relative;
        // width: 59.3vmax;
        flex: 0.605;
        flex: 605;
        // height: calc(100% - 6vmax);
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            display: none;
        }
        // padding-top: 6vmax;

        .tittle {
            // z-index: 2;
            // position: fixed;
            // top: 0;
            // left: 8.3vmax;
            height: 5vmax;
            // width: 59.3vmax;
            width: 100%;
            font-weight: bold;
            font-size: 2vmax;
            line-height: 5vmax;
            user-select: none;
            text-indent: 2vmax;
            backdrop-filter: blur(30px);
            background-color: var(--primary-bg);
            display: flex;
            justify-content: space-between;

            #darkModeButton {
                margin-right: 3vmax;
                display: block;

                font-size: 2vmax;
                transition: all 0.3s;
                &:hover {
                    transform: scale(1.5);
                }
            }
        }
        .loader {
            position: absolute;
            left: 47%;
            width: 4vmax;
            height: 4vmax;
        }
    }
</style>
