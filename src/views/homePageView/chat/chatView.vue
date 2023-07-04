<template>
    <div class="container">
        <div class="title">私信</div>
        <div class="main">
            <div class="chat">
                <div class="userList">
                    <userCard
                        v-for="user in chatsUser"
                        :user-name="user.userName"
                        :nick-name="user.nickName"
                        :avatar-url="user.avatarUrl"
                    />
                </div>
                <RouterView
                    v-if="connectionStatus == 0"
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
    import { createSocket, sendMessage, connectionStatus } from "@/api/socket";
    import type {
        GetChats,
        GetChatsUser,
        Message,
    } from "@/interfaces/pubInterface";
    import { onMounted, ref } from "vue";
    const chatsUser = ref<GetChatsUser[]>();
    const messages = ref<Message[]>();

    const receiveHandler = (msg: any) => {
        const data: any = JSON.parse(msg.data);
        console.log(data);

        if (data.message == "getChats") {
            chatsUser.value = data.users;
        } else if (data.message == "loadMessage") {
            messages.value = data.messages;
        }
    };

    createSocket(receiveHandler);
</script>

<style scoped lang="less">
    .container {
        flex: 605;
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
                    width: 20vmax;
                }
            }
        }
    }
</style>
