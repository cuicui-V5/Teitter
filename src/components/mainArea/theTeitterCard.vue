<template>
    <div class="card animate__animated animate__faster animate__bounceInUp">
        <div
            class="avatar"
            @click="goAccount"
        >
            <span :style="avatarUrlStyle"></span>
        </div>
        <div
            class="mainArea"
            @click="goTweetInfo($event)"
        >
            <div class="top">
                <span class="nick">{{ teitter.nickName }}</span>
                <span class="username">@{{ teitter.userName }}</span>
                -
                <span class="time">{{ timeComputed }}</span>
            </div>
            <div class="content">
                {{ teitter.content }}
                <br />
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
                    @click.prevent="clickVideo"
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
                    <!--todo <span class="number">{{ teitter.commentCount }}</span> -->
                    <span class="number">0</span>
                </span>
                <span class="forward">
                    <i class="iconfont icon-zhuanfa"></i>
                    <!--todo <span class="number">{{ teitter.forwardCount }}</span> -->
                    <span class="number">0</span>
                </span>
                <span class="likeSpan">
                    <span
                        class="like-button"
                        @click="likeBtn(teitter.tweetId)"
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

                <span class="share">
                    <i class="iconfont icon-fenxiang"></i>
                    <span class="number"></span>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import dayjs from "dayjs";
    import RelativeTime from "dayjs/plugin/relativeTime";
    import "dayjs/locale/zh-cn";
    import { computed, inject, ref, toRefs } from "vue";
    import type { teitter } from "@/interfaces/pubInterface";
    import { like, unLike } from "@/api";
    import router from "@/router";
    const sendMsg = inject("sendMsg") as Function;
    const video = ref<HTMLVideoElement>();

    dayjs.extend(RelativeTime);
    dayjs.locale("zh-cn");

    const props = defineProps<{
        teitter: teitter;
    }>();
    const { teitter } = toRefs(props);

    const timeComputed = computed(() => {
        return dayjs(Number(teitter.value.createDate)).fromNow();
    });

    const avatarUrlStyle = computed(() => {
        return `background-image: url(${teitter.value.avatarUrl}); `;
    });

    async function likeBtn(id: bigint) {
        if (teitter.value.likeStatus) {
            //?????????????????????
            const res = await unLike(id);
            if (res == "ok") {
                sendMsg("?????????????????? " + id.toString());
                teitter.value.likeStatus = false;
                teitter.value.likeCount--;
            } else {
                sendMsg(res, true);

                // alert(res);
            }
        } else {
            // ???????????????
            const res = await like(id);
            if (res == "ok") {
                sendMsg("???????????? " + id.toString());

                // alert("????????????");
                teitter.value.likeStatus = true;
                teitter.value.likeCount++;
            } else {
                // alert(res);
                sendMsg(res, true);
            }
        }
    }
    const blackList = [
        "iconfont icon-pinglun",
        "iconfont icon-zhuanfa",
        "heart-icon",
        "heart-icon liked",
        "iconfont icon-fenxiang",
        "likes-amount",
        "video",
        "img",
    ];
    const goTweetInfo = (e: MouseEvent) => {
        if (!blackList.includes((e.target as HTMLElement).className)) {
            router.push({
                name: "tweetInfo",
                params: {
                    tweetId: teitter.value.tweetId.toString(),
                },
            });
        }
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
</script>

<style scoped lang="scss">
    .card {
        display: flex;
        min-height: 10vmax;
        padding: 1vmax;
        transition: all 0.2s;
        &:hover {
            background-color: #f7f7f7;
        }
        .avatar {
            width: 7vmax;
            span {
                display: block;
                width: 5.2vmax;
                height: 5.2vmax;
                margin: 0 auto;
                border-radius: 50%;
                // background-image: url(../../img/defaultAvatar.jpg);
                background-size: cover;
                background-position: center;
            }
        }
        .mainArea {
            flex: 1;
            .top {
                font-size: 1.45vmax;

                .nick {
                    color: #0f1419;
                    font-weight: bold;
                }
                .username {
                    margin-left: 4px;
                    color: #536471;
                }
                .time {
                    color: #536471;
                }
            }
            .content {
                padding: 0.3vmax;
                font-size: 1.5vmax;
                margin-top: 0.3vmax;
                color: #0f1419;
                margin-bottom: 2.5vmax;
                img {
                    margin-top: 1vmax;
                    border-radius: 20px;

                    width: 80%;
                }
                video {
                    margin-top: 1vmax;
                    border-radius: 20px;

                    width: 80%;
                }
            }
            .bottom {
                display: flex;
                justify-content: space-between;
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
                    position: relative;
                    .like-button {
                        display: block;
                        position: absolute;
                        top: -50%;
                        left: -2vmax;
                        display: flex;
                        align-items: center;

                        .heart-icon {
                            height: 6vmax;
                            width: 6vmax;
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
                            height: 4vmax;
                            width: 4vmax;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 100ms ease;
                            &:hover {
                                background: rgba(255, 192, 200, 0.7);
                            }
                        }

                        .likes-amount {
                            font-size: 1.2vmax;
                            font-family: "Roboto", sans-serif;
                            color: #888;
                            font-weight: 900;
                            margin-left: 6px;
                        }
                    }
                }

                .share {
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
                        font-size: 1.82vmax;
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
