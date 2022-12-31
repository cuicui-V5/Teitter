<template>
    <div class="searchContainer">
        搜索
        <div class="o">
            {{ $route.params }}
        </div>
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
    import { watch } from "vue";
    const route = useRoute();
    const store = useTeitterStore();

    store.getSearchRes((route.params.keyWord as string) || "", 1);
    watch(route, () => {
        store.getSearchRes((route.params.keyWord as string) || "", 1);
    });
</script>

<style scoped lang="less">
    .searchContainer {
        flex: 8;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
