<template>
    <div class="comment">
        <div class="publishComment">
            <div class="avatar">
                <span></span>
            </div>
            <input
                class="input"
                type="text"
                placeholder="发布你的回复"
            />
            <div class="btn">
                <button>回复</button>
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

    const { comments } = defineProps<{
        comments: Comment[] | undefined;
    }>();
</script>

<style scoped lang="less">
    .comment {
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
                    background-image: url("https://picx.zhimg.com/v2-d7be5fcd1fb35461336a3db94ca1ff9c_l.jpg?source=32738c0c");
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
            }
        }
    }
</style>
