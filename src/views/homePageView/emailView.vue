<template>
    <div class="animate__animated animate__fadeIn faster container">
        <div class="title">私信</div>
    </div>
</template>

<script setup lang="ts"></script>

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
            background-color: rgba(255, 255, 255, 0.8);
        }
    }
</style>
