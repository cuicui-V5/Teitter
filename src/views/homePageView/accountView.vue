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
                    <div class="tweetCount">{{ userTweet?.length }} 推文</div>
                </div>
            </div>
        </div>
        <div class="infoCard">
            <div
                class="bgImg"
                :style="backGroundUrlStyle"
            ></div>
            <div
                class="avatar"
                :style="avatarUrlStyle"
            ></div>
            <button
                id="editUserInfo"
                @click="isShowEdit = true"
                v-if="store.userInfo.userId?.toString() == route.params?.userId"
            >
                编辑个人资料
            </button>
            <button
                id="followBtn"
                v-if="store.userInfo.userId?.toString() != route.params?.userId"
            >
                关注
            </button>

            <div class="text">
                <div class="nickName">{{ userInfo?.nickName }}</div>
                <div class="userName">@{{ userInfo?.userName }}</div>
                <div class="profile">
                    <p>
                        {{ userInfo?.profile }}
                    </p>
                </div>
                <div class="joinTime">{{ timeComputed }} 加入</div>
                <span class="follow">123 正在关注</span>
                &nbsp;
                <span class="follow">431 关注者</span>
            </div>
            <Teleport to="body">
                <editUserInfoVue
                    v-if="isShowEdit && userInfo"
                    @close="close"
                    @getUserInfo="getUserInfo"
                    :userInfo="userInfo"
                ></editUserInfoVue>
            </Teleport>
        </div>
        <theTeitterCardVue
            :teitter="tweet"
            v-for="tweet in userTweet"
        />
    </div>
</template>

<script setup lang="ts">
    import editUserInfoVue from "@/components/editUserInfo.vue";
    import router from "@/router";
    import { useRoute } from "vue-router";
    import { computed, ref } from "vue";
    import { useTeitterStore } from "@/stores/teitter";
    import { reqUserInfo, reqUserTweet } from "@/api";
    import type { userInfo, Tweet } from "@/interfaces/pubInterface";
    import theTeitterCardVue from "@/components/mainArea/theTeitterCard.vue";
    import dayjs from "dayjs";
    import "dayjs/locale/zh-cn";
    dayjs.locale("zh-cn");

    const store = useTeitterStore();

    const isShowEdit = ref(false);
    const route = useRoute();
    const userId = route.params.userId as string;
    const userInfo = ref<userInfo>();
    const userTweet = ref<Tweet[]>();

    const timeComputed = computed(() => {
        return dayjs(Number(userInfo.value?.createDate)).format("YYYY年MM月");
    });
    const avatarUrlStyle = computed(() => {
        return `background-image: url(${userInfo?.value?.avatarUrl}); `;
    });
    const backGroundUrlStyle = computed(() => {
        return `background-image: url(${userInfo?.value?.backgroundUrl}); `;
    });

    const goHome = () => {
        router.push({
            name: "home",
        });
    };
    const close = () => {
        isShowEdit.value = false;
    };

    // 如果没登陆,且没有userId,那么说明是从侧边栏访问的account界面 那么重定向到登陆页面;
    if (store.userInfo.isLogin == false && !route.params.userId) {
        router.push({
            name: "login",
        });
    }

    const getUserInfo = async () => {
        const res = await reqUserInfo(userId);
        userInfo.value = res;
    };
    getUserInfo();

    const getUserTweet = async () => {
        const res = await reqUserTweet(userId);
        userTweet.value = res;
    };
    getUserTweet();
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
                    .tweetCount {
                        font-size: 1.2vmax;

                        color: #677682;
                    }
                }
            }
        }
        .infoCard {
            width: 100%;
            position: relative;
            padding-bottom: 2vmax;
            border-bottom: 1px solid #e7e7e8;

            .bgImg {
                height: 20vmax;
                margin-bottom: 10vmax;
                background-color: #1d9bf0;
                background-position: center;
                background-size: cover;
            }
            .avatar {
                position: absolute;
                width: 15vmax;
                height: 15vmax;
                top: 13vmax;
                left: 2vmax;
                border: 2px solid #1d9bf0;
                border-radius: 50%;
                background-size: cover;
                background-color: #fff;
                background-position: center;
            }
            #editUserInfo {
                position: absolute;
                top: 21vmax;
                left: 45vmax;
                width: 13vmax;
                height: 4vmax;
                border-radius: 2vmax;
                font-size: 1.4vmax;
                font-weight: bold;
                border: 1px solid #d4dde1;
                transition: all 200ms;
                &:hover {
                    background-color: #e7e7e8;
                }
            }
            #followBtn {
                position: absolute;
                top: 21vmax;
                left: 45vmax;
                width: 13vmax;
                height: 4vmax;
                border-radius: 2vmax;
                font-size: 1.4vmax;
                font-weight: bold;
                border: 1px solid #d4dde1;
                transition: all 200ms;
                &:hover {
                    background-color: #e7e7e8;
                }
            }
            .text {
                margin-left: 2vmax;
                .nickName {
                    font-size: 2.5vmax;
                    font-weight: bold;
                }
                .userName {
                    font-size: 1.6vmax;
                    color: #677682;
                }
                .profile {
                    margin-top: 1vmax;
                    font-size: 1.4vmax;
                }
                .joinTime {
                    margin-top: 1vmax;
                    font-size: 1.4vmax;
                }
                .follow {
                    cursor: pointer;
                    margin-top: 1vmax;
                    font-size: 1.4vmax;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>
