<template>
    <div class="msgBoxContainer">
        <div
            class="msgBox animate__animated animate__bounceInUp"
            :class="{
                warn: props.warn,
            }"
        >
            <span>{{ props.msg }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps(["msg", "warn"]);
</script>

<style scoped lang="less">
    .msgBoxContainer {
        position: absolute;
        bottom: 8vmax;
        left: 50%;
        transform: translate(-50%);
        .msgBox {
            z-index: 9999;
            min-width: 20vmax;
            height: 5vmax;

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
        .warn {
            background-color: #cc3300;
        }
    }
</style>
