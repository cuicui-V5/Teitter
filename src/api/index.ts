import request from "./request";
import type { teitter } from "@/interfaces/pubInterface";

import { useTeitterStore } from "./../stores/teitter";
import { storeToRefs } from "pinia";
import { inject } from "vue";

let teitterCurrentPage = 1;
let sendMsg: any;

// 获取新推文, 如果isFlush为true, 那么就重置从头获取
export async function getTeitter(isFlush?: boolean) {
    if (!sendMsg) {
        sendMsg = inject("sendMsg") as Function;
    }
    // console.log(sendMsg);

    const store = useTeitterStore();
    const { option, teitters } = storeToRefs(store);
    if (isFlush) {
        teitterCurrentPage = 1;
        store.teitters = [];
    }
    // 获取首页推文. 从第一页开始查, 每一次查询都加一页, 查到之后直接存到pinia中
    // 发送请求时让isBusy为真, 防止发送重复请求
    try {
        option.value.isBusy = true;

        let { data: resData } = await request.get(
            `/tweet/getAllTweet/${teitterCurrentPage++}`,
        );
        if (resData.status == 401) {
            localStorage.clear();
            resData = (
                await request.get(`/tweet/getAllTweet/${teitterCurrentPage++}`)
            ).data;
        }

        option.value.teitterCount = resData.data.total;

        const resTeitters: Array<teitter> = resData.data.records;

        // 追加到现有的数据中
        resTeitters.forEach((item) => {
            teitters.value.push(item);
        });
        // console.log(resData);

        sendMsg("获取到" + resTeitters.length + "条新推文");
        // 如果当前页码超过总页码. 那么就不加载了
        if (resData.data.current > resData.data.pages) {
            sendMsg("没有更多了", true);
            console.log("没有更多了");

            option.value.isBusy = true;
        } else {
            option.value.isBusy = false;
        }
    } catch (error) {
        // sendMsg("获取首页推文出错" + (error as Error).message);
    }
}

export async function logout() {
    return request.get("/user/logout");
}
export async function isLogin() {
    // 如果登陆了, 返回用户信息, 如果没登陆,返回false
    const res = await request.get("/user/isLogin");
    console.log(res.data);
    if (res.data.isLogin == true) {
        //    登陆成功后, 用户信息写入store
        const store = useTeitterStore();
        const { userInfo } = storeToRefs(store);
        userInfo.value.isLogin = true;
        userInfo.value.avatarUrl = res.data.userInfo.avatarUrl;
        userInfo.value.nickName = res.data.userInfo.nickName;
        userInfo.value.userName = res.data.userInfo.userName;
        userInfo.value.userId = res.data.userInfo.uid;
    }
}
export async function login(user: {
    userName: string;
    userPassword: string;
}): Promise<string> {
    try {
        const res = await request.post("/user/login", user, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(res.data);
        if (res.data.status === 200) {
            //    登陆成功后, 用户信息写入store
            const store = useTeitterStore();
            const { userInfo } = storeToRefs(store);
            userInfo.value.isLogin = true;
            userInfo.value.avatarUrl = res.data.data.avatarUrl;
            userInfo.value.nickName = res.data.data.nickName;
            userInfo.value.userName = res.data.data.userName;
            userInfo.value.userId = res.data.data.uid;

            // 将token存到localStorage
            localStorage.setItem("token", res.data.map.token);
            return "ok";
        } else {
            return res.data.msg;
        }
    } catch (err: unknown) {
        return (err as Error).message;
    }
}

export async function publish(tw: { content: string }): Promise<string> {
    try {
        const res = await request.post("/tweet/sendTwt", tw, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.data.status == 200) {
            console.log(res);

            return "ok";
        } else {
            return res.data.msg;
        }
    } catch (error) {
        return (error as Error).message;
    }
}

export async function register(fd: FormData): Promise<string> {
    try {
        const res = await request.post("/user/regist", fd, {
            headers: {
                "Content-Type": "multipart/form-data; ",
            },
        });
        console.log(res);
        if (res.data.status == 200) {
            return "ok";
        } else {
            return res.data.msg;
        }
    } catch (error: unknown) {
        return (error as Error).message;
    }
}

export async function like(teitterID: bigint) {
    console.log(teitterID.toString());

    try {
        const res = await request.post(
            "/tweet/like",
            { tweetId: teitterID.toString() },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );
        console.log(res);

        if (res.data.status == 200) {
            return "ok";
        } else {
            return res.data.msg;
        }
    } catch (error) {
        return (error as Error).message;
    }
}
export async function unLike(teitterID: bigint) {
    console.log(teitterID.toString());

    try {
        const res = await request.post(
            "/tweet/unLike",
            { tweetId: teitterID.toString() },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );
        console.log(res);

        if (res.data.status == 200) {
            return "ok";
        } else {
            return res.data.msg;
        }
    } catch (error) {
        return (error as Error).message;
    }
}
