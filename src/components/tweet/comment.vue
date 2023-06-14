<template>
    <div class="comment">
        <div
            class="publishComment"
            v-if="store.userInfo.isLogin"
        >
            <div class="avatar">
                <span :style="avatarUrlStyle"></span>
            </div>
            <input
                class="input"
                type="text"
                placeholder="发布你的回复"
                v-model="cmtContent"
                @keydown.enter="pubCmtBtn"
            />
            <div
                class="btn"
                @click="pubCmtBtn"
            >
                <button
                    :class="{
                        btnActive: isOk,
                    }"
                >
                    回复
                </button>
            </div>
        </div>
        <CommentCard
            v-for="comment in comments"
            :comment="comment"
        ></CommentCard>
    </div>
</template>

<script setup lang="ts">
    import CommentCard from "./commentCard.vue";
    import type { Comment } from "@/interfaces/pubInterface";
    import { publishComment } from "@/api";
    import { ref, inject, computed, toRefs } from "vue";
    import { useTeitterStore } from "@/stores/teitter";
    const store = useTeitterStore();
    const cmtContent = ref("");
    const sendMsg = inject("sendMsg") as Function;
    const isOk = computed(() => {
        return cmtContent.value == "" ? false : true;
    });
    const emit = defineEmits(["init"]);

    const props = defineProps<{
        comments: Comment[] | null;
        twtId: bigint;
    }>();
    const { comments, twtId } = toRefs(props);
    const pubCmtBtn = async () => {
        const res = await publishComment(twtId.value, cmtContent.value);
        if (res == "ok") {
            sendMsg("评论成功!");
        } else {
            sendMsg(res, true);
        }
        cmtContent.value = "";
        emit("init");
    };
    const avatarUrlStyle = computed(() => {
        return `background-image: url(${store.userInfo.avatarUrl}); `;
    });
</script>

<style scoped lang="less">
    .comment {
        padding-bottom: 15vmax;

        .publishComment {
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 8vmax;
            .avatar {
                margin-left: 2vmax;
                span {
                    display: block;
                    width: 5vmax;
                    height: 5vmax;
                    border-radius: 50%;
                    background-size: cover;
                }
            }
            .input {
                margin-left: 2vmax;
                flex: 6;
                height: 100%;
                border: 0;
                font-size: 2vmax;
                &:focus {
                    outline: 0;
                    border: 0;
                }
            }
            .btn {
                flex: 1;
                button {
                    width: 5.12vmax;
                    height: 3.65vmax;
                    margin: 1vmax;
                    border: 0;
                    border-radius: 1.82vmax;
                    background-color: #8ecdf7;
                    color: white;
                    font-size: 1.62vmax;
                    pointer-events: none;
                }
                .btnActive {
                    background-color: #1a8cd8;
                    pointer-events: all;
                }
            }
        }
    }
</style>
