import { createRouter, createWebHashHistory } from "vue-router";
import mainView from "@/views/homePageView/mainView.vue";
import homepageView from "../views/homePageView/homePageView.vue";
import accountView from "../views/homePageView/accountView.vue";
import searchView from "../views/homePageView/searchView.vue";
import noticeView from "../views/homePageView/noticeView.vue";
import emailView from "../views/homePageView/emailView.vue";

import tweetInfoView from "../views/homePageView/tweetInfoView.vue";

import loginRegisterView from "@/views/loginView/loginRegisterView.vue";
import theLoginVue from "@/components/login/theLogin.vue";
import theRegisterVue from "@/components/login/theRegister.vue";

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
                    },
                },
                {
                    path: "/search:keyWord?",
                    name: "search",
                    component: searchView,
                },
                {
                    path: "/notice",
                    name: "notice",
                    component: noticeView,
                },
                {
                    path: "/email",
                    name: "email",
                    component: emailView,
                },
                {
                    path: "/account/:userId?",
                    name: "account",
                    component: accountView,
                },
                {
                    path: "/tweet/:tweetId?",
                    name: "tweetInfo",
                    component: tweetInfoView,
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
                },
                {
                    path: "/register",
                    name: "register",
                    component: theRegisterVue,
                },
            ],
        },
    ],
});

export default router;
