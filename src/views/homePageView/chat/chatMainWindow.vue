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
            <!-- {{ messages }} -->
            <span
                class="msg"
                v-for="msg in messageComputed"
                :class="{
                    my: msg.isSender,
                }"
            >
                {{ msg.message }}
            </span>
        </div>
        <div class="sender">
            <input
                type="text"
                v-model="message"
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
    const store = useTeitterStore();
    const avatarUrlStyle = computed(() => {
        return `background-image: url(${userInfo.avatarUrl}); `;
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
        const message = props.messages;
        message.reverse();
        return message;
    });

    const message = ref("");
    const sendChat = () => {
        props.sendMessage({
            from: store.userInfo.nickName,
            to: userInfo.nickName,
            content: message.value,
            message: "sendMessage",
        });
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
        position: relative;
        overflow-y: scroll;
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
                padding: 1vmax;
                margin-bottom: 1vmax;

                height: 2vmax;
                background-color: var(--secondary-bg);
                color: var(--text-main);
                border-radius: 2vmax;
                border-bottom-left-radius: 5%;
                align-self: flex-start;
            }
            .msg.my {
                border-bottom-left-radius: 2vmax;
                border-bottom-right-radius: 5%;
                align-self: flex-end;
                background-color: var(--main-color);
                color: white;
            }
        }
        .sender {
            position: fixed;
            bottom: 0;
            input {
                width: 100%;
            }
            button {
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }
</style>
