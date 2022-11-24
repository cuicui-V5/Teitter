<template>
    <div class="publishTeitter">
        <div class="avatarShow">
            <img
                :src="data.userInfo.avatarUrl"
                class="avatar"
            />
        </div>
        <div class="publish">
            <textarea
                placeholder="有什么新鲜事 ?"
                v-model="content"
            ></textarea>
            <button
                :class="activeClass"
                @click="publish"
            >
                发忒
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useTeitterStore } from "@/stores/teitter";
    import { ref, toRefs, watch } from "vue";
    import axios from "axios";
    axios.defaults.baseURL = "https://www.heron.love:8090/teitter/api";

    const store = useTeitterStore();
    const { data } = toRefs(store);

    const activeClass = ref("");
    const content = ref("");
    // 监视是否有内容,有内容就让按钮可用
    watch(content, (value) => {
        if (value) {
            activeClass.value = "btnActive";
        } else {
            activeClass.value = "";
        }
    });

    async function publish() {
        const tw = {
            content: content.value,
        };

        const res = await axios.post("/sendTwt", tw, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        console.log(res);
        content.value = "";
        location.reload();
    }
</script>

<style scoped lang="scss">
    .publishTeitter {
        display: flex;
        height: 13vw;
        border-bottom: #eff3f4 1px solid;
        .avatarShow {
            width: 7vw;
            .avatar {
                border-radius: 50%;
                display: block;
                width: 5.12vw;
                height: 5.12vw;
                margin: 0 auto;
            }
        }
        .publish {
            position: relative;
            flex: 1;
            textarea {
                position: relative;
                width: 100%;
                height: 7vw;
                padding: 1vw;
                border: 0;
                color: #536471;
                font-weight: normal;
                font-size: 2.1vw;
                resize: none;
                &:focus {
                    outline: 0;
                    border: 0;
                }
            }
            button {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 5.12vw;
                height: 3.65vw;
                margin: 1vw;
                border: 0;
                border-radius: 1.82vw;
                background-color: #8ecdf7;
                color: white;
                font-size: 1.62vw;
                pointer-events: none;
            }
            .btnActive {
                background-color: #1a8cd8;
                pointer-events: all;
            }
        }
    }
</style>
