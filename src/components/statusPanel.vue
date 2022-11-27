<template>
    <div class="panel">
        <div class="text animate__animated animate__bounceInDown">
            <div>
                登陆状态:
                <span>{{ data.isLogin }}</span>
            </div>
            <div>
                用户信息:
                <br />
                <span>昵称:</span>
                <span>{{ data.userInfo.nickName }}</span>
                <br />
                <span>用户名:</span>
                <span>{{ data.userInfo.userName }}</span>
                <br />
                <span>头像url:</span>

                <a :href="data.userInfo.avatarUrl">
                    {{ data.userInfo.avatarUrl }}
                </a>
                <br />
            </div>
            <div>
                推文总数:
                <span>{{ data.teitterCount }}</span>
            </div>
            <button @click="showCookie">输出cookie</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { toRefs } from "vue";
    import { useTeitterStore } from "@/stores/teitter";
    const store = useTeitterStore();
    const { data } = toRefs(store);

    function showCookie() {
        console.log(document.cookie);
    }
</script>

<style scoped lang="scss">
    .panel {
        background-color: #e7f4fd;
        flex: 2;
        padding: 2vmax;
        font-size: 1vmax;
        overflow: hidden;
        .text {
            word-wrap: break-word;
        }
    }
</style>
