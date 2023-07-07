<template>
    <div
        class="mainArea"
        @scroll.passive="scroll"
        ref="mainArea"
    >
        <div class="tittle">
            忒特 v2.2.2 2023070703
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
    import { changeDarkMode } from "@/utils/darkMode";

    import { getTeitter } from "@/api";
    import { toRefs, onActivated, onDeactivated, ref } from "vue";
    import { throttle } from "lodash-es";

    const mainArea = ref<HTMLElement>();

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

    let scrollTop: number;
    let scrollHeight: number;
    let offsetHeight: number;

    const scrollHandler = (e: any) => {
        scrollHeight = e.target.scrollHeight;
        offsetHeight = e.target.offsetHeight;
    };

    const scroll = throttle((e: any) => {
        if (!scrollHeight || !offsetHeight) {
            scrollHandler(e);
        }
        // scrollTop需要每次都获取
        scrollTop = e.target.scrollTop;
        // scrollHeight 和 offsetHeight不需要每次都获取, getTeitter之后获取就行
        let scrollProgress = scrollTop / (scrollHeight - offsetHeight);
        if (scrollProgress > 0.8 && !option.value.isBusy) {
            getTeitter();
            scrollHandler(e);
        }
    }, 500);
    const flush = () => {
        getTeitter(true);
    };
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
                transition: all 0.2s;
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
