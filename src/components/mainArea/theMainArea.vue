<template>
    <div
        class="mainArea"
        @scroll="scroll"
    >
        <div class="tittle">忒特-首页</div>
        <publishTeitter v-if="data.isLogin"></publishTeitter>
        <TheTeitterCard
            v-for="item in data.teitters"
            :teitter="item"
        ></TheTeitterCard>
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
        console.log(scrollProgress);

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
        .tittle {
            height: 5vw;
            padding: 0 1.5vw;
            font-weight: bold;
            font-size: 2vw;
            line-height: 5vw;
            user-select: none;
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
    }
</style>
