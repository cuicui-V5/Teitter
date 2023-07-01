<template>
    <!-- animate__animated animate__faster animate__bounceInUp -->
    <div class="card">
        <div
            v-if="
                store.userInfo.userName == 'admin' ||
                teitter.userName == store.userInfo.userName
            "
            class="delBtn iconfont icon-close"
            @click.stop="delTweet"
        ></div>
        <div
            class="avatar"
            @click.stop="goAccount"
        >
            <span
                class="avatarSpan"
                :style="avatarUrlStyle"
            ></span>
            <span
                class="dividing"
                v-if="isShowDividing"
            ></span>
        </div>
        <div
            class="mainArea"
            @click.stop="goTweetInfo($event)"
        >
            <div class="top">
                <span class="nick">{{ teitter.nickName }}</span>
                <span class="username">@{{ teitter.userName }}</span>
                -
                <span class="time">{{ timeComputed }}</span>
            </div>
            <div
                class="reply-to"
                v-if="replyTo"
            >
                回复
                <span style="color: var(--text-second)">
                    {{ replyTo }}
                </span>
            </div>
            <div class="content">
                <!-- {{ teitter.content }} -->
                <!-- {{ contentComputed }} -->
                <div
                    v-html="contentComputed"
                    class="text"
                ></div>
                <img
                    class="img"
                    v-if="teitter.tweetImg"
                    :src="teitter.tweetImg"
                    loading="lazy"
                />
                <video
                    class="video"
                    :src="teitter.tweetVideo"
                    v-if="teitter.tweetVideo"
                    controls
                    autoplay
                    muted
                    loop
                    @click.stop.prevent="clickVideo"
                    ref="video"
                    playsinline="true"
                    webkit-playsinline=""
                    x5-playsinline=""
                    x-webkit-airplay="allow"
                ></video>
            </div>
            <div class="bottom">
                <span class="comment">
                    <i class="iconfont icon-pinglun"></i>
                    <span class="number">{{ teitter.commentCount }}</span>
                </span>
                <span class="forward">
                    <i class="iconfont icon-zhuanfa"></i>
                    <span class="number">0</span>
                </span>
                <span class="likeSpan">
                    <span
                        class="like-button"
                        @click.stop="likeBtn(teitter.tweetId)"
                    >
                        <div class="heart-bg">
                            <div
                                class="heart-icon"
                                :class="{
                                    liked: teitter.likeStatus,
                                }"
                            ></div>
                        </div>
                        <div class="likes-amount">{{ teitter.likeCount }}</div>
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
                        :tweet-i-d="teitter.tweetId.toString()"
                    ></shareCard>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import shareCard from "@/components/tweet/shareCard.vue";
    import dayjs from "dayjs";
    import RelativeTime from "dayjs/plugin/relativeTime";
    import "dayjs/locale/zh-cn";
    import { computed, inject, ref, toRefs } from "vue";
    import type { teitter, Tweet } from "@/interfaces/pubInterface";
    import { like, reqDelTweet, unLike } from "@/api";
    import router from "@/router";
    import { useTeitterStore } from "@/stores/teitter";
    import { marked } from "marked";
    import DOMPurify from "dompurify";
    import JSConfetti from "js-confetti";
    const jsConfetti = new JSConfetti();
    const sendMsg = inject("sendMsg") as Function;
    const video = ref<HTMLVideoElement>();
    const isShowShareCard = ref(false);

    dayjs.extend(RelativeTime);
    dayjs.locale("zh-cn");

    const props = defineProps<{
        teitter: Tweet;
        replyTo?: string;
        isShowDividing?: boolean;
    }>();
    const emit = defineEmits(["flush"]);
    const { teitter } = toRefs(props);

    const timeComputed = computed(() => {
        return dayjs(Number(teitter.value.createDate)).fromNow();
    });
    const contentComputed = computed(() => {
        return DOMPurify.sanitize(
            marked.parse(teitter.value.content || "", {
                mangle: false,
                headerIds: false,
            }),
        );
    });

    const avatarUrlStyle = computed(() => {
        return `background-image: url(${teitter.value.avatarUrl}); `;
    });
    const store = useTeitterStore();

    async function likeBtn(id: bigint) {
        if (!store.userInfo.isLogin) {
            // 去登陆页面
            router.push({
                name: "login",
            });
        } else {
            if (teitter.value.likeStatus) {
                //取消点赞的逻辑
                const res = await unLike(id);
                if (res == "ok") {
                    sendMsg("取消点赞成功 " + id.toString());
                    teitter.value.likeStatus = false;
                    teitter.value.likeCount--;
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
                        confettiNumber: 1000,
                    });
                    // alert("点赞成功");
                    teitter.value.likeStatus = true;
                    teitter.value.likeCount++;
                } else {
                    // alert(res);
                    sendMsg(res, true);
                }
            }
        }
    }

    const goTweetInfo = (e: MouseEvent) => {
        router.push({
            name: "tweetInfo",
            params: {
                tweetId: teitter.value.tweetId.toString(),
            },
        });
    };
    const goAccount = () => {
        router.push({
            name: "account",
            params: {
                userId: teitter.value.uid.toString(),
            },
        });
    };
    const clickVideo = () => {
        if (video.value) {
            if (video.value.muted) {
                video.value.muted = false;
                video.value.play();
            } else {
                if (video.value.paused) {
                    video.value.play();
                } else {
                    video.value.pause();
                }
            }
        }
    };
    const delTweet = async () => {
        await reqDelTweet(teitter.value.tweetId);
        let index = 0;
        for (const tweet of store.teitters) {
            index++;
            if (tweet.tweetId.toString() === teitter.value.tweetId.toString()) {
                store.teitters.splice(index - 1, 1);
            }
            break;
        }
        emit("flush");
    };
</script>

<style scoped lang="scss">
    .card {
        position: relative;
        display: flex;
        min-height: 5vmax;
        padding: 1vmax;
        transition: all 0.2s;
        background-color: var(--primary-bg);
        color: var(--text-main);
        &:hover {
            background-color: var(--secondary-bg);
        }
        &:hover .delBtn {
            display: block;
        }
        .delBtn {
            display: none;
            position: absolute;
            right: 0;
            top: 0;
            font-size: 1.5vmax;
            width: 1.5vmax;
            height: 1.5vmax;
            padding: 0.5vmax;
            border-radius: 50%;
            transition: all 0.2s;
            &:hover {
                background-color: #ff8484c4;
                color: #e1eef6;
            }
        }
        .avatar {
            width: 4vmax;
            position: relative;
            .avatarSpan {
                display: block;
                width: 3.2vmax;
                height: 3.2vmax;
                margin: 0 auto;
                border-radius: 50%;
                // background-image: url(../../img/defaultAvatar.jpg);
                background-size: cover;
                background-position: center;
                transition: all 0.3s;
                &:hover {
                    transform: scale(1.1);
                }
            }
            .dividing {
                position: absolute;
                left: 50%;
                top: 3.3vmax;
                display: block;
                width: 0.2vmax;
                height: 100%;
                background-color: var(--text-main);
                opacity: 40%;
            }
        }
        .mainArea {
            flex: 1;
            .top {
                font-size: 1.15vmax;

                .nick {
                    font-weight: bold;
                }
                .username {
                    margin-left: 4px;
                    color: var(--text-second);
                }
                .time {
                    color: var(--text-second);
                }
            }
            .reply-to {
                font-size: 1vmax;
            }
            .content {
                padding: 0.3vmax;
                font-size: 1.2vmax;
                // margin-top: 0.3vmax;
                margin-bottom: 0.2vmax;
                :global(code) {
                    display: inline-block;
                    padding: 8px;
                    background: #ffeff0;
                    color: var(--text-code);
                    font-family: "Fira Code", monospace;
                    font-size: 1vmax;
                    line-height: 1.4;
                    border-radius: 4px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                :global(.text ol) {
                    padding-left: 20px; /* 根据需要自定义缩进值 */
                }
                :global(.text ul) {
                    padding-left: 20px; /* 根据需要自定义缩进值 */
                }

                img {
                    margin-top: 1vmax;
                    border-radius: 20px;
                    max-height: 80vh;
                }
                video {
                    margin-top: 1vmax;
                    border-radius: 20px;
                    max-height: 80vh;
                }
            }
            .bottom {
                display: flex;

                justify-content: space-between;
                font-size: 1vmax;
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
                    position: relative;
                    .like-button {
                        display: block;
                        position: absolute;
                        top: -50%;
                        left: -2vmax;
                        display: flex;
                        align-items: center;

                        .heart-icon {
                            height: 4vmax;
                            width: 4vmax;
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
                            height: 2.5vmax;
                            width: 2.5vmax;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.2s ease;
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
                        // padding: 0.5vmax;
                        font-size: 1.2vmax;
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
    }
</style>
