<template>
    <div class="container">
        <TheAside></TheAside>
        <RouterView></RouterView>
        <theBannerVue v-if="!data.isLogin"></theBannerVue>
    </div>
</template>

<script setup lang="ts">
    import TheAside from "../../components/aside/theAside.vue";
    import theBannerVue from "@/components/theBanner.vue";
    import { useTeitterStore } from "@/stores/teitter";
    import { toRefs } from "vue";
    import { RouterView } from "vue-router";
    const store = useTeitterStore();
    const { data } = toRefs(store);
</script>

<style scoped>
    .container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        overflow: hidden;
    }
</style>
