<template>
    <div class="editUserInfo">
        <input
            type="file"
            accept="image/*"
            hidden
            ref="bgInput"
            @change="updateBg"
        />
        <input
            type="file"
            accept="image/*"
            hidden
            ref="avatarInput"
            @change="updateAvatar"
        />
        <div
            class="mask"
            @click.self="emit('close')"
        >
            <div class="box animate__animated animate__fadeIn faster">
                <div class="container">
                    <div class="tittle">
                        <span
                            class="close iconfont icon-close"
                            @click.self="emit('close')"
                        ></span>
                        <span class="text">编辑个人资料</span>
                        <button
                            class="save"
                            @click="updateUser"
                        >
                            保存
                        </button>
                    </div>
                    <div class="bgImg">
                        <img
                            :src="bgImgUrl"
                            ref="bgContainer"
                        />
                        <span
                            class="changeBgImg iconfont icon-charutupian"
                            @click="bgInput?.click()"
                        ></span>
                    </div>
                    <div class="avatar">
                        <img
                            :src="avatarImgUrl"
                            ref="avatarContainer"
                        />
                        <span
                            class="changeAvatar iconfont icon-charutupian"
                            @click="avatarInput?.click()"
                        ></span>
                    </div>
                    <div class="nickName">
                        <span class="title">昵称</span>
                        <input
                            type="text"
                            class="nickNameInput"
                            :value="userInfo.nickName"
                            ref="nickNameInput"
                        />
                    </div>
                    <div class="profile">
                        <span class="title">简介</span>
                        <textarea
                            class="profileInput"
                            :value="userInfo.profile"
                            ref="proFileInput"
                        />
                    </div>
                    <!-- <div class="password">
                        <span class="title">新密码</span>
                        <input
                            type="text"
                            class="passwordInput"
                        />
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <imgClipper
        v-if="isShowImgClipper"
        :file="img"
        :quality="0.5"
        @output="getClippedImg"
    ></imgClipper>
</template>

<script setup lang="ts">
    import imgClipper from "./imgClipper.vue";
    import { editUserInfo, uploadFile } from "@/api";
    import type { userInfo } from "@/interfaces/pubInterface";
    import { useTeitterStore } from "@/stores/teitter";
    import { imgCompress } from "@/utils/imgCompress";
    import { computed, inject, ref, toRaw, toRefs } from "vue";
    const props = defineProps<{
        userInfo: userInfo;
    }>();
    const img = ref<File>();
    const isShowImgClipper = ref(false);
    const { userInfo } = toRefs(props);

    const sendMsg = inject("sendMsg") as Function;
    const store = useTeitterStore();

    const bgImgUrl = ref(userInfo.value.backgroundUrl);
    const avatarImgUrl = ref(userInfo.value.avatarUrl);

    const bgInput = ref<HTMLInputElement>();
    const avatarInput = ref<HTMLInputElement>();
    const bgContainer = ref<HTMLImageElement>();
    const avatarContainer = ref<HTMLImageElement>();
    const nickNameInput = ref<HTMLInputElement>();
    const proFileInput = ref<HTMLTextAreaElement>();

    let uploadType: "avatar" | "bg" = "avatar";
    const emit = defineEmits(["close", "getUserInfo"]);
    const getClippedImg = async (res: File) => {
        isShowImgClipper.value = false;
        if (uploadType == "avatar") {
            avatarImgUrl.value = await uploadFile(res, "image.webp");
        } else {
            bgImgUrl.value = await uploadFile(res, "image.webp");
        }
    };
    const updateBg = async () => {
        try {
            if (bgInput.value?.files?.length) {
                const file = bgInput.value.files[0];
                console.log(file);
                if (file.size >= 20000000) {
                    sendMsg("文件过大, 请上传20Mb以内文件", true);

                    return;
                }
                // const res = await imgCompress(
                //     file,
                //     1920,
                //     1080,
                //     0.92,
                //     "image/webp",
                // );
                // console.log("压缩后的blob为", res);
                // bgImgUrl = await uploadFile(res, "image.webp");
                // // 调用上传接口进行上传
                // console.log("上传完成的url为", bgImgUrl);

                // if (bgContainer.value) {
                //     bgContainer.value.src = bgImgUrl;
                // }
                img.value = file;
                isShowImgClipper.value = true;
                uploadType = "bg";
            }
        } catch (error) {
            console.log((error as Error).message);
        }
    };
    const updateAvatar = async () => {
        try {
            if (avatarInput.value?.files?.length) {
                const file = avatarInput.value.files[0];
                console.log(file);
                if (file.size >= 20000000) {
                    sendMsg("文件过大, 请上传20Mb以内文件", true);

                    return;
                }
                // const res = await imgCompress(
                //     file,
                //     1920,
                //     1080,
                //     0.5,
                //     "image/webp",
                // );
                // console.log("压缩后的blob为", res);
                // avatarImgUrl = await uploadFile(res, "image.webp");
                // // 调用上传接口进行上传
                // console.log("上传完成的url为", avatarImgUrl);
                // if (avatarContainer.value) {
                //     avatarContainer.value.src = avatarImgUrl;
                // }
                img.value = file;

                isShowImgClipper.value = true;
                uploadType = "avatar";
            }
        } catch (error) {
            console.log((error as Error).message);
        }
    };
    const updateUser = async () => {
        const userInfo = {
            nickName: nickNameInput.value?.value,
            profile: proFileInput.value?.value,
            avatarUrl: avatarImgUrl.value,
            backgroundUrl: bgImgUrl.value,
        };
        try {
            const res = await editUserInfo(userInfo);
            location.reload();
        } catch (error) {
            sendMsg("更新用户出错" + (error as Error).message, true);
        }
    };
</script>

<style scoped lang="less">
    .editUserInfo {
        .mask {
            z-index: 999;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.555);
            .box {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 55%;
                height: 90%;
                .container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 4%;
                    background-color: var(--primary-bg);
                    overflow-y: scroll;
                    &::-webkit-scrollbar {
                        display: none;
                    }
                    .tittle {
                        height: 3vmax;
                        padding: 1vmax;
                        display: flex;
                        align-items: center;
                        .close {
                            vertical-align: middle;

                            font-size: 2vmax;
                            font-weight: bold;
                            padding: 0.6vmax;
                            border-radius: 50%;
                            &:hover {
                                background-color: #e7e7e8;
                            }
                        }
                        .text {
                            vertical-align: middle;
                            font-size: 2vmax;
                            font-weight: bold;
                            margin-left: 4vmax;
                        }
                        .save {
                            vertical-align: middle;
                            margin-left: auto;
                            width: 6vmax;
                            height: 3vmax;
                            color: var(--primary-bg);
                            font-size: 1.4vmax;
                            font-weight: bol;
                            background-color: #0f1419;
                            border-radius: 1.5vmax;
                        }
                    }
                    .bgImg {
                        position: relative;
                        height: 20vmax;
                        margin-bottom: 12vmax;
                        background-size: cover;
                        background-color: var(--main-color);
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                        .changeBgImg {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 3vmax;
                            color: var(--primary-bg);
                            padding: 1vmax;
                            background-color: #56595c;
                            border-radius: 50%;
                            &:hover {
                                background-color: #646769;
                            }
                        }
                    }
                    .avatar {
                        position: absolute;
                        width: 15vmax;
                        height: 15vmax;
                        top: 19vmax;
                        left: 2vmax;
                        border-radius: 50%;
                        border: 2px solid var(--main-color);
                        background-color: var(--primary-bg);
                        img {
                            border-radius: 50%;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                        .changeAvatar {
                            text-align: center;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 3vmax;
                            color: var(--primary-bg);
                            padding: 1vmax;
                            background-color: #56595c;
                            border-radius: 50%;
                            &:hover {
                                background-color: #646769;
                            }
                        }
                    }
                    .nickName {
                        width: 80%;
                        margin: 0 auto;
                        position: relative;
                        margin-bottom: 2vmax;
                        .title {
                            position: absolute;
                            top: 0.6vmax;
                            left: 0.6vmax;
                            display: block;
                            font-size: 1.4vmax;
                            color: #536471;
                        }
                        .nickNameInput {
                            width: 100%;
                            height: 4vmax;
                            padding-top: 1.6vmax;
                            padding-left: 0.6vmax;
                            font-size: 1.5vmax;
                            border-radius: 15px;
                            border: 1px solid #cfd9de;
                            transition: all 0.2s;
                            &:focus {
                                border: 4px solid var(--main-color);
                                outline: 0;
                            }
                        }
                    }
                    .profile {
                        width: 80%;
                        margin: 0 auto;
                        position: relative;
                        margin-bottom: 2vmax;
                        .title {
                            position: absolute;
                            top: 0.6vmax;
                            left: 0.6vmax;
                            display: block;
                            font-size: 1.4vmax;
                            color: #536471;
                        }
                        .profileInput {
                            width: 100%;
                            height: 4vmax;
                            padding-top: 3vmax;
                            padding-left: 0.6vmax;
                            font-size: 1.5vmax;
                            border-radius: 15px;
                            border: 1px solid #cfd9de;
                            resize: none;
                            transition: all 0.2s;

                            &:focus {
                                border: 4px solid var(--main-color);
                                outline: 0;
                            }
                        }
                    }
                    .password {
                        width: 80%;
                        margin: 0 auto;
                        position: relative;
                        margin-bottom: 2vmax;
                        .title {
                            position: absolute;
                            top: 0.6vmax;
                            left: 0.6vmax;
                            display: block;
                            font-size: 1.4vmax;
                            color: #536471;
                        }
                        .passwordInput {
                            width: 100%;
                            height: 4vmax;
                            padding-top: 1.6vmax;
                            padding-left: 0.6vmax;
                            font-size: 1.5vmax;
                            border-radius: 15px;
                            border: 1px solid #cfd9de;
                            transition: all 0.2s;

                            &:focus {
                                border: 4px solid var(--main-color);
                                outline: 0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
