<template>
    <div ref="lottieTarget"></div>
</template>

<script lang="ts">
    export default {
        name: "lottieComponent",
    };
</script>
<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import lottie from "lottie-web";

    const lottieTarget = ref<Element>();

    const props = defineProps<{
        json: any;
        loop: boolean;
    }>();

    onMounted(() => {
        if (lottieTarget.value) {
            lottie.loadAnimation({
                container: lottieTarget.value,
                animationData: props.json,
                // path: "https://assets8.lottiefiles.com/packages/lf20_1xoQN5jlXh.json",
                loop: props.loop, // Optional
                autoplay: true, // Optional
                renderer: "svg",
            });
        }
    });
</script>

<style scoped lang="less"></style>
