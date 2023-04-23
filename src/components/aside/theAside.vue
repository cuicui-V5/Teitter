<template>
    <div class="aside_main">
        <ul>
            <RouterLink
                :to="{
                    name: 'home',
                }"
            >
                <span class="logo"></span>
            </RouterLink>
            <RouterLink
                :to="{
                    name: 'home',
                }"
                class="iconfont icon-zhuye"
                active-class="homeActive"
                exact
            ></RouterLink>
            <RouterLink
                :to="{
                    name: 'search',
                }"
                class="iconfont icon-search"
                active-class="searchActive"
                exact
            ></RouterLink>
            <RouterLink
                :to="{
                    name: 'notice',
                }"
                class="iconfont icon-notice1 notice"
                active-class="noticeActive"
            >
                <div
                    class="noticeCount"
                    :style="{
                        display: noticeNum ? `block` : `none`,
                    }"
                >
                    {{ noticeNum }}
                </div>
            </RouterLink>
            <RouterLink
                :to="{
                    name: 'email',
                }"
                class="iconfont icon-email"
                active-class="emailActive"
            ></RouterLink>
            <RouterLink
                :to="{
                    name: 'account',
                    params: {
                        userId: store.userInfo.uid?.toString(),
                    },
                }"
                class="iconfont icon-account"
                active-class="accountActive"
            ></RouterLink>
            <li
                class="userAvatar"
                @click.stop="isShowUserInfoCard = !isShowUserInfoCard"
            >
                <span :style="avatarUrlStyle"></span>

                <userInfoCard
                    v-if="isShowUserInfoCard"
                    @closeCard="closeCard"
                ></userInfoCard>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, toRefs } from "vue";
    import userInfoCard from "./userInfoCard.vue";
    import { useTeitterStore } from "../../stores/teitter";
    import { RouterLink } from "vue-router";

    const store = useTeitterStore();
    const { userInfo } = toRefs(store);

    const isShowUserInfoCard = ref(false);
    const avatarUrlStyle = computed(() => {
        return `background-image: url(${userInfo.value.avatarUrl}); `;
    });
    // 点击窗口其他区域, 关闭用户卡片
    document.addEventListener("click", e => {
        isShowUserInfoCard.value = false;
    });

    // 关闭用户卡片的方法
    function closeCard() {
        isShowUserInfoCard.value = false;
    }
    const noticeNum = computed(() => {
        // 返回未读通知的数量
        return store.notice?.filter(item => {
            return !item.status;
        }).length;
    });
</script>

<style scoped lang="scss">
    .aside_main {
        z-index: 9;
        // width: 8.3vmax;
        flex: 0.0875;
        flex: 87;
        height: 100vh;
        ul {
            position: relative;
            height: 100vh;
            display: flex;
            flex-direction: column;
            a {
                color: black;
                text-decoration: none;
                &:active {
                    color: black;
                }
            }
            .logo {
                display: block;
                width: 5.12vmax;
                height: 5.12vmax;
                margin: 0.5vmax auto;
                background-image: url(../../img/logo.png);
                background-size: contain;
                &:hover {
                    background-image: url(../../img/CLIPLY_372109260_TWITTER_LOGO_400.gif);
                }
            }
            .iconfont {
                display: block;
                width: 2.6vmax;
                margin: 1vmax auto;
                padding: 1vmax;
                border-radius: 50%;
                font-size: 2.6vmax;
                transition: all 0.2s;
                &:hover {
                    background-color: #e7e7e8;
                }
            }
            .userAvatar {
                width: 4vmax;
                height: 4vmax;
                position: relative;
                left: 50%;
                padding: 0.5vmax;
                border-radius: 50%;
                transition: all 0.2s;
                transform: translateX(-50%);

                &:hover {
                    background-color: #e7e7e8;
                }
                span {
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: block;
                    width: 4vmax;
                    height: 4vmax;
                    border-radius: 50%;
                    // background-image: url(../../img/defaultAvatar.jpg);
                    background-size: cover;
                    background-position: center;
                }
            }
            .notice {
                position: relative;
                .noticeCount {
                    position: absolute;
                    right: 0;
                    top: 0;

                    text-align: center;
                    font-size: 1vmax;
                    color: #fff;
                    line-height: 2vmax;
                    width: 2vmax;
                    height: 2vmax;
                    border-radius: 50%;
                    background-color: #1da1f2;
                }
            }

            .homeActive {
                &::before {
                    content: "\e600";
                }
            }
            .searchActive {
                &::before {
                    content: "\e742";
                }
            }
            .noticeActive {
                &::before {
                    content: "\e63e";
                }
            }
            .emailActive {
                &::before {
                    content: "\e77e";
                }
            }
            .accountActive {
                &::before {
                    content: "\e655";
                }
            }
        }
    }
</style>
