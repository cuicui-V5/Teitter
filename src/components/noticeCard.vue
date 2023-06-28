<template>
    <div
        class="warp"
        :class="{
            read: !status,
        }"
        @click="goTwt()"
    >
        <div class="left">
            <div
                class="icon iconfont"
                :class="{
                    'icon-xihuan1': type == 1,
                    'icon-pinglun1': type == 2,
                    'icon-account1': type == 3 || type == 5,
                }"
            ></div>
        </div>
        <div class="right">
            <div class="top">
                <div class="avatar">
                    <span
                        class="avatar"
                        :style="{
                            backgroundImage: `url(${avatarUrl})`,
                        }"
                    ></span>
                </div>
            </div>
            <div class="msg">
                <strong>{{ nickName }}</strong>
                {{ msg }}
            </div>
            <div class="content">{{ type == 2 ? comment : content }}</div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "noticeCard",
    };
</script>
<script setup lang="ts">
    import { reqHaveRead } from "@/api";
    import router from "@/router";
    import { useTeitterStore } from "@/stores/teitter";
    import { computed, toRefs } from "vue";

    const store = useTeitterStore();
    const props = defineProps<{
        uid?: bigint;
        avatarUrl?: string;
        nickName?: string;
        type?: number;
        content?: string;
        comment?: string;
        status?: boolean;
        tweetId?: bigint;
        messageId: bigint;
    }>();
    const { type, uid, content, status, tweetId, messageId } = toRefs(props);

    const msg = computed(() => {
        switch (type?.value) {
            case 1:
                return "喜欢了你的推文";
            case 2:
                return "评论了你";
            case 3:
                return "关注了你";
            case 4:
                return "回复了你";
            case 5:
                return "你关注的人发表了新推文";

            default:
                return "未知通知";
        }
    });

    const goTwt = async () => {
        // 首先设置已读
        const res = await reqHaveRead(messageId.value);
        console.log(res);
        store.getNotice();
        if (type?.value == 3) {
            router.push({
                name: "account",
                params: {
                    userId: uid?.value!.toString(),
                },
            });
        }
        router.push({
            name: "tweetInfo",
            params: {
                tweetId: tweetId?.value!.toString(),
            },
        });
    };
</script>

<style scoped lang="less">
    .warp {
        border-bottom: 1px solid var(--secondary-bg);
        padding: 1.5vmax 3vmax;
        background-color: var(--primary-bg);
        transition: all 0.2s;
        display: flex;
        .left {
            .icon {
                font-size: 3vmax;
            }
            .icon-xihuan1 {
                color: #f91880;
            }
            .icon-pinglun1 {
                color: #1da1f2;
            }
            .icon-account1 {
                color: #1da1f2;
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
                        background-image: url("https://teitter.soul87.top:8888/teitterfile/images/16d50a5a-f22e-4735-8334-df436831e9fb.webp");
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
        background-color: var(--secondary-bg);
    }
    .read {
        background-color: #1da0f210;
    }
</style>
