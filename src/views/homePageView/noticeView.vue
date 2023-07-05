<template>
    <div class="container">
        <div class="top">
            <span class="text">通知</span>
            <span
                class="clear iconfont"
                @click="clear"
            >
                &#xe663;
            </span>
        </div>
        <main>
            <noticeCard
                v-for="item in store.notice"
                :content="item.content"
                :comment="item.comment"
                :uid="item.senderId"
                :nick-name="item.nickName"
                :type="item.msgType"
                :status="item.status"
                :tweet-id="item.tweetId"
                :avatar-url="item.avatar_url"
                :message-id="item.messageId"
            ></noticeCard>
        </main>
    </div>
</template>

<script setup lang="ts">
    import noticeCard from "@/components/noticeCard.vue";
    import { reqHaveRead, reqNotice } from "@/api/index";
    import { useTeitterStore } from "@/stores/teitter";
    import { useRouter } from "vue-router";
    import { inject } from "vue";
    const sendMsg = inject("sendMsg") as Function;

    const store = useTeitterStore();
    const router = useRouter();

    setTimeout(() => {
        if (!store.userInfo.isLogin) {
            // 去登陆页面
            router.push({
                name: "login",
            });
        }
    }, 500);
    store.getNotice();

    // 清空所有通知
    const clear = () => {
        const promiseArr: Array<Promise<any>> = [];
        store.notice?.forEach(item => {
            // 如果未读, 那么设为已读;
            if (!item.status) {
                promiseArr.push(reqHaveRead(item.messageId));
            }
        });
        Promise.all(promiseArr)
            .then(() => {
                sendMsg("全部已读成功");
                store.getNotice();
            })
            .catch(() => {
                sendMsg("全部已读失败", true);
            });
    };
</script>

<style scoped lang="less">
    .container {
        flex: 605;

        .top {
            z-index: 2;
            position: fixed;
            top: 0;
            // left: 8.3vmax;
            height: 5vmax;
            width: 59.3vmax;

            backdrop-filter: blur(30px);
            display: flex;
            justify-content: space-between;
            align-items: center;

            .text {
                font-weight: bold;
                font-size: 2vmax;
                line-height: 5vmax;
                user-select: none;
                text-indent: 2vmax;
            }
            .clear {
                float: right;
                font-weight: bold;
                font-size: 3vmax;
                user-select: none;
                width: 3vmax;
                height: 3vmax;
                border-radius: 50%;
                transition: all 0.2s;
                padding: 0.5vmax;
            }
            .clear:hover {
                background-color: #e7e7e8;
            }
        }
        main {
            margin-top: 5vmax;
            height: calc(100% - 5vmax);
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
</style>
