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
        display: flex;
        height: 6vmax;
        margin-bottom: 2vmax;
        .avatarDiv {
            width: 5.2vmax;
            margin-right: 1vmax;
            span {
                display: block;
                width: 5.2vmax;
                height: 5.2vmax;
                margin: 0 auto;
                border-radius: 50%;
                // background-image: url(../../img/defaultAvatar.jpg);
                background-size: cover;
                background-position: center;
            }
        }
        .content {
            font-size: 1.35vmax;
            user-select: none;
            .nickName {
                margin-top: 0.5vmax;
                font-weight: bold;
                font-size: 1.5vmax;
            }
            .userName {
                margin-top: 0.5vmax;
                margin-left: -0.1vmax;
            }
        }
    }
</style>
