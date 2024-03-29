<template>
    <div class="twtCard">
        <div class="top">
            <div
                class="avatar"
                @click="goAccount"
            >
                <span :style="avatarUrlStyle"></span>
            </div>
            <div class="userinfo">
                <span class="nickname">{{ tweetInfo?.nickName }}</span>
                <span class="username">@{{ tweetInfo?.userName }}</span>
            </div>
        </div>
        <div class="content">
            <div
                v-html="contentComputed"
                class="text"
            ></div>
            <img
                v-if="tweetInfo.tweetImg"
                :src="tweetInfo.tweetImg"
                alt=""
            />
            <video
                class="video"
                :src="tweetInfo.tweetVideo"
                v-if="tweetInfo.tweetVideo"
                controls
                autoplay
                muted
                loop
                @click.prevent="clickVideo"
                ref="video"
                playsinline="true"
                webkit-playsinline=""
                x5-playsinline=""
                x-webkit-airplay="allow"
            ></video>
        </div>
        <div class="info">
            <div class="time">{{ timeComputed }}</div>
            <div class="detail">
                <span class="view">
                    <i>0</i>
                    查看
                </span>
                <span class="forward">
                    <i>0</i>
                    转推
                </span>
                <span class="ref">
                    <i>{{ 0 }}</i>
                    引用推文
                </span>
                <span class="like">
                    <i>{{ tweetInfo?.likeCount }}</i>
                    喜欢次数
                </span>
            </div>
        </div>
        <div class="bottom">
            <span class="comment">
                <i class="iconfont icon-pinglun"></i>
            </span>
            <span class="forward">
                <i class="iconfont icon-zhuanfa"></i>
            </span>
            <span class="likeSpan">
                <span
                    class="like-button"
                    @click="likeBtn(tweetInfo.tweetId)"
                >
                    <div class="heart-bg">
                        <div
                            class="heart-icon"
                            :class="{
                                liked: tweetInfo?.likeStatus,
                            }"
                        ></div>
                    </div>
                </span>
            </span>
            <span
                class="share"
                @click.stop="isShowShareCard = !isShowShareCard"
            >
                <i class="iconfont icon-fenxiang"></i>
                <span class="number"></span>
                <shareCard
                    v-if="isShowShareCard"
                    :tweet-i-d="tweetInfo.tweetId.toString()"
                ></shareCard>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import shareCard from "@/components/tweet/shareCard.vue";

    import type { Tweet } from "@/interfaces/pubInterface";
    import { computed, inject, ref, toRefs } from "vue";
    import dayjs from "dayjs";
    import "dayjs/locale/zh-cn";
    import { like, unLike } from "@/api";
    import { useTeitterStore } from "@/stores/teitter";
    import router from "@/router";
    import { marked } from "marked";
    import DOMPurify from "dompurify";
    import JSConfetti from "js-confetti";
    const jsConfetti = new JSConfetti();
    const sendMsg = inject("sendMsg") as Function;
    const store = useTeitterStore();
    dayjs.locale("zh-cn");
    const video = ref<HTMLVideoElement>();

    const props = defineProps<{
        tweetInfo: Tweet;
    }>();
    const isShowShareCard = ref(false);

    const { tweetInfo } = toRefs(props);
    // console.log("------", tweetInfo);
    const contentComputed = computed(() => {
        return DOMPurify.sanitize(
            marked.parse(tweetInfo.value.content || "", {
                mangle: false,
                headerIds: false,
            }),
        );
    });
    const avatarUrlStyle = computed(() => {
        return `background-image: url(${tweetInfo.value.avatarUrl}); `;
    });
    const timeComputed = computed(() => {
        return dayjs(Number(tweetInfo.value.createDate)).format(
            "AHH:mm · YYYY年MM月DD日",
        );
    });
    async function likeBtn(id: bigint) {
        if (!store.userInfo.isLogin) {
            // 去登陆页面
            router.push({
                name: "login",
            });
        } else {
            if (tweetInfo.value.likeStatus) {
                //取消点赞的逻辑
                const res = await unLike(id);
                if (res == "ok") {
                    sendMsg("取消点赞成功 " + id.toString());
                    tweetInfo.value.likeStatus = false;
                    tweetInfo.value.likeCount--;
                    // 更改store中的推文点赞状态
                    store.teitters.forEach(item => {
                        if (
                            item.tweetId.toString() ===
                            tweetInfo.value.tweetId.toString()
                        ) {
                            item.likeStatus = false;
                            item.likeCount--;
                        }
                    });
                } else {
                    sendMsg(res, true);

                    // alert(res);
                }
            } else {
                // 点赞的逻辑
                const res = await like(id);
                if (res == "ok") {
                    sendMsg("点赞成功 " + id.toString());
                    jsConfetti.addConfetti({
                        confettiRadius: 6,
                        confettiNumber: 500,
                    });
                    // alert("点赞成功");
                    tweetInfo.value.likeStatus = true;
                    tweetInfo.value.likeCount++;
                    // 更改store中的推文点赞状态
                    store.teitters.forEach(item => {
                        if (
                            item.tweetId.toString() ===
                            tweetInfo.value.tweetId.toString()
                        ) {
                            item.likeStatus = true;
                            item.likeCount++;
                        }
                    });
                } else {
                    // alert(res);
                    sendMsg(res, true);
                }
            }
        }
    }
    const goAccount = () => {
        router.push({
            name: "account",
            params: {
                userId: tweetInfo.value.uid.toString(),
            },
        });
    };
    const clickVideo = () => {
        if (video.value) {
            if (video.value.muted) {
                video.value.muted = false;
            } else {
                if (video.value.paused) {
                    video.value.play();
                } else {
                    video.value.pause();
                }
            }
        }
    };
</script>

<style scoped lang="less">
    .twtCard {
        padding: 1vmax;
        background-color: var(--secondary-bg);
        .top {
            display: flex;
            .avatar {
                width: 4vmax;
                z-index: 10;
                span {
                    display: block;
                    width: 2.7vmax;
                    height: 2.7vmax;
                    margin: 0 auto;
                    border-radius: 50%;
                    background-size: cover;
                    transition: all 0.2s;
                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }
            .userinfo {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                .nickname {
                    font-size: 1.4vmax;
                    font-weight: bold;
                }
                .username {
                    font-size: 1vmax;

                    color: var(--text-second);
                }
            }
        }
        .content {
            margin-top: 1vmax;
            font-size: 1.4vmax;
            img {
                border-radius: 20px;

                margin-top: 1vmax;
                width: 80%;
            }
            video {
                border-radius: 20px;

                margin-top: 1vmax;
                width: 80%;
            }
        }
        .info {
            .time {
                padding-top: 1vmax;

                font-size: 1.2vmax;
                border-bottom: 1px solid var(--secondary-bg);
            }
            .detail {
                font-size: 1.2vmax;

                i {
                    font-weight: bold;
                }
            }
        }
        .bottom {
            padding: 1vmax 0;
            border: 1px solid var(--secondary-bg);
            display: flex;
            justify-content: space-around;
            font-size: 1.45vmax;
            @keyframes like-anim {
                to {
                    background-position: right;
                }
            }
            @keyframes unLike-anim {
                from {
                    background-position: right;
                }
                to {
                    background-position: left;
                }
            }
            .likeSpan {
                width: 4vmax;
                // height: 4vmax;
                position: relative;
                .like-button {
                    display: block;
                    position: absolute;
                    display: flex;
                    align-items: center;
                    bottom: -0.5vmax;

                    .heart-icon {
                        height: 5vmax;
                        width: 5vmax;
                        background: url("@/img/heart.png");
                        background-size: cover;
                        background-position: left;
                        cursor: pointer;
                        position: absolute;
                    }
                    .heart-icon.liked {
                        animation: like-anim 0.7s steps(28) forwards;
                    }

                    .heart-bg {
                        background: rgba(255, 192, 200, 0);
                        border-radius: 50%;
                        height: 3vmax;
                        width: 3vmax;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 100ms ease;
                        &:hover {
                            background: rgba(255, 192, 200, 0.7);
                        }
                    }

                    .likes-amount {
                        font-size: 1vmax;
                        margin-left: 6px;
                    }
                }
            }

            .share {
                position: relative;
                margin-right: 10vmax;
            }

            & > span {
                &:hover i {
                    background-color: #e1eef6;
                }
                &:hover span {
                    color: #46acf1;
                }
                i {
                    padding: 0.5vmax;
                    font-size: 1.5vmax;
                    font-weight: bold;
                    border-radius: 50%;
                    transition: all 0.2s;
                }
                span {
                    transition: all 0.2s;
                }
            }
        }
    }
</style>
