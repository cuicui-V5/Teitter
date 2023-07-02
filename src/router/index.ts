import { createRouter, createWebHashHistory } from "vue-router";
import mainView from "@/views/homePageView/mainView.vue";
import homepageView from "../views/homePageView/homePageView.vue";
// import accountView from "../views/homePageView/accountView.vue";
// import searchView from "../views/homePageView/searchView.vue";
// import noticeView from "../views/homePageView/noticeView.vue";
// import chatView from "../views/homePageView/chatView.vue";
// import followView from "../views/homePageView/follow/followView.vue";
// import followerView from "../views/homePageView/follow/follower.vue";
// import followingView from "../views/homePageView/follow/following.vue";

// import tweetInfoView from "../views/homePageView/tweetInfoView.vue";

// import loginRegisterView from "@/views/loginView/loginRegisterView.vue";
// import theLoginVue from "@/components/login/theLogin.vue";
// import theRegisterVue from "@/components/login/theRegister.vue";

// 将原来的静态导入语句替换成动态导入语句
// const mainView = () => import("@/views/homePageView/mainView.vue");
// const homepageView = () => import("../views/homePageView/homePageView.vue");
const accountView = () => import("../views/homePageView/accountView.vue");
const searchView = () => import("../views/homePageView/searchView.vue");
const noticeView = () => import("../views/homePageView/noticeView.vue");
const chatView = () => import("../views/homePageView/chatView.vue");
const statusView = () => import("../views/statusView.vue");
const followView = () => import("../views/homePageView/follow/followView.vue");
const followerView = () => import("../views/homePageView/follow/follower.vue");
const followingView = () =>
    import("../views/homePageView/follow/following.vue");

const tweetInfoView = () => import("../views/homePageView/tweetInfoView.vue");

const loginRegisterView = () =>
    import("@/views/loginView/loginRegisterView.vue");
const theLoginVue = () => import("@/components/login/theLogin.vue");
const theRegisterVue = () => import("@/components/login/theRegister.vue");

const router = createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: "/",
            component: mainView,
            redirect: "home",

            children: [
                {
                    path: "/home",
                    name: "home",
                    component: homepageView,
                    meta: {
                        keepAlive: true,
                        cname: "首页/Teitter",
                    },
                },
                {
                    path: "/search/:keyWord?",
                    name: "search",
                    component: searchView,
                    meta: {
                        cname: "搜索/Teitter",
                    },
                },
                {
                    path: "/notice",
                    name: "notice",
                    component: noticeView,
                    meta: {
                        cname: "通知/Teitter",
                    },
                },
                {
                    path: "/chat",
                    name: "chat",
                    component: chatView,
                    meta: {
                        cname: "私信/Teitter",
                    },
                },
                {
                    path: "/account/:userId?",
                    name: "account",
                    component: accountView,
                    meta: {
                        cname: "个人信息/Teitter",
                    },
                },
                {
                    path: "/status/:userId?",
                    name: "status",
                    component: statusView,
                    meta: {
                        cname: "统计信息/Teitter",
                    },
                },
                {
                    path: "/tweet/:tweetId?",
                    name: "tweetInfo",
                    component: tweetInfoView,
                    meta: {
                        cname: "忒文/Teitter",
                    },
                },
                {
                    path: "/follow/:userId",
                    name: "follow",
                    component: followView,
                    meta: {
                        cname: "关注/Teitter",
                    },
                    children: [
                        {
                            path: "follower",
                            name: "follower",
                            component: followerView,
                            meta: {
                                cname: "关注者/Teitter",
                            },
                        },
                        {
                            path: "following",
                            name: "following",
                            component: followingView,
                            meta: {
                                cname: "正在关注/Teitter",
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: "/loginRegister",
            component: loginRegisterView,
            redirect: "login",
            children: [
                {
                    path: "/login",
                    name: "login",
                    component: theLoginVue,
                    meta: {
                        cname: "登录/Teitter",
                    },
                },
                {
                    path: "/register",
                    name: "register",
                    component: theRegisterVue,
                    meta: {
                        cname: "注册/Teitter",
                    },
                },
            ],
        },
    ],
});
router.afterEach((to, from, failure) => {
    if (failure) {
        console.log("路由导航错误");
    } else {
        document.title = to.meta.cname as string;
    }
});
export default router;
