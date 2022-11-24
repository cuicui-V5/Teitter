<template>
    <div
        @click.stop
        class="userInfoCard animate__animated animate__fast animate__bounceIn"
    >
        <div class="info">
            <div class="avatarDiv">
                <img
                    :src="data.userInfo.avatarUrl"
                    class="avatar"
                />
            </div>
            <div class="content">
                <div class="nickName">{{ data.userInfo.nickName }}</div>
                <div class="userName">{{ data.userInfo.userName }}</div>
            </div>
        </div>
        <RouterLink
            :to="{
                name: 'account',
            }"
            class="account option"
            @click="closeCard"
        >
            管理账号
        </RouterLink>
        <div
            class="signOut option"
            @click="closeCard"
        >
            登出 {{ data.userInfo.userName }}
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useTeitterStore } from "@/stores/teitter";
    import { toRefs } from "vue";
    import { RouterLink } from "vue-router";

    // 调用父组件的事件来关闭卡片
    const emit = defineEmits(["closeCard"]);
    function closeCard() {
        emit("closeCard");
        data.value.isLogin = false;
    }

    const store = useTeitterStore();
    const { data } = toRefs(store);
</script>

<style scoped lang="scss">
    .userInfoCard {
        position: absolute;
        top: -24vw;
        width: 30.2vw;
        height: 20vw;
        padding: 2vw;
        border: 1px solid #e1e4e6;
        border-radius: 2vw;
        background-color: white;
        box-shadow: 0 0 1vw 0.1vw #e1e4e6;
        .info {
            display: flex;
            height: 6vw;
            margin-bottom: 2vw;
            .avatarDiv {
                width: 5.2vw;
                margin-right: 1vw;
                .avatar {
                    border-radius: 50%;
                    display: block;
                    width: 5.2vw;
                    height: 5.2vw;
                }
            }
            .content {
                font-size: 1.35vw;
                user-select: none;
                .nickName {
                    margin-top: 0.5vw;
                    font-weight: bold;
                    font-size: 1.5vw;
                }
                .userName {
                    margin-top: 0.5vw;
                    margin-left: -0.1vw;
                }
            }
        }
        .option {
            display: block;
            padding: 2vw 0;
            color: black;
            text-decoration: none;
            font-size: 1.6vw;
            user-select: none;
            transition: all 0.2s;
            &:hover {
                background-color: #f7f9f9;
            }
        }
    }
</style>
