<template>
    <div class="account">
        <div class="tittle">
            <div class="top">
                <span
                    class="back iconfont icon-jiantou_xiangzuo"
                    @click="goHome"
                ></span>
                <div class="nickNameAndCount">
                    <div class="nickName">{{ userInfo?.nickName }}</div>
                    <div class="tweetCount">
                        {{ userInfo?.tweetCount }} 推文
                    </div>
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
                v-if="store.userInfo.uid?.toString() == route.params?.userId"
            >
                编辑个人资料
            </button>
            <button
                id="chat"
                @click="chatTo"
                v-if="store.userInfo.uid?.toString() != route.params?.userId"
            >
                私信
            </button>
            <button
                id="followBtn"
                @click="changeFollowStatus"
                :class="{
                    active: followStatus != 0,
                }"
                v-if="store.userInfo.uid?.toString() != route.params?.userId"
            >
                {{ followBtnText }}
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
                <RouterLink
                    class="follow"
                    :to="{
                        name: `following`,
                    }"
                >
                    {{ userInfo?.followsCount }} 正在关注
                </RouterLink>
                &nbsp;
                <RouterLink
                    class="follow"
                    :to="{
                        name: `follower`,
                    }"
                >
                    {{ userInfo?.fansCount }} 关注者
                </RouterLink>
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
            :replyTo="tweet.repliedNickNameTo"
            @flush="getUserTweet"
            v-for="tweet in userTweet"
        />
    </div>
</template>

<script setup lang="ts">
    import editUserInfoVue from "@/components/editUserInfo.vue";
    import router from "@/router";
    import { useRoute } from "vue-router";
    import { computed, ref, watch } from "vue";
    import { useTeitterStore } from "@/stores/teitter";
    import { reqFollowSomeOne, reqUserInfo, reqUserTweet } from "@/api";
    import type { userInfo, Tweet } from "@/interfaces/pubInterface";
    import theTeitterCardVue from "@/components/mainArea/theTeitterCard.vue";
    import dayjs from "dayjs";
    import "dayjs/locale/zh-cn";
    dayjs.locale("zh-cn");

    const store = useTeitterStore();

    const isShowEdit = ref(false);
    const route = useRoute();
    const getUserInfo = async () => {
        const res = await reqUserInfo(userId);
        userInfo.value = res;
    };

    const getUserTweet = async () => {
        const res = await reqUserTweet(userId);
        userTweet.value = res;
    };
    let userId = route.params.userId as string;
    if (!userId || userId === "0") {
        router.push({
            name: "login",
        });
    } else {
        getUserInfo();
        getUserTweet();
    }
    watch(route, () => {
        console.log("改变了");
        userId = route.params.userId as string;

        getUserInfo();
        getUserTweet();
    });
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
    const followStatus = computed(() => {
        if (!userInfo.value?.ptoPRelation) {
            return 0; //未关注
        }
        if (userInfo.value?.ptoPRelation?.length == 2) {
            return 3; //互相关注
        }
        if (userInfo.value?.ptoPRelation[0] == 1) {
            return 1; //你关注了对方
        }
        if (userInfo.value?.ptoPRelation[0] == 2) {
            return 2; //对方关注了你
        }
    });
    const followBtnText = computed(() => {
        let text = "";
        switch (followStatus.value) {
            case 0:
                text = "未关注";
                break;
            case 1:
                text = "已关注";
                break;
            case 2:
                text = "对方关注了你";
                break;
            case 3:
                text = "互相关注";
                break;
        }
        return text;
    });
    const changeFollowStatus = async () => {
        if (followStatus.value == 1 || followStatus.value == 3) {
            // 取消关注的操作
            await reqFollowSomeOne(userInfo.value!.uid as bigint, false);
        }
        if (followStatus.value == 0 || followStatus.value == 2) {
            // 关注的操作
            await reqFollowSomeOne(userInfo.value!.uid as bigint, true);
        }
        await getUserInfo();
    };

    const goHome = () => {
        router.back();
    };
    const close = () => {
        isShowEdit.value = false;
    };
    // 没登陆不让看
    setTimeout(() => {
        if (store.userInfo.isLogin == false) {
            router.push({
                name: "login",
            });
        }
    }, 500);
    const chatTo = () => {
        router.push({
            name: "chatTo",
            query: {
                avatarUrl: userInfo.value?.avatarUrl,
                nickName: userInfo.value?.nickName,
                userName: userInfo.value?.userName,
            },
        });
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
            background-color: var(--primary-bg);
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
                        background-color: var(--secondary-bg);
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
            border-bottom: 1px solid var(--secondary-bg);

            .bgImg {
                height: 20vmax;
                margin-bottom: 10vmax;
                background-color: var(--main-color);
                background-position: center;
                background-size: cover;
            }
            .avatar {
                position: absolute;
                width: 15vmax;
                height: 15vmax;
                top: 13vmax;
                left: 2vmax;
                border: 2px solid var(--main-color);
                border-radius: 50%;
                background-size: cover;
                background-color: var(--primary-bg);
                background-position: center;
            }
            #editUserInfo,
            #chat {
                position: absolute;
                top: 21vmax;
                left: 45vmax;
                width: 13vmax;
                height: 4vmax;
                border-radius: 2vmax;
                font-size: 1.4vmax;
                font-weight: bold;
                border: 1px solid #d4dde1;
                transition: all 0.2s;
                &:hover {
                    background-color: #e7e7e8;
                }
            }
            #chat {
                top: 26vmax;
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
                transition: all 0.2s;
                &:hover {
                    background-color: #e7e7e8;
                }
                &.active {
                    background-color: #000;
                    color: white;
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
                    text-decoration: none;
                    color: #677682;
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
