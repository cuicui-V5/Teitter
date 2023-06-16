<template>
    <div
        class="mainArea"
        @scroll="scroll"
        ref="mainArea"
    >
        <div class="tittle animate__animated animate__fadeIn">忒特 v2.0.3</div>
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
            console.log("滚动超过一大半, 加载下一页");
            getTeitter();
        }
    }
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
        height: calc(100% - 6vmax);
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            // display: none;
        }
        padding-top: 6vmax;

        .tittle {
            z-index: 2;
            position: fixed;
            top: 0;
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
            background-color: rgba(255, 255, 255, 0.8);
        }
        .loader {
            position: absolute;
            left: 47%;
            width: 4vmax;
            height: 4vmax;
        }
    }
</style>
