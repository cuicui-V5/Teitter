<template>
    <div class="publishTeitter">
        <div class="avatarShow">
            <span :style="avatarUrlStyle"></span>
        </div>
        <div class="publish">
            <textarea
                placeholder="有什么新鲜事 ?"
                v-model="content"
                @keydown.enter="publishBtn()"
                @paste="appendImageOnPaste"
            ></textarea>
            <input
                type="file"
                @change="fileUpload"
                ref="fileInput"
                class="imageInput"
                accept="image/*,video/mp4"
            />
            <span
                class="imageSelector iconfont icon-charutupian"
                @click="fileInput?.click()"
                v-if="!isUpLoading"
            >
                <div class="tooltip">可上传图片与MP4视频, 大小20Mb以内!</div>
            </span>
            <div class="uploadLoader">
                <TheLoad v-if="isUpLoading"></TheLoad>
            </div>

            <button
                :class="activeClass"
                @click="publishBtn"
                v-if="!isSending"
            >
                发忒
            </button>
            <TheLoad
                v-if="isSending"
                class="sendLoader"
            ></TheLoad>

            <div
                class="imageContainer"
                v-show="imageUrl"
            >
                <img ref="imageContainer" />
            </div>

            <div
                class="videoContainer"
                v-show="videoUrl"
            >
                <video
                    ref="videoContainer"
                    controls
                    autoplay
                    muted
                    loop
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useTeitterStore } from "@/stores/teitter";
    import { computed, ref, toRefs, watch } from "vue";
    import axios from "axios";
    import TheLoad from "../theLoad.vue";

    import { publish, getTeitter, uploadFile } from "@/api";
    import request from "@/api/request";
    import { inject } from "vue";

    // 引入图片压缩
    import { imgCompress } from "@/utils/index";

    const fileInput = ref<HTMLInputElement>();
    const imageContainer = ref<HTMLImageElement>();
    const videoContainer = ref<HTMLImageElement>();
    const sendMsg = inject("sendMsg") as Function;

    // 是否正在请求, 如果正在请求, 那么就播放加载的动画
    const isSending = ref(false);
    const isUpLoading = ref(false);

    const store = useTeitterStore();
    const { userInfo } = toRefs(store);
    const avatarUrlStyle = computed(() => {
        return `background-image: url(${userInfo.value.avatarUrl}); `;
    });

    const activeClass = ref("");
    const content = ref("");
    const imageUrl = ref<string>();
    const videoUrl = ref<string>();
    // 监视是否有内容,有内容就让按钮可用
    watch([content, imageUrl, videoUrl], (value) => {
        if (value.length > 0) {
            activeClass.value = "btnActive";
        } else {
            activeClass.value = "";
        }
    });

    async function publishBtn() {
        isSending.value = true;
        const fd = new FormData();

        fd.append("content", content.value);
        if (imageUrl.value) {
            fd.append("tweetImg", imageUrl.value);
        }
        if (videoUrl.value) {
            fd.append("tweetVideo ", videoUrl.value);
        }
        const res = await publish(fd);
        if (res == "ok") {
            getTeitter(true);
            content.value = "";
            isSending.value = false;
            imageUrl.value = undefined;
            videoUrl.value = undefined;

            sendMsg("推文发送成功");
        } else {
            sendMsg(res, true);
            // alert(res);
            content.value = "";
            isSending.value = false;
        }
    }

    const fileUpload = async () => {
        try {
            if (fileInput.value?.files?.length) {
                const file = fileInput.value.files[0];
                if (file.size >= 20000000) {
                    sendMsg("文件过大, 请上传20Mb以内文件", true);

                    return;
                }
                isUpLoading.value = true;
                // 判断文件类型如果是图片就压缩, 视频就直接上传
                console.log(file);

                if (file.type == "video/mp4") {
                    // 上传的是mp4视频 直接上传

                    videoUrl.value = await uploadFile(file, "video.mp4");
                } else {
                    const res = await imgCompress(
                        file,
                        1920,
                        1080,
                        0.6,
                        "image/webp",
                    );
                    console.log("压缩后的blob为", res);
                    imageUrl.value = await uploadFile(res, "image.webp");
                }
                // 调用上传接口进行上传
                console.log("上传完成的url为", imageUrl.value);
                isUpLoading.value = false;

                if (imageContainer.value) {
                    imageContainer.value.src = imageUrl.value || "";
                }
                if (videoContainer.value) {
                    videoContainer.value.src = videoUrl.value || "";
                }
            }
        } catch (error) {
            sendMsg((error as Error).message, true);
            isUpLoading.value = false;
        }
    };
    const appendImageOnPaste = async (e: ClipboardEvent) => {
        if (e.clipboardData?.files[0]) {
            try {
                const file = e.clipboardData?.files[0];
                console.log(file);

                if (file.size >= 20000000) {
                    sendMsg("文件过大, 请上传20Mb以内文件", true);
                    return;
                }
                isUpLoading.value = true;

                if (file.type == "video/mp4") {
                    // 上传的是mp4视频 直接上传

                    videoUrl.value = await uploadFile(file, "video.mp4");
                } else {
                    const res = await imgCompress(
                        file,
                        1920,
                        1080,
                        0.6,
                        "image/webp",
                    );
                    console.log("压缩后的blob为", res);
                    imageUrl.value = await uploadFile(res, "image.webp");
                }
                // 调用上传接口进行上传
                console.log("上传完成的url为", imageUrl.value);
                isUpLoading.value = false;

                if (imageContainer.value) {
                    imageContainer.value.src = imageUrl.value || "";
                }
                if (videoContainer.value) {
                    videoContainer.value.src = videoUrl.value || "";
                }
            } catch (error) {
                console.log("用户黏贴的非图片");
                isUpLoading.value = false;
            }
        }
    };
</script>

<style scoped lang="scss">
    .publishTeitter {
        display: flex;
        min-height: 13vmax;
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
                height: 5vmax;
                padding: 1vmax;
                border: 0;
                color: #000000;
                font-weight: normal;
                font-size: 2.1vmax;
                resize: none;
                margin-bottom: 2vmax;
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
            .sendLoader {
                width: 3vmax;

                height: 3vmax;
                position: absolute;
                right: 2vmax;
            }
            .imageContainer {
                margin-top: 2vmax;
                width: 60%;
                img {
                    border-radius: 20px;
                    width: 100%;
                }
            }
            .videoContainer {
                margin-top: 2vmax;
                width: 60%;
                video {
                    border-radius: 20px;

                    width: 100%;
                }
            }
            .imageInput {
                display: none;
            }
            .imageSelector {
                position: relative;
                color: #56b4f4;
                font-size: 2vmax;
                border-radius: 50%;
                padding: 1vmax;
                &:hover {
                    background-color: #e8f5fd;
                }
                .tooltip {
                    font-size: 1.5vmax;
                    background: #1da1f2;
                    bottom: 100%;
                    color: #fff;
                    display: block;
                    left: -25px;
                    margin-bottom: 15px;
                    opacity: 0;
                    padding: 1vmax;
                    pointer-events: none;
                    position: absolute;
                    width: 20vmax;
                    height: 4vmax;
                    transform: translateY(10px);
                    transition: all 0.25s ease-out;
                    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
                }

                /* This bridges the gap so you can mouse into the tooltip without it disappearing */
                .tooltip:before {
                    bottom: -20px;
                    content: " ";
                    display: block;
                    height: 20px;
                    left: 0;
                    position: absolute;
                    width: 100%;
                }

                /* CSS Triangles - see Trevor's post */
                .tooltip:after {
                    border-left: solid transparent 10px;
                    border-right: solid transparent 10px;
                    border-top: solid #1496bb 10px;
                    bottom: -10px;
                    content: " ";
                    height: 0;
                    left: 20%;
                    margin-left: -13px;
                    position: absolute;
                    width: 0;
                }
                &:hover .tooltip {
                    opacity: 1;
                    pointer-events: auto;
                    transform: translateY(0px);
                }
            }
            .uploadLoader {
                span {
                    width: 3vmax;
                    height: 3vmax;
                }
            }
        }
    }
</style>
