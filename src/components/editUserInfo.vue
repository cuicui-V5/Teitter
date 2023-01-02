<template>
    <div class="editUserInfo">
        <div class="mask">
            <div class="container">
                <div class="tittle">
                    <span class="close iconfont icon-close"></span>
                    <span class="text">编辑个人资料</span>
                    <button class="save">保存</button>
                </div>
                <div class="bgImg">
                    <span class="changeBgImg iconfont icon-charutupian"></span>
                </div>
                <div class="avatar">
                    <span class="changeAvatar iconfont icon-charutupian"></span>
                </div>
                <div class="nickName">
                    <span class="title">昵称</span>
                    <input
                        type="text"
                        class="nickNameInput"
                    />
                </div>
                <div class="profile">
                    <span class="title">简介</span>
                    <textarea class="profileInput" />
                </div>
                <div class="password">
                    <span class="title">新密码</span>
                    <input
                        type="text"
                        class="passwordInput"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
    .editUserInfo {
        .mask {
            z-index: 999;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.26);
            .container {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 55%;
                height: 90%;
                border-radius: 4%;
                background-color: #fff;
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
                        color: #fff;
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
                    background: url(@/img/bg.jpg) rgba(0, 0, 0, 0.3);
                    background-size: cover;
                    background-blend-mode: multiply;
                    .changeBgImg {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 3vmax;
                        color: #fff;
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
                    background: url(@/img/avatar.png) rgba(0, 0, 0, 0.3);
                    background-size: cover;
                    background-blend-mode: multiply;
                    .changeAvatar {
                        text-align: center;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 3vmax;
                        color: #fff;
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

                        &:focus {
                            border: 4px solid #1d9bf0;
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
                        &:focus {
                            border: 4px solid #1d9bf0;
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

                        &:focus {
                            border: 4px solid #1d9bf0;
                            outline: 0;
                        }
                    }
                }
            }
        }
    }
</style>
