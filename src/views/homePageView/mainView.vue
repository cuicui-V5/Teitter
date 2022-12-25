<template>
    <div class="container">
        <TheAside></TheAside>
        <RouterView v-slot="{ Component }">
            <KeepAlive>
                <component
                    :is="Component"
                    v-if="$route.meta.keepAlive"
                ></component>
            </KeepAlive>
            <component
                :is="Component"
                v-if="!$route.meta.keepAlive"
            ></component>
        </RouterView>
        <theBannerVue v-if="!userInfo.isLogin"></theBannerVue>
        <statusPanel></statusPanel>
    </div>
</template>

<script setup lang="ts">
    import TheAside from "../../components/aside/theAside.vue";
    import theBannerVue from "@/components/theBanner.vue";
    import statusPanel from "@/components/statusPanel.vue";

    import { useTeitterStore } from "@/stores/teitter";
    import { toRefs } from "vue";
    import { RouterView } from "vue-router";
    const store = useTeitterStore();
    const { userInfo } = toRefs(store);
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
