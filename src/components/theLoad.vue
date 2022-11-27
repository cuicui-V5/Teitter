<template>
    <span class="loader"></span>
</template>

<script setup lang="ts"></script>

<style scoped>
    .loader {
        width: 48px;
        height: 48px;
        border: 0.6vmax solid #d2ebfc;
        border-bottom-color: #1d9bf0;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
