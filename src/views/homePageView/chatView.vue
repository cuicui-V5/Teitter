<template>
    <div class="container">
        <div class="title">私信</div>
        <div class="main">
            <button @click="testws">测试websocket</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { createSocket } from "@/api/socket";
    const testws = () => {
        createSocket();
    };
</script>

<style scoped lang="less">
    .container {
        flex: 605;
        .title {
            z-index: 2;
            position: fixed;
            top: 0;
            // left: 8.3vmax;
            height: 5vmax;
            // width: 59.3vmax;
            width: 100%;
            font-weight: bold;
            font-size: 2vmax;
            line-height: 5vmax;
            user-select: none;
            text-indent: 2vmax;
            backdrop-filter: blur(30px);
            background-color: var(--primary-bg);
        }
        .main {
            padding-top: 5vmax;
        }
    }
</style>
