<template>
    <div class="panel">
        <div class="text animate__animated animate__bounceInDown">
            <input
                type="text"
                class="searchBar"
                v-model="keyWord"
            />
            <button @click="goSearch()">搜索忒特</button>
            <div>
                登陆状态:
                <span>{{ userInfo.isLogin }}</span>
            </div>
            <div>
                用户信息:
                <br />
                <span>昵称:</span>
                <span>{{ userInfo.nickName }}</span>
                <br />
                <span>用户名:</span>
                <span>{{ userInfo.userName }}</span>
                <br />
                <span>头像url:</span>

                <a :href="userInfo.avatarUrl">
                    {{ userInfo.avatarUrl }}
                </a>
                <br />
            </div>
            <div>
                推文总数:
                <span>{{ option.teitterCount }}</span>
            </div>
            <button @click="showCookie">输出cookie</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, toRefs } from "vue";
    import { useTeitterStore } from "@/stores/teitter";
    import router from "@/router/index";
    const store = useTeitterStore();
    const { userInfo, option } = toRefs(store);
    const keyWord = ref("");

    const showCookie = () => {
        console.log(document.cookie);
    };
    const goSearch = () => {
        console.log(keyWord.value);
        router.push({
            name: "search",
            params: {
                keyWord: keyWord.value,
            },
        });
    };
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
