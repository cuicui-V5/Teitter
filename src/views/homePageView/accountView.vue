<template>
    <div class="account">
        <div class="tittle animate__animated animate__fadeIn">
            <div class="top">
                <span
                    class="back iconfont icon-jiantou_xiangzuo"
                    @click="goHome"
                ></span>
                {{ route.params.userId }}
            </div>
            <div class="bottom">
                <span>20推文</span>
            </div>
        </div>
        <div>这里是{{ route.params }}账户页面</div>
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
    .account {
        flex: 8;
        padding-top: 8vmax;

        .tittle {
            width: 69.5%;
            user-select: none;

            backdrop-filter: blur(20px);
            background-color: rgba(255, 255, 255, 0.8);
            position: fixed;
            top: 0;
            .top {
                display: flex;
                align-items: center;
                font-size: 3vmax;
                .back {
                    padding: 1vmax;
                    display: block;
                    border-radius: 50%;
                    transition: 0.2s all;
                    font-size: 3vmax;
                    &:hover {
                        background-color: #e7e7e8;
                    }
                }
            }
            .bottom {
                padding-left: 5vmax;
            }
        }
    }
</style>
