<template>
    <div class="card animate__animated animate__faster animate__flipInX">
        <div
            class="avatar"
            @click="goAccount"
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
            <div class="content">{{ comment.commentContent }}</div>
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
                    <span class="like-button">
                        <!-- @click="likeBtn(teitter.tweetId)" -->
                        <div class="heart-bg">
                            <div
                                class="heart-icon"
                                :class="{}"
                            ></div>
                            <!-- liked: teitter.likeStatus, -->
                        </div>
                        <!-- <div class="likes-amount">{{ teitter.likeCount }}</div> -->
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
    import { computed, inject, toRefs } from "vue";
    import type { teitter } from "@/interfaces/pubInterface";
    import { like, unLike } from "@/api";
    import router from "@/router";
    import { useTeitterStore } from "@/stores/teitter";
    import type { Comment } from "@/interfaces/pubInterface";

    const sendMsg = inject("sendMsg") as Function;

    dayjs.extend(RelativeTime);
    dayjs.locale("zh-cn");
    const props = defineProps<{ comment: Comment }>();
    const { comment } = toRefs(props);
    // console.log(comment);

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
