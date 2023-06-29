<template>
    <div class="noNetWork">
        <lottieComponent
            style="width: 40%; margin: 0 auto"
            :json="networkErrJson"
            :loop="true"
        />
        <button @click="$emit(`event`)">重试</button>
    </div>
</template>

<script setup lang="ts">
    import lottieComponent from "@/components/lottie.vue";

    import networkErrJson from "@/lottie/networderr.json";
    defineEmits(["event"]);
</script>

<style scoped lang="less">
    .noNetWork {
        text-align: center;

        .content {
            margin-top: 1vmax;
            font-size: 3vmax;
        }
        button {
            width: 5.12vmax;
            height: 3.65vmax;
            margin: 1vmax;
            border: 0;
            border-radius: 1.82vmax;
            background-color: var(--main-color);
            color: white;
            font-size: 1.62vmax;
            &:hover {
                background-color: #1a8cd8;
            }
        }
    }
</style>
