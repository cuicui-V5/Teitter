<template>
    <div class="searchContainer animate__animated animate__fadeIn faster">
        <div class="tittle">
            <div class="search">
                <input
                    type="text"
                    class=""
                    v-model="keyWord"
                    placeholder="搜索 teitter"
                    @keydown.enter="search"
                />
                <span
                    class="iconfont icon-search searchBtn"
                    @click="search"
                ></span>
            </div>
        </div>

        <div
            class="noResult"
            v-if="$route.params.keyWord && !store.searchResultTeitters"
        >
            <lottieComponent
                class="emoji"
                :json="sadLottie"
                :loop="true"
            />
            <div class="text">没有搜索到结果</div>
        </div>
        <div
            class="welcome"
            v-if="!$route.params.keyWord"
        >
            <lottieComponent
                class="emoji"
                :json="searchLottie"
                :loop="true"
            />
            <div class="text">忒特热搜</div>
            <div class="hot">
                <ul>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当众写代码</li>
                    <li>震惊 一男子竟然当待待待待待待待待待待带带带</li>
                </ul>
            </div>
        </div>
        <networkErrorVue
            @event="search()"
            v-if="store.option.isNetWorkError"
        />
        <theTeitterCardVue
            v-for="teitter in store.searchResultTeitters"
            :teitter="teitter"
        ></theTeitterCardVue>
    </div>
</template>

<script setup lang="ts">
    import { useTeitterStore } from "@/stores/teitter";
    import theTeitterCardVue from "@/components/mainArea/theTeitterCard.vue";
    import { useRoute } from "vue-router";
    import { ref, watch, onUnmounted } from "vue";
    import router from "@/router";
    import lottieComponent from "@/components/lottie.vue";
    import searchLottie from "@/lottie/search.json";
    import sadLottie from "@/lottie/sad.json";

    const route = useRoute();
    const store = useTeitterStore();
    const keyWord = ref("");
    keyWord.value = route.params.keyWord as string;
    if (route.params.keyWord) {
        console.log(route.params.keyWord);

        store.getSearchRes((route.params.keyWord as string) || "", 1);
    }
    watch(route, () => {
        if (route.params.keyWord) {
            console.log(route.params.keyWord);

            store.getSearchRes((route.params.keyWord as string) || "", 1);
        }
    });
    const search = () => {
        console.log(keyWord.value);

        router.push({
            name: "search",
            params: {
                keyWord: keyWord.value,
            },
        });
    };
    onUnmounted(() => {
        store.searchResultTeitters = [];
    });
</script>

<style scoped lang="less">
    .searchContainer {
        flex: 605;
        position: relative;
        overflow-y: scroll;
        margin-bottom: 7.3vmax;
        &::-webkit-scrollbar {
            display: none;
        }
        .tittle {
            .search {
                margin: 0.5vmax 1vmax;
                input {
                    width: 100%;
                    height: 4vmax;
                    border-radius: 2vmax;
                    padding-left: 1vmax;
                    font-size: 1.3vmax;
                    background-color: #eff3f4;
                    outline: 0;
                    border: 1px solid transparent;
                    transition: all 200ms;

                    &:focus {
                        border: 1px solid #47aef2;
                        outline: 0;
                        background-color: #ffffff;
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
        }
        .noResult {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            text-align: center;
            margin-top: 5vmax;
            .emoji {
                display: inline-block;
                width: 10vmax;
                height: 10vmax;
            }
            .text {
                font-size: 2vmax;
                margin-top: 1vmax;
            }
        }
        .welcome {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            text-align: center;
            margin-top: 5vmax;
            width: 70%;
            .emoji {
                display: inline-block;
                width: 10vmax;
                height: 10vmax;
            }
            .text {
                font-size: 1.5vmax;
                margin-top: 1vmax;
            }
        }
        .hot {
            ul {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                list-style: none;
                justify-content: center;

                li {
                    padding: 0.5vmax;
                    width: 200px;
                    // 显示省略号
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }
    }
</style>
