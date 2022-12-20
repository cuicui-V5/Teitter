<template>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
    import { isLogin } from "./api";

    isLogin();
</script>

<style scoped></style>
