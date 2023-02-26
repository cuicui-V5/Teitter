<template>
    <div class="warp">
        <div class="left">
            <div class="icon iconfont icon-xihuan1"></div>
        </div>
        <div class="right">
            <div class="top">
                <div class="avatar">
                    <span class="avatar"></span>
                </div>
            </div>
            <div class="msg">
                <strong>xxx</strong>
                喜欢了你的回复
            </div>
            <div class="content">推文内容</div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "noticeCard",
    };
</script>
<script setup lang="ts"></script>

<style scoped lang="less">
    .warp {
        border-bottom: 1px solid #f7f7f7;
        padding: 3vmax;
        background-color: #fff;
        transition: all 0.2s;
        display: flex;
        .left {
            .icon {
                font-size: 3vmax;
                color: #f91880;
            }
        }

        .right {
            margin-left: 2vmax;
            .top {
                .avatar {
                    span {
                        display: block;
                        width: 3vmax;
                        height: 3vmax;
                        background-size: cover;
                        border-radius: 50%;
                        background-image: url("https://www.heron.love:8888/teitterfile/images/16d50a5a-f22e-4735-8334-df436831e9fb.webp");
                    }
                }
            }
            .msg {
                margin: 1vmax 0;
                font-size: 1.5vmax;
                color: #60707c;
            }
            .content {
                font-size: 1.3vmax;
                color: #60707c;
            }
        }
    }
    .warp:hover {
        background-color: #f7f7f7;
    }
</style>
