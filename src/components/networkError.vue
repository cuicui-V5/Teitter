<template>
    <div class="noNetWork">
        <span class="noNetWorkSpan iconfont icon-lixian"></span>
        <div class="content">出错了。请尝试重新加载。</div>
        <button @click="$emit(`event`)">重试</button>
    </div>
</template>

<script setup lang="ts">
    defineEmits(["event"]);
</script>

<style scoped lang="less">
    .noNetWork {
        text-align: center;
        .noNetWorkSpan {
            font-size: 6vmax;
        }
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
            background-color: #1d9bf0;
            color: white;
            font-size: 1.62vmax;
            &:hover {
                background-color: #1a8cd8;
            }
        }
    }
</style>
