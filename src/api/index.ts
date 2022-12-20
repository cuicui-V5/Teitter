import request from "./request";
import type { teitter } from "@/interfaces/pubInterface";

import { useTeitterStore } from "./../stores/teitter";
import { storeToRefs } from "pinia";

let teitterCurrentPage = 1;

export async function getTeitter() {
    // 获取首页推文. 从第一页开始查, 每一次查询都加一页, 查到之后直接存到pinia中
    const store = useTeitterStore();
    const { option, teitters } = storeToRefs(store);
    // 发送请求时让isBusy为真, 防止发送重复请求
    option.value.isBusy = true;

    const { data: resData } = await request.get(
        `/getAllTweet/${teitterCurrentPage++}`,
    );
    console.log(resData);

    option.value.teitterCount = resData.data.total;

    const resTeitters: Array<teitter> = resData.data.records;

    // 追加到现有的数据中
    resTeitters.forEach((item) => {
        teitters.value.push(item);
    });

    // 如果当前页码超过总页码. 那么就不加载了
    if (resData.data.current > resData.data.pages) {
        console.log("没有更多了");

        option.value.isBusy = true;
    } else {
        option.value.isBusy = false;
    }
}

export async function logout() {
    return request.get("/logout");
}
export async function isLogin() {
    // 如果登陆了, 返回用户信息, 如果没登陆,返回false
    const res = await request.get("/isLogin");
    console.log(res.data);
    if (res.data.isLogin == true) {
        //    登陆成功后, 用户信息写入store
        const store = useTeitterStore();
        const { userInfo } = storeToRefs(store);
        userInfo.value.isLogin = true;
        userInfo.value.avatarUrl = res.data.userInfo.avatarUrl;
        userInfo.value.nickName = res.data.userInfo.nickName;
        userInfo.value.userName = res.data.userInfo.userName;
    }
}
export async function login(user: {
    userName: string;
    userPassword: string;
}): Promise<string> {
    try {
        const res = await request.post("/login", user, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
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
        const res = await request.post("/sendTwt", tw, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.data.status == 200) {
            console.log(res);

            return "ok";
        } else {
            alert("出现问题了哦");
            return res.data.msg;
        }
    } catch (error) {
        return (error as Error).message;
    }
}

export async function register(fd: FormData): Promise<string> {
    try {
        const res = await request.post("/regist", fd, {
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

export async function like(teitterID: number) {
    console.log(teitterID.toString());

    try {
        const res = await request.post(
            "/incrlike",
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
export async function unLike(teitterID: number) {
    console.log(teitterID.toString());

    try {
        const res = await request.post(
            "/decrlike",
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
