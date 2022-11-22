import { createRouter, createWebHashHistory } from "vue-router";
import mainView from "@/views/homePageView/mainView.vue";
import homepageView from "../views/homePageView/homePageView.vue";
import accountView from "../views/homePageView/accountView.vue";
import searchView from "../views/homePageView/searchView.vue";
import noticeView from "../views/homePageView/noticeView.vue";
import emailView from "../views/homePageView/emailView.vue";
import loginViewVue from "@/views/loginView/loginView.vue";

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
                },
                {
                    path: "/search",
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
                    path: "/account",
                    name: "account",
                    component: accountView,
                },
            ],
        },
        {
            path: "/login",
            name: "login",
            component: loginViewVue,
        },
    ],
});

export default router;
