<template>
    <div
        class="card animate__animated animate__faster animate__flipInX"
        @click="goTweetInfo()"
    >
        <div
            v-if="
                store.userInfo.userName == 'admin' ||
                comment.userName == store.userInfo.userName
            "
            class="delBtn iconfont icon-close"
            @click.stop="delTweet"
        ></div>
        <div
            class="avatar"
            @click.stop="goAccount"
        >
            <span :style="avatarUrlStyle"></span>
        </div>
        <div class="mainArea">
            <div class="top">
                <span class="nick">{{ comment.nickName }}</span>
                <span class="username">@{{ comment.userName }}</span>
                -
                <span class="time">{{ timeComputed }}</span>
            </div>
            <div class="content">
                <div
                    class="text"
                    v-html="contentComputed"
                ></div>
            </div>
            <div class="bottom">
                <span class="comment">
                    <i class="iconfont icon-pinglun"></i>
                    <span class="number">{{ comment.commentCount }}</span>
                </span>
                <span class="forward">
                    <i class="iconfont icon-zhuanfa"></i>
                    <!--todo <span class="number">{{ teitter.forwardCount }}</span> -->
                    <span class="number">0</span>
                </span>
                <span class="likeSpan">
                    <span
                        class="like-button"
                        @click.stop="likeBtn(comment.tweetId)"
                    >
                        <div class="heart-bg">
                            <div
                                class="heart-icon"
                                :class="{ liked: comment.likeStatus }"
                            ></div>
                        </div>
                        <div class="likes-amount">{{ comment.likeCount }}</div>
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
                        :tweet-i-d="comment.tweetId.toString()"
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
    import router from "@/router";
    import type { Comment } from "@/interfaces/pubInterface";
    import { marked } from "marked";
    import DOMPurify from "dompurify";
    import { useTeitterStore } from "@/stores/teitter";
    import { like, reqDelTweet, unLike } from "@/api";
    import JSConfetti from "js-confetti";
    const jsConfetti = new JSConfetti();

    const sendMsg = inject("sendMsg") as Function;
    const store = useTeitterStore();
    const emit = defineEmits(["flush"]);

    const isShowShareCard = ref(false);

    dayjs.extend(RelativeTime);
    dayjs.locale("zh-cn");
    const props = defineProps<{ comment: Comment }>();
    const { comment } = toRefs(props);
    // console.log(comment);
    const contentComputed = computed(() => {
        return DOMPurify.sanitize(
            marked.parse(comment.value.content || "", {
                mangle: false,
                headerIds: false,
            }),
        );
    });
    const timeComputed = computed(() => {
        return dayjs(Number(comment.value.createDate)).fromNow();
    });

    const avatarUrlStyle = computed(() => {
        return `background-image: url(${comment.value.avatarUrl}); `;
    });

    const goAccount = () => {
        router.push({
            name: "account",
            params: {
                userId: comment.value.uid.toString(),
            },
        });
    };
    const goTweetInfo = () => {
        console.log(props.comment.tweetId.toString());

        router.push({
            name: "tweetInfo",
            params: {
                tweetId: props.comment.tweetId.toString(),
            },
        });
    };
    async function likeBtn(id: bigint) {
        if (!store.userInfo.isLogin) {
            // 去登陆页面
            router.push({
                name: "login",
            });
        } else {
            if (comment.value.likeStatus) {
                //取消点赞的逻辑
                const res = await unLike(id);
                if (res == "ok") {
                    sendMsg("取消点赞成功 " + id.toString());
                    comment.value.likeStatus = false;
                    comment.value.likeCount--;
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
                    comment.value.likeStatus = true;
                    comment.value.likeCount++;
                } else {
                    // alert(res);
                    sendMsg(res, true);
                }
            }
        }
    }
    const delTweet = async () => {
        await reqDelTweet(comment.value.tweetId);

        emit("flush");
    };
</script>

<style scoped lang="scss">
    .card {
        display: flex;
        min-height: 5vmax;
        padding: 1vmax;
        transition: all 0.2s;
        &:hover {
            background-color: #f7f7f7;
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
            span {
                display: block;
                width: 2.4vmax;
                height: 2.4vmax;
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
                font-size: 1.25vmax;

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
                font-size: 1.2vmax;
                margin-top: 0.3vmax;
                color: #0f1419;
                margin-bottom: 0.5vmax;
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
