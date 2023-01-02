<template>
    <div class="account">
        <div class="tittle animate__animated animate__fadeIn faster">
            <div class="top">
                <span
                    class="back iconfont icon-jiantou_xiangzuo"
                    @click="goHome"
                ></span>
                <div class="nickNameAndCount">
                    <div class="nickName">Funny</div>
                    <div class="tweetCount">220 推文</div>
                </div>
            </div>
        </div>
        <div class="infoCard">
            <div class="bgImg"></div>
            <div class="avatar"></div>
            <button>编辑个人资料</button>
            <div class="text">
                <div class="nickName">Funny</div>
                <div class="userName">@wannaApeach</div>
                <div class="profile">
                    <p>
                        零叉干货铺 | 大橙子社区 我个人微信：BigOrange623
                        (加我备注：twitter)
                        小叮当微信：DingdangDD6（加叮当进免费群）
                        YouTube：http://youtube.com/@0xVeyBigOrange
                        哔哩哔哩：http://space.bilibili.com/1589802019
                    </p>
                </div>
                <div class="joinTime">2018年8月 加入</div>
            </div>
            <Teleport to="body">
                <editUserInfoVue></editUserInfoVue>
            </Teleport>
        </div>
    </div>
</template>

<script setup lang="ts">
    import editUserInfoVue from "@/components/editUserInfo.vue";
    import router from "@/router";
    import { useRoute } from "vue-router";

    const route = useRoute();

    const goHome = () => {
        router.push({
            name: "home",
        });
    };
</script>

<style scoped lang="less">
    .account {
        flex: 605;

        padding-top: 4vmax;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
        padding-bottom: 15vmax;

        .tittle {
            z-index: 2;
            width: 100%;
            user-select: none;
            backdrop-filter: blur(20px);
            background-color: rgba(255, 255, 255, 0.8);
            position: fixed;
            top: 0;
            .top {
                display: flex;
                align-items: center;
                font-size: 3vmax;
                .back {
                    padding: 0.7vmax;
                    display: block;
                    border-radius: 50%;
                    transition: 0.2s all;
                    font-size: 3vmax;
                    &:hover {
                        background-color: #a4a4a44b;
                    }
                }
                .nickNameAndCount {
                    margin-left: 2vmax;
                    .nickName {
                        font-size: 1.8vmax;
                        font-weight: bold;
                    }
                    .tweetCount {
                        font-size: 1.2vmax;

                        color: #677682;
                    }
                }
            }
        }
        .infoCard {
            width: 100%;
            position: relative;
            padding-bottom: 2vmax;
            border-bottom: 1px solid #e7e7e8;

            .bgImg {
                height: 20vmax;
                margin-bottom: 10vmax;
                background-color: pink;
                background-image: url(@/img/bg.jpg);
                background-position: center;
                background-size: cover;
            }
            .avatar {
                position: absolute;
                width: 15vmax;
                height: 15vmax;
                top: 13vmax;
                left: 2vmax;
                border-radius: 50%;
                background-image: url(@/img/avatar.png);
                background-size: cover;
            }
            button {
                position: absolute;
                top: 21vmax;
                left: 45vmax;
                width: 13vmax;
                height: 4vmax;
                border-radius: 2vmax;
                font-size: 1.4vmax;
                font-weight: bold;
                border: 1px solid #d4dde1;
                transition: all 200ms;
                &:hover {
                    background-color: #e7e7e8;
                }
            }
            .text {
                margin-left: 2vmax;
                .nickName {
                    font-size: 2.5vmax;
                    font-weight: bold;
                }
                .userName {
                    font-size: 1.6vmax;
                    color: #677682;
                }
                .profile {
                    margin-top: 1vmax;
                    font-size: 1.4vmax;
                }
                .joinTime {
                    margin-top: 1vmax;
                    font-size: 1.4vmax;
                }
            }
        }
    }
</style>
