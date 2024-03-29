<template>
    <div
        @click.stop
        class="userInfoCard animate__animated animate__fast animate__bounceIn"
    >
        <div class="info">
            <div class="avatarDiv">
                <span :style="avatarUrlStyle"></span>
            </div>
            <div class="content">
                <div class="nickName">{{ userInfo.nickName }}</div>
                <span class="userName">@{{ userInfo.userName }}</span>
            </div>
        </div>
        <RouterLink
            :to="{
                name: 'account',
                params: {
                    userId: userInfo.uid?.toString(),
                },
            }"
            class="account option"
            @click="closeCard"
        >
            管理账号
        </RouterLink>
        <div
            class="signOut option"
            @click="logoutBtn"
        >
            登出 {{ userInfo.userName }}
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useTeitterStore } from "@/stores/teitter";
    import { getTeitter, logout } from "@/api";
    import { computed, nextTick, toRefs, inject } from "vue";
    import { RouterLink } from "vue-router";
    import router from "@/router";
    const sendMsg = inject("sendMsg") as Function;

    // 调用父组件的事件来关闭卡片
    const emit = defineEmits(["closeCard"]);
    function closeCard() {
        emit("closeCard");
    }

    const store = useTeitterStore();
    const { userInfo } = toRefs(store);
    const avatarUrlStyle = computed(() => {
        return `background-image: url(${userInfo.value.avatarUrl}); `;
    });

    async function logoutBtn() {
        let res;
        try {
            res = await logout();
            if (res.data.status == 200) {
                sendMsg("成功登出");
                store.userInfo.isLogin = false;
                localStorage.clear();
                closeCard();
            }
        } catch {
            // alert("登出失败");
            sendMsg("登出失败", true);
        } finally {
            router.push({
                name: "home",
            });
        }
    }
</script>

<style scoped lang="scss">
    .userInfoCard {
        position: absolute;
        top: -17vmax;
        width: 20vmax;
        padding: 2vmax;
        border: 1px solid var(--secondary-bg);
        border-radius: 2vmax;
        background-color: var(--primary-bg);
        box-shadow: 0 0 1vmax 0.1vmax #e1e4e6;
        .info {
            display: flex;
            margin-bottom: 1vmax;
            .avatarDiv {
                width: 5.2vmax;
                margin-right: 1vmax;
                span {
                    display: block;
                    width: 4vmax;
                    height: 4vmax;
                    margin: 0 auto;
                    border-radius: 50%;
                    // background-image: url(../../img/defaultAvatar.jpg);
                    background-size: cover;
                    background-position: center;
                }
            }
            .content {
                font-size: 1.2vmax;
                user-select: none;
                .nickName {
                    margin-top: 0.5vmax;
                    font-weight: bold;
                    font-size: 1.3vmax;
                }
                .userName {
                    margin-top: 0.5vmax;
                    margin-left: -0.1vmax;
                }
            }
        }
        .option {
            display: block;
            padding: 1.2vmax 0;
            text-decoration: none;
            font-size: 1.2vmax;
            user-select: none;
            transition: all 0.2s;
            color: var(--text-main);
            &:hover {
                background-color: var(--secondary-bg);
            }
        }
    }
</style>
