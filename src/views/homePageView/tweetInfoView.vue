<template>
    <div class="twtInfo">
        <div class="tittle animate__animated animate__fadeIn">
            <span
                class="back iconfont icon-jiantou_xiangzuo"
                @click="goHome"
            ></span>
            忒文
        </div>

        <div>这里是{{ route.params }}推特详情</div>
    </div>
</template>

<script setup lang="ts">
    import router from "@/router";
    import { useRoute } from "vue-router";

    const route = useRoute();

    const goHome = () => {
        router.push({
            name: "home",
        });
    };
</script>

<style scoped lang="less">
    .twtInfo {
        flex: 8;
        padding-top: 6vmax;

        .tittle {
            display: flex;
            align-items: center;
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
            .back {
                width: 5vmax;
                height: 5vmax;
                text-align: left;
                display: block;
                border-radius: 50%;
                transition: 0.2s all;
                font-size: 3vmax;
                &:hover {
                    background-color: #e7e7e8;
                }
            }
        }
    }
</style>
