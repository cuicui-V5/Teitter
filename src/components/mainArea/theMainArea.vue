<template>
    <div
        class="mainArea"
        @scroll="scroll"
    >
        <div class="tittle animate__animated animate__bounceIn">主页</div>
        <publishTeitter v-if="userInfo.isLogin"></publishTeitter>
        <TheTeitterCard
            v-for="item in teitters"
            :teitter="item"
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
    import { toRefs } from "vue";
    import theLoad from "../theLoad.vue";

    import { getTeitter } from "@/api";
    const store = useTeitterStore();
    const { option, userInfo, teitters } = toRefs(store);
    getTeitter();

    async function scroll(e: any) {
        let scrollProgress =
            e.target.scrollTop /
            (e.target.scrollHeight - e.target.offsetHeight);
        if (scrollProgress > 0.8 && !option.value.isBusy) {
            console.log("滚动超过一大半, 加载下一页");
            getTeitter();
        }
    }
</script>

<style scoped lang="scss">
    .mainArea {
        position: relative;
        // width: 59.3vmax;
        flex: 7;
        height: 85vh;
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            display: none;
        }
        padding-top: 6vmax;
        .tittle {
            z-index: 1;
            position: fixed;
            top: 0;
            // left: 8.3vmax;
            height: 5vmax;
            // width: 59.3vmax;
            width: 67%;
            font-weight: bold;
            font-size: 2vmax;
            line-height: 5vmax;
            user-select: none;
            text-indent: 2vmax;
            backdrop-filter: blur(20px);
            background-color: rgba(255, 255, 255, 0.8);
        }
        .loader {
            position: absolute;
            left: 47%;
            width: 4vmax;
            height: 4vmax;
        }
        // .loadMore {
        //     position: absolute;
        //     left: 50%;
        //     transform: translate(-50%);
        //     width: 5.12vmax;
        //     height: 3.65vmax;
        //     margin-top: 5vmax;
        //     border: 0;
        //     border-radius: 1.82vmax;
        //     background-color: #1a8cd8;
        //     color: white;
        //     font-size: 1.5vmax;
        // }
    }
</style>
