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
        z-index: 9999;
        transform: translate(-50%);
        .msgBox {
            min-width: 12vmax;
            height: 3vmax;

            background-color: var(--main-color);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1.5vmax;
            box-shadow: #333 0vmax 0vmax 17px -6px;
            padding: 0 0.3vmax;
            span {
                color: white;
                font-size: 1.2vmax;
            }
        }
        .warn {
            background-color: #cc3300;
        }
    }
</style>
