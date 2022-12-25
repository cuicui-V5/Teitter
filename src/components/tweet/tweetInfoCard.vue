<template>
    <div class="twtCard">
        <div class="top">
            <div class="avatar">
                <span></span>
            </div>
            <div class="userinfo">
                <span class="nickname">牛逼</span>
                <span class="username">@美尻</span>
            </div>
        </div>
        <div class="content">
            {{ tweetInfo?.content }}
        </div>
        <div class="info">
            <div class="time">下午12:34 · 2022年12月25日</div>
            <div class="detail">
                <span class="view">
                    <i>10.7万</i>
                    查看
                </span>
                <span class="forward">
                    <i>20</i>
                    转推
                </span>
                <span class="ref">
                    <i>4</i>
                    引用推文
                </span>
                <span class="like">
                    <i>299</i>
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
                <span class="like-button">
                    <!-- @click="likeBtn(teitter.tweetId)" -->
                    <div class="heart-bg">
                        <div
                            class="heart-icon"
                            :class="{}"
                        ></div>
                        <!-- liked: teitter.likeStatus, -->
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

    const { tweetInfo } = defineProps<{
        tweetInfo: Tweet | undefined;
    }>();
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
                    background-image: url("https://picx.zhimg.com/v2-d7be5fcd1fb35461336a3db94ca1ff9c_l.jpg?source=32738c0c");
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
            margin-top: 1vmax;
            font-size: 2.4vmax;
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
