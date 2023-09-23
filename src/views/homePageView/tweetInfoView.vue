<template>
    <div class="twtInfo">
        <div class="tittle animate__animated animate__fadeIn">
            <span
                class="back iconfont icon-jiantou_xiangzuo"
                @click="goHome"
            ></span>
            <span>忒文</span>
        </div>
        <template v-if="replyList">
            <theTeitterCard
                v-for="tweet in replyList"
                :key="tweet.tweetId.toString()"
                :teitter="tweet"
                @flush="init"
                :is-show-dividing="true"
            ></theTeitterCard>
        </template>
        <template v-if="commentInfo">
            <TweetInfoCard :tweetInfo="commentInfo.tweet"></TweetInfoCard>
        </template>

        <Comment
            v-if="commentInfo"
            :comments="commentInfo?.comments || []"
            :twtId="commentInfo.tweet.tweetId"
            @init="init"
        ></Comment>
    </div>
</template>

<script setup lang="ts">
    import { getComment } from "@/api";
    import Comment from "@/components/tweet/comment.vue";
    import TweetInfoCard from "@/components/tweet/tweetInfoCard.vue";
    import theTeitterCard from "@/components/mainArea/theTeitterCard.vue";
    import type { commentRes, Tweet } from "@/interfaces/pubInterface";
    import router from "@/router";
    import { ref, toRef, type Ref, watch } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();

    const goHome = () => {
        router.back();
    };
    const commentInfo = ref<commentRes | null>(null);
    const replyList = ref([]) as Ref<Tweet[]>;

    const init = async () => {
        if (route.params.tweetId) {
            replyList.value.length = 0;
            commentInfo.value = await getComment(
                route.params.tweetId as string,
            );
            console.log(commentInfo);
            getReplyList();
        }
    };

    watch(
        route,
        () => {
            init();
        },
        {
            immediate: true,
        },
    );

    const getReplyList = async () => {
        // 生成回复列表
        if (commentInfo.value) {
            replyList.value.unshift(commentInfo.value.tweet);
        }
        // 如果此推文存在parentTweetId, 那么就获取此父推文, unshift 加入replyList中
        while (replyList.value.length && replyList.value[0].parentTweetId) {
            const reply = await getComment(
                replyList.value[0].parentTweetId.toString(),
            );

            replyList.value.unshift(reply.tweet);
        }
        replyList.value.pop();
        console.log(replyList.value);
    };
</script>

<style scoped lang="less">
    .twtInfo {
        flex: 605;
        padding-top: 5vmax;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }

        .tittle {
            z-index: 1;
            position: fixed;
            top: 0;
            // left: 8.3vmax;
            height: 5vmax;
            // width: 59.3vmax;
            width: 67%;
            font-weight: bold;
            font-size: 1.5vmax;
            line-height: 5vmax;
            user-select: none;
            backdrop-filter: blur(20px);
            background-color: var(--primary-bg);
            .back {
                // width: 3vmax;
                // height: 3vmax;
                padding: 1vmax;
                vertical-align: middle;

                border-radius: 50%;
                transition: 0.2s all;
                font-size: 3vmax;
                &:hover {
                    background-color: var(--secondary-bg);
                }
            }
        }
    }
</style>
