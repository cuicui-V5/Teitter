<template>
    <div class="twtInfo">
        <div class="tittle animate__animated animate__fadeIn">
            <span
                class="back iconfont icon-jiantou_xiangzuo"
                @click="goHome"
            ></span>
            <span>忒文</span>
        </div>
        <TweetInfoCard
            v-if="commentInfo"
            :tweetInfo="commentInfo?.tweet"
        ></TweetInfoCard>
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
    import type { commentRes } from "@/interfaces/pubInterface";
    import router from "@/router";
    import { ref, toRef, type Ref } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();

    const goHome = () => {
        router.push({
            name: "home",
        });
    };
    const commentInfo = ref<commentRes | null>(null);
    const init = async () => {
        commentInfo.value = await getComment(route.params.tweetId as string);
        console.log(commentInfo);
    };
    init();
</script>

<style scoped lang="less">
    .twtInfo {
        flex: 605;
        padding-top: 6vmax;
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
            font-size: 2vmax;
            line-height: 5vmax;
            user-select: none;
            backdrop-filter: blur(20px);
            background-color: rgba(255, 255, 255, 0.8);
            .back {
                // width: 3vmax;
                // height: 3vmax;
                padding: 1vmax;
                vertical-align: middle;

                border-radius: 50%;
                transition: 0.2s all;
                font-size: 3vmax;
                &:hover {
                    background-color: #a4a4a44b;
                }
            }
        }
    }
</style>
