<template>
    <div class="info">
        <div class="avatarDiv">
            <span :style="avatarUrlStyle"></span>
        </div>
        <div class="content">
            <div class="nickName">{{ props.nickName }}</div>
            <div class="userName">@{{ props.userName }}</div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "",
    };
</script>
<script setup lang="ts">
    import { computed } from "vue";
    const avatarUrlStyle = computed(() => {
        return `background-image: url(${props.avatarUrl}); `;
    });
    const props = defineProps<{
        avatarUrl: string;
        nickName: string;
        userName: string;
    }>();
</script>

<style scoped lang="less">
    .info {
        position: relative;
        display: flex;
        height: 4vmax;
        margin-right: 1vmax;
        border-bottom: 2px solid var(--secondary-bg);
        transition: background 0.3s;
        &:hover {
            background-color: var(--secondary-bg);
        }
        .avatarDiv {
            width: 3.5vmax;
            margin-right: 1vmax;
            span {
                display: block;
                width: 3.5vmax;
                height: 3.5vmax;
                margin: 0 auto;
                border-radius: 50%;
                // background-image: url(../../img/defaultAvatar.jpg);
                background-size: cover;
                background-position: center;
            }
        }
        .content {
            font-size: 1vmax;
            user-select: none;
            .nickName {
                margin-top: 0.2vmax;
                font-weight: bold;
                font-size: 1.2vmax;
            }
            .userName {
                margin-top: 0.2vmax;
                margin-left: -0.1vmax;
            }
        }
    }
</style>
