<template>
    <lottieComponent
        :json="loadingJson"
        :loop="true"
    />
</template>

<script setup lang="ts">
    import lottieComponent from "@/components/lottie.vue";

    import loadingJson from "@/lottie/loading.json";
</script>

<style scoped></style>
