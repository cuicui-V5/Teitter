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
        <reloadPrompt />

        <theBannerVue v-if="!userInfo.isLogin"></theBannerVue>
        <rightPanel v-if="!isMobile"></rightPanel>
    </div>
</template>

<script setup lang="ts">
    import TheAside from "../../components/aside/theAside.vue";
    import reloadPrompt from "@/components/reloadPrompt.vue";
    import theBannerVue from "@/components/theBanner.vue";
    import rightPanel from "@/components/rightPanel.vue";
    import { throttle } from "lodash-es";
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
    window.addEventListener(
        "resize",
        throttle(() => {
            if (container.value) {
                if (
                    container.value.offsetHeight > container.value.offsetWidth
                ) {
                    isMobile.value = true;
                } else {
                    isMobile.value = false;
                }
            }
        }, 100),
    );
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
    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
    .v-leave-from,
    .v-enter-to {
        opacity: 1;
    }
    .v-enter-active,
    .v-leave-active {
        transition: 0.3s;
    }
</style>
