<template>
    <div class="msgBox animate__animated animate__bounceInUp">
        <span>{{ props.msg }}</span>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps(["msg"]);
</script>

<style scoped lang="less">
    .msgBox {
        display: inline-block;
        z-index: 9999;
        min-width: 20vmax;
        height: 5vmax;
        position: absolute;
        bottom: 8vmax;
        left: 35%;
        transform: translate(-50%);
        background-color: #1d9bf0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1vmax;
        box-shadow: #333 0vmax 0vmax 17px -6px;
        padding: 0 1vmax;
        span {
            color: white;
            font-size: 1.5vmax;
        }
    }
</style>
