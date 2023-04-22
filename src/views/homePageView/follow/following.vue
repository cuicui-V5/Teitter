<template>
    <div>正在关注123</div>
</template>

<script lang="ts">
    export default {
        name: "",
    };
</script>
<script setup lang="ts">
    const props = defineProps<{
        uid: string;
    }>();
    console.log(props.uid);
</script>

<style scoped lang="less"></style>
