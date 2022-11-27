<template>
    <div
        class="mainArea"
        @scroll="scroll"
    >
        <div class="tittle animate__animated animate__bounceIn">主页</div>
        <publishTeitter v-if="data.isLogin"></publishTeitter>
        <TheTeitterCard
            v-for="item in data.teitters"
            :teitter="item"
        ></TheTeitterCard>
        <theLoad class="loader"></theLoad>
        <!-- <button
            @click="getTeitter"
            class="loadMore"
        >
            更多
        </button> -->
    </div>
</template>

<script setup lang="ts">
    import TheTeitterCard from "./theTeitterCard.vue";
    import publishTeitter from "./publishTeitter.vue";
    import { useTeitterStore } from "@/stores/teitter";
    import { toRefs } from "vue";
    import theLoad from "../theLoad.vue";

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
        position: relative;
        // width: 59.3vmax;
        flex: 8;
        height: 100vh;
        overflow-y: scroll;
        &::-webkit-scrollbar1 {
            display: none;
        }
        padding-top: 6vmax;
        .tittle {
            z-index: 9999;
            position: absolute;
            top: 0;
            // left: 8.3vmax;
            height: 5vmax;
            // width: 59.3vmax;
            width: 75%;
            font-weight: bold;
            font-size: 2vmax;
            line-height: 5vmax;
            user-select: none;
            text-indent: 2vmax;
            backdrop-filter: blur(2vmax);
            opacity: 0.5;
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
