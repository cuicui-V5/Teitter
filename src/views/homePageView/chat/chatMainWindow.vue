<template>
    <div class="container">
        <div class="title">
            <div class="avatarDiv">
                <span :style="avatarUrlStyle"></span>
            </div>
            <span class="nickName">{{ userInfo.nickName }}</span>
            <span>@{{ userInfo.userName }}</span>
        </div>
        <div class="messages">
            <span
                class="msg"
                v-for="msg in messageComputed"
                :class="{
                    my: msg.sender,
                }"
            >
                {{ msg.message }}
                <span class="time">
                    {{ timeComputed(msg.date) }}
                </span>
            </span>
        </div>
        <div class="sender">
            <input
                type="text"
                v-model="message"
                placeholder="创建一条私信"
            />
            <button @click="sendChat">发送</button>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "",
    };
</script>
<script setup lang="ts">
    import { computed, reactive, ref, watch } from "vue";
    import { useRoute } from "vue-router";
    import { useTeitterStore } from "@/stores/teitter";
    import type { Message } from "@/interfaces/pubInterface";
    import dayjs from "dayjs";
    import "dayjs/locale/zh-cn";
    dayjs.locale("zh-cn");

    const store = useTeitterStore();
    const avatarUrlStyle = computed(() => {
        return `background-image: url(${userInfo.avatarUrl}); `;
    });
    const timeComputed = computed(() => (time: string) => {
        return dayjs(Number(time)).format("YYYY年MM月DD日 · AHH:mm");
    });

    const route = useRoute();
    const userInfo = reactive({
        avatarUrl: route.query.avatarUrl,
        nickName: route.query.nickName,
        userName: route.query.userName,
    });
    watch(route, () => {
        init();
    });
    const props = defineProps<{
        sendMessage: (msg: object) => void;
        messages: Message[];
    }>();
    const messageComputed = computed(() => {
        return [...props.messages].reverse();
    });

    const message = ref("");
    const sendChat = () => {
        props.sendMessage({
            from: store.userInfo.nickName,
            to: userInfo.nickName,
            content: message.value,
            message: "sendMessage",
        });
        message.value = "";
    };
    const loadMessage = () => {
        props.sendMessage({
            from: store.userInfo.nickName,
            to: userInfo.nickName,
            message: "loadMessage",
        });
    };

    const init = () => {
        userInfo.avatarUrl = route.query.avatarUrl;
        userInfo.nickName = route.query.nickName;
        userInfo.userName = route.query.userName;
        loadMessage();
    };
    init();
</script>

<style scoped lang="less">
    .container {
        width: 100%;
        display: flex;
        position: relative;
        overflow-y: scroll;
        flex-direction: column;
        &::-webkit-scrollbar {
            display: none;
        }
        .title {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 1vmax;
            padding-bottom: 1vmax;
            border-bottom: 3px solid var(--secondary-bg);
            .avatarDiv {
                width: 3.5vmax;
                margin-right: 1vmax;
                span {
                    display: block;
                    width: 3.5vmax;
                    height: 3.5vmax;
                    margin: 0 auto;
                    border-radius: 50%;
                    // background-image: url(../../img/defaultAvatar.jpg);
                    background-size: cover;
                    background-position: center;
                }
            }
            .nickName {
                font-size: 1.5vmax;
                font-weight: bold;
            }
        }
        .messages {
            display: flex;
            flex-direction: column;
            .msg {
                display: inline-block;
                position: relative;
                padding: 0.6vmax;
                margin-bottom: 1.8vmax;
                border: 1px solid var(--secondary-bg);
                background-color: var(--secondary-bg);
                color: var(--text-main);
                border-radius: 2vmax;
                border-bottom-left-radius: 5%;
                align-self: flex-start;
                font-size: 1vmax;
                .time {
                    color: var(--text-second);

                    position: absolute;
                    bottom: -1.2vmax;
                    left: 0;
                    display: block;
                    font-size: 0.8vmax;
                    white-space: nowrap;
                }
            }
            .msg.my {
                border-bottom-left-radius: 2vmax;
                border-bottom-right-radius: 5%;
                align-self: flex-end;
                background-color: var(--main-color);
                color: white;
                .time {
                    left: unset;

                    right: 0;
                    color: var(--text-second);
                }
            }
        }
        .sender {
            position: absolute;
            bottom: 0;
            width: 100%;
            input {
                height: 2vmax;
                width: 100%;
                background-color: var(--secondary-bg);
                border-radius: 2vmax;
                outline: none;
                border: none;
                padding-left: 1vmax;
                transition: 0.3s all;
                &::placeholder {
                    color: var(--text-second);
                }
                &:hover {
                    opacity: 0.7;
                }
            }
            button {
                height: 2vmax;
                width: 5vmax;

                border-radius: 2vmax;
                position: absolute;
                top: 0;
                right: 0;
                background-color: var(--main-color);
                border: none;
                color: white;
                transition: 0.3s all;
                &:hover {
                    opacity: 0.7;
                }
            }
        }
    }
</style>
