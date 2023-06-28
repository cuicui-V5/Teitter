<template>
    <div class="account">
        <div class="tittle animate__animated animate__fadeIn faster">
            <div class="top">
                <span
                    class="back iconfont icon-jiantou_xiangzuo"
                    @click="goHome"
                ></span>
                <div class="nickNameAndCount">
                    <div class="nickName">{{ userInfo?.nickName }}</div>
                    <div class="username">@{{ userInfo?.userName }}</div>
                </div>
            </div>
        </div>
        <div class="topBar">
            <RouterLink
                class="following"
                active-class="current"
                :to="{
                    name: 'following',
                }"
            >
                正在关注
            </RouterLink>
            <RouterLink
                class="follower"
                active-class="current"
                :to="{
                    name: 'follower',
                }"
            >
                关注者
            </RouterLink>
        </div>
        <RouterView :uid="userId"></RouterView>
    </div>
</template>

<script setup lang="ts">
    import router from "@/router";
    import { useRoute } from "vue-router";
    import { computed, ref } from "vue";
    import { reqUserInfo, reqUserTweet } from "@/api";
    import type { userInfo, Tweet } from "@/interfaces/pubInterface";
    import dayjs from "dayjs";
    import "dayjs/locale/zh-cn";
    dayjs.locale("zh-cn");

    const route = useRoute();
    const userId = route.params.userId as string;
    console.log(route.params);

    const userInfo = ref<userInfo>();
    const getUserInfo = async () => {
        const res = await reqUserInfo(userId);
        userInfo.value = res;
    };
    getUserInfo();
    const goHome = () => {
        router.back();
    };
</script>

<style scoped lang="less">
    .account {
        flex: 605;

        padding-top: 4vmax;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
        padding-bottom: 15vmax;

        .tittle {
            z-index: 2;
            width: 100%;
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
                    padding: 0.7vmax;
                    display: block;
                    border-radius: 50%;
                    transition: 0.2s all;
                    font-size: 3vmax;
                    &:hover {
                        background-color: #a4a4a44b;
                    }
                }
                .nickNameAndCount {
                    margin-left: 2vmax;
                    .nickName {
                        font-size: 1.8vmax;
                        font-weight: bold;
                    }
                    .username {
                        font-size: 1.2vmax;

                        color: #677682;
                    }
                }
            }
        }
        .topBar {
            margin: 5px;
            display: flex;
            justify-content: space-around;
            width: 100%;
            height: 5vmax;
            .follower,
            .following {
                text-decoration: none;
                color: black;
                font-weight: bold;
                line-height: 5vmax;
                text-align: center;
                cursor: pointer;
                &.current {
                    border-bottom: solid 6px var(--main-color);
                }
            }
        }
    }
</style>
