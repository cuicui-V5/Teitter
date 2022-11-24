<template>
    <div class="panel">
        这里用来展示状态信息
        <button @click="showCookie">点击输出cookie</button>
    </div>
</template>

<script setup lang="ts">
    function showCookie() {
        console.log(document.cookie);
    }
</script>

<style scoped lang="scss">
    .panel {
        background-color: #e7f4fd;
        flex: 1;
    }
</style>
