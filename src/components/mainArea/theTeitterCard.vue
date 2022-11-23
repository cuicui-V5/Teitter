<template>
    <div class="card animate__animated animate__faster animate__flipInX">
        <div class="avatar">
            <span></span>
        </div>
        <div class="mainArea">
            <div class="top">
                <span class="nick">{{ teitter.nickName }}</span>
                <span class="username">{{ teitter.userName }}</span>
                -
                <span class="time">{{ timeComputed }}</span>
            </div>
            <div class="content">{{ teitter.content }}</div>
            <div class="bottom">
                <span class="comment">
                    <i class="iconfont icon-pinglun"></i>
                    <span class="number">{{ teitter.commentCount }}</span>
                </span>
                <span class="forward">
                    <i class="iconfont icon-zhuanfa"></i>
                    <span class="number">{{ teitter.forwardCount }}</span>
                </span>
                <span class="like">
                    <i class="iconfont icon-xihuan"></i>
                    <span class="number">{{ teitter.likeCount }}</span>
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
    import { computed } from "vue";
    import type { teitter } from "@/interfaces/pubInterface";

    dayjs.extend(RelativeTime);
    dayjs.locale("zh-cn");

    const { teitter } = defineProps<{
        teitter: teitter;
    }>();

    const timeComputed = computed(() => {
        return dayjs(Number(teitter.updatetime)).fromNow();
    });
</script>

<style scoped lang="scss">
    .card {
        display: flex;
        min-height: 10vw;
        padding: 1vw;
        transition: all 0.2s;
        &:hover {
            background-color: #f7f7f7;
        }
        .avatar {
            width: 7vw;
            span {
                display: block;
                width: 5.2vw;
                height: 5.2vw;
                margin: 0 auto;
                border-radius: 50%;
                background-image: url(../../img/defaultAvatar.jpg);
                background-size: contain;
            }
        }
        .mainArea {
            flex: 1;
            .top {
                font-size: 1.45vw;

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
                padding: 0.3vw;
                font-size: 1.5vw;
                margin-top: 0.3vw;
                color: #0f1419;
            }
            .bottom {
                margin-top: 2.5vw;
                display: flex;
                justify-content: space-between;
                font-size: 1.45vw;

                .share {
                    margin-right: 10vw;
                }

                & > span {
                    &:hover i {
                        background-color: #e1eef6;
                    }
                    &:hover span {
                        color: #46acf1;
                    }
                    i {
                        padding: 0.5vw;
                        font-size: 1.82vw;
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
