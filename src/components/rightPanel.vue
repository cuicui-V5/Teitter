<template>
    <div class="panel">
        <div
            class="search"
            v-if="$route.name == `home`"
        >
            <input
                type="text"
                class="searchBar"
                v-model="keyWord"
                @keydown.enter="goSearch()"
                :placeholder="`搜索目前的${store.option.teitterCount}条忒文`"
            />
            <span
                @click="goSearch()"
                class="searchBtn iconfont icon-search"
            ></span>
        </div>

        <div class="links">
            <a href="">关于</a>
            <a href="">用户准则</a>
            <a href="">更新日志</a>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, toRefs, provide } from "vue";
    import { useTeitterStore } from "@/stores/teitter";
    import router from "@/router/index";

    const store = useTeitterStore();
    const keyWord = ref("");

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
        z-index: 2;
        background-color: var(--secondary-bg);
        flex: 0.306;
        flex: 306;
        font-size: 1vmax;
        overflow: hidden;
        padding: 2vmax;
        .search {
            text-align: center;
            input {
                margin-left: -1vmax;
                width: 100%;
                height: 4vmax;
                border-radius: 2vmax;
                padding-left: 1vmax;
                font-size: 1.3vmax;
                background-color: var(--primary-bg);
                outline: 0;
                border: 1px solid #47aef2;
                transition: all 200ms;

                &:focus,
                &:hover {
                    border: 1px dotted #1d9bf0;
                    outline: 0;
                    background-color: var(--secondary-bg);
                }
                &::placeholder {
                    color: var(--text-second);
                }
            }
            .searchBtn {
                vertical-align: middle;
                margin-left: -5vmax;
                font-size: 3vmax;
                padding: 0.2vmax;
                border-radius: 50%;
                transition: all 0.2s;
                &:hover {
                    background-color: #d1d1d1;
                }
            }
        }
        .links {
            a {
                display: block;
            }
        }
    }
</style>
