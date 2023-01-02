<template>
    <div
        class="container"
        ref="container"
    >
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
        <statusPanel v-if="!isMobile"></statusPanel>
    </div>
</template>

<script setup lang="ts">
    import TheAside from "../../components/aside/theAside.vue";
    import theBannerVue from "@/components/theBanner.vue";
    import statusPanel from "@/components/statusPanel.vue";

    import { useTeitterStore } from "@/stores/teitter";
    import { computed, nextTick, ref, toRefs } from "vue";
    import { RouterView } from "vue-router";
    const store = useTeitterStore();
    const { userInfo } = toRefs(store);
    const container = ref<HTMLDivElement>();
    const isMobile = ref(false);
    nextTick(() => {
        if (container.value) {
            if (container.value.offsetHeight > container.value.offsetWidth) {
                isMobile.value = true;
            } else {
                isMobile.value = false;
            }
        }
    });

    // 判断是否是手机端, 如果是那么隐藏状态区域
    window.addEventListener("resize", () => {
        if (container.value) {
            if (container.value.offsetHeight > container.value.offsetWidth) {
                isMobile.value = true;
            } else {
                isMobile.value = false;
            }
        }
    });
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
