<template>
    <div class="publishTeitter">
        <div class="avatarShow">
            <span :style="avatarUrlStyle"></span>
        </div>
        <div class="publish">
            <textarea
                placeholder="有什么新鲜事 ?"
                v-model="content"
                @keydown.enter="publish()"
            ></textarea>

            <button
                :class="activeClass"
                @click="publish"
                v-if="!isLoading"
            >
                发忒
            </button>
            <TheLoad
                v-if="isLoading"
                class="loader"
            ></TheLoad>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useTeitterStore } from "@/stores/teitter";
    import { computed, ref, toRefs, watch } from "vue";
    import axios from "axios";
    import TheLoad from "../theLoad.vue";
    // 是否正在请求, 如果正在请求, 那么就播放加载的动画
    const isLoading = ref(false);

    const store = useTeitterStore();
    const { data } = toRefs(store);
    const avatarUrlStyle = computed(() => {
        return `background-image: url(${data.value.userInfo.avatarUrl}); `;
    });

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
        isLoading.value = true;

        const tw = {
            content: content.value,
        };

        try {
            const res = await axios.post("/sendTwt", tw, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            if (res.data.status == 200) {
                console.log(res);
                location.reload();
            } else {
                alert("出现问题了哦");
            }
        } catch (error) {
            alert("发送失败" + (error as Error).message);
            content.value = "";
        } finally {
            isLoading.value = false;
        }
    }
</script>

<style scoped lang="scss">
    .publishTeitter {
        display: flex;
        height: 13vmax;
        border-bottom: #eff3f4 1px solid;
        .avatarShow {
            width: 7vmax;
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
        .publish {
            position: relative;
            flex: 1;
            textarea {
                position: relative;
                width: 100%;
                height: 7vmax;
                padding: 1vmax;
                border: 0;
                color: #000000;
                font-weight: normal;
                font-size: 2.1vmax;
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
            .loader {
                width: 3vmax;

                height: 3vmax;
                position: absolute;
                right: 2vmax;
            }
        }
    }
</style>
