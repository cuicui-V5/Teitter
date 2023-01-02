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

        <div class="o">
            {{ $route.params }}
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
    import { ref, watch } from "vue";
    import router from "@/router";
    const route = useRoute();
    const store = useTeitterStore();
    const keyWord = ref("");

    store.getSearchRes((route.params.keyWord as string) || "", 1);
    watch(route, () => {
        store.getSearchRes((route.params.keyWord as string) || "", 1);
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
</script>

<style scoped lang="less">
    .searchContainer {
        flex: 605;

        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
        .tittle {
            .search {
                margin: 0.5vmax 1vmax;
                input {
                    width: 80%;
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
    }
</style>
