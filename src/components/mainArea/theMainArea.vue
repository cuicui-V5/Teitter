<template>
    <div
        class="mainArea"
        @scroll="scroll"
    >
        <div class="tittle animate__animated animate__bounceIn">首页</div>
        <publishTeitter v-if="data.isLogin"></publishTeitter>
        <TheTeitterCard
            v-for="item in data.teitters"
            :teitter="item"
        ></TheTeitterCard>
        <div
            class="lds-ring"
            v-if="store.isLoading"
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <button
            @click="getTeitter"
            class="loadMore"
        >
            更多
        </button>
    </div>
</template>

<script setup lang="ts">
    import TheTeitterCard from "./theTeitterCard.vue";
    import publishTeitter from "./publishTeitter.vue";
    import { useTeitterStore } from "@/stores/teitter";
    import { toRefs } from "vue";

    const store = useTeitterStore();
    const { data, getTeitter, isLoading } = toRefs(store);

    function scroll(e: any) {
        let scrollProgress =
            e.target.scrollTop /
            (e.target.scrollHeight - e.target.offsetHeight);
        if (scrollProgress > 0.8 && !isLoading.value) {
            console.log("滚动超过一大半, 加载下一页");
            getTeitter.value();
        }
    }
</script>

<style scoped lang="scss">
    .mainArea {
        width: 59.3vw;
        height: 100vh;
        overflow-y: scroll;
        &::-webkit-scrollbar1 {
            display: none;
        }
        padding-top: 6vw;
        .tittle {
            z-index: 9999;
            position: absolute;
            top: 0;
            left: 8.3vw;
            height: 5vw;
            width: 59.3vw;
            font-weight: bold;
            font-size: 2vw;
            line-height: 5vw;
            user-select: none;
            text-indent: 2vw;
            backdrop-filter: blur(2vw);
            opacity: 0.5;
        }
        .loadMore {
            position: relative;
            left: 50%;
            width: 5.12vw;
            height: 3.65vw;
            margin-top: 1vw;
            border: 0;
            border-radius: 1.82vw;
            background-color: #1a8cd8;
            color: white;
            font-size: 1.5vw;
            transform: translateX(-50%);
        }
        .lds-ring {
            display: block;
            margin: 0 auto;
            width: 80px;
            height: 80px;
        }
        .lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 64px;
            height: 64px;
            margin: 8px;
            border: 8px solid #cef;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #1d9bf0 transparent transparent transparent;
        }
        .lds-ring div:nth-child(1) {
            animation-delay: -0.45s;
        }
        .lds-ring div:nth-child(2) {
            animation-delay: -0.3s;
        }
        .lds-ring div:nth-child(3) {
            animation-delay: -0.15s;
        }
        @keyframes lds-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>
