<template>
    <div class="card animate__animated animate__faster animate__flipInX">
        <div class="avatar">
            <span :style="avatarUrlStyle"></span>
        </div>
        <div class="mainArea">
            <div class="top">
                <span class="nick">{{ teitter.nickName }}</span>
                <span class="username">@{{ teitter.userName }}</span>
                -
                <span class="time">{{ timeComputed }}</span>
            </div>
            <div class="content">{{ teitter.content }}</div>
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
                <span
                    class="likeSpan"
                    @click="likeBtn(teitter.tweetId)"
                >
                    <i
                        class="iconfont icon-xihuan"
                        :class="{
                            like: !teitter.likeStatus,
                        }"
                    ></i>
                    <i
                        class="iconfont icon-likefill"
                        :class="{
                            liked: teitter.likeStatus,
                        }"
                    ></i>
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
    import { like, unLike } from "@/api";

    dayjs.extend(RelativeTime);
    dayjs.locale("zh-cn");

    const { teitter } = defineProps<{
        teitter: teitter;
    }>();

    const timeComputed = computed(() => {
        return dayjs(Number(teitter.createDate)).fromNow();
    });

    const avatarUrlStyle = computed(() => {
        return `background-image: url(${teitter.avatarUrl}); `;
    });

    async function likeBtn(id: number) {
        if (teitter.likeStatus) {
            //取消点赞的逻辑
            const res = await unLike(id);
            if (res == "ok") {
                console.log("取消点赞成功 " + id.toString());
                teitter.likeStatus = false;
            } else {
                alert(res);
            }
        } else {
            // 点赞的逻辑
            const res = await like(id);
            if (res == "ok") {
                // alert("点赞成功");
                console.log("点赞成功 " + id.toString());
                teitter.likeStatus = true;
            } else {
                alert(res);
            }
        }
    }
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
            }
            .bottom {
                margin-top: 2.5vmax;
                display: flex;
                justify-content: space-between;
                font-size: 1.45vmax;
                .likeSpan {
                    i {
                        display: none;
                    }
                    .like {
                        display: inline;
                    }
                    .liked {
                        display: inline;
                        color: red;
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
