<template>
    <div class="container">
        <div class="title">
            私信 ws状态: {{ connectionStatus == 1 ? "已连接" : "断开" }}
        </div>
        <div class="main">
            <div class="chat">
                <div class="userList">
                    <userCard
                        v-for="user in chatsUser"
                        :user-name="user.userName"
                        :nick-name="user.nickName"
                        :avatar-url="user.avatarUrl"
                        @click="
                            $router.push({
                                name: 'chatTo',
                                query: {
                                    avatarUrl: user.avatarUrl,
                                    nickName: user.nickName,
                                    userName: user.userName,
                                },
                            })
                        "
                    />
                </div>
                <RouterView
                    v-if="connectionStatus == 1"
                    :sendMessage="sendMessage"
                    :messages="messages || []"
                ></RouterView>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import chatMainWindow from "./chatMainWindow.vue";
    import userCard from "../follow/userCard.vue";
    import {
        createSocket,
        sendMessage,
        connectionStatus,
        closeConnect,
    } from "@/api/socket";
    import type {
        GetChats,
        GetChatsUser,
        Message,
    } from "@/interfaces/pubInterface";
    import { onMounted, onUnmounted, ref, watch } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter();
    const chatsUser = ref<GetChatsUser[]>();
    const messages = ref<Message[]>();

    const receiveHandler = (msg: any) => {
        const data: any = JSON.parse(msg.data);

        console.log("收到ws消息", data);

        if (data.message == "getChats") {
            chatsUser.value = data.users;
        } else if (data.message == "loadMessage") {
            if (data.messages) {
                messages.value = data.messages;
            } else {
                messages.value = [];
            }
        } else if (data.message == "sendMessage") {
            messages.value?.unshift(data.messages[0]);
        }
    };

    createSocket(receiveHandler);
    let retryCount = 0;
    watch(connectionStatus, () => {
        setTimeout(() => {
            createSocket(receiveHandler);
            retryCount++;
        }, 1000);
    });
    onUnmounted(() => {
        closeConnect();
    });
    const goAccount = (uid: string) => {
        router.push({
            name: "account",
            params: {
                userId: uid,
            },
        });
    };
</script>

<style scoped lang="less">
    .container {
        flex: 605;
        padding-bottom: 5vmax;

        .title {
            z-index: 2;
            position: fixed;
            top: 0;
            // left: 8.3vmax;
            height: 5vmax;
            // width: 59.3vmax;
            width: 100%;
            font-weight: bold;
            font-size: 2vmax;
            line-height: 5vmax;
            user-select: none;
            text-indent: 2vmax;
            backdrop-filter: blur(30px);
            background-color: var(--primary-bg);
        }
        .main {
            padding-top: 5vmax;
            height: 100%;

            .chat {
                display: flex;
                height: 100%;
                .userList {
                    width: 18vmax;
                }
            }
        }
    }
</style>
