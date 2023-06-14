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
            {{ tweetInfo?.content }}
            <br />
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
            <span class="share">
                <i class="iconfont icon-fenxiang"></i>
                <span class="number"></span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Tweet } from "@/interfaces/pubInterface";
    import { computed, inject, ref, toRefs } from "vue";
    import dayjs from "dayjs";
    import "dayjs/locale/zh-cn";
    import { like, unLike } from "@/api";
    import { useTeitterStore } from "@/stores/teitter";
    import router from "@/router";
    const sendMsg = inject("sendMsg") as Function;
    const store = useTeitterStore();
    dayjs.locale("zh-cn");
    const video = ref<HTMLVideoElement>();

    const props = defineProps<{
        tweetInfo: Tweet;
    }>();
    const { tweetInfo } = toRefs(props);
    // console.log("------", tweetInfo);

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
        .top {
            display: flex;
            .avatar {
                span {
                    display: block;
                    width: 5vmax;
                    height: 5vmax;
                    border-radius: 50%;
                    background-size: cover;
                }
            }
            .userinfo {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                margin-left: 1.5vmax;
                .nickname {
                    font-size: 2vmax;
                    font-weight: bold;
                }
                .username {
                    color: #546572;
                }
            }
        }
        .content {
            margin-top: 2vmax;
            font-size: 2.4vmax;
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
                padding: 3vmax 0;

                font-size: 1.5vmax;
                border-bottom: 1px solid #eff3f4;
            }
            .detail {
                margin-top: 2vmax;
                font-size: 1.5vmax;

                i {
                    font-weight: bold;
                }
            }
        }
        .bottom {
            padding: 3vmax 0;
            border: 1px solid #eff3f4;
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
                width: 5vmax;
                height: 5vmax;
                position: relative;
                .like-button {
                    display: block;
                    position: absolute;
                    display: flex;
                    align-items: center;
                    bottom: 1.5vmax;

                    .heart-icon {
                        height: 8vmax;
                        width: 8vmax;
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
                    font-size: 3vmax;
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
