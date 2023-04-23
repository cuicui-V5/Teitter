import request from "./request";
import type {
    followingType,
    followerType,
    teitter,
    userInfo,
} from "@/interfaces/pubInterface";

import { useTeitterStore } from "./../stores/teitter";
import { storeToRefs } from "pinia";
import { inject } from "vue";
import type { AxiosResponse } from "axios";
import type { Tweet, noticeData } from "./../interfaces/pubInterface";

let teitterCurrentPage = 1;
let sendMsg: any;
let retry = 0;
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
        console.log("请求第", teitterCurrentPage);

        option.value.isBusy = true;

        let res = await request.post(
            `/tweet/getAllTweet`,
            {
                pageNum: teitterCurrentPage++,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );

        option.value.teitterCount = res.data.data.total;

        const resTeitters: Array<teitter> = res.data.data.records;

        // 追加到现有的数据中
        resTeitters.forEach(item => {
            teitters.value.push(item);
        });
        // console.log(res.data);

        sendMsg("获取到" + resTeitters.length + "条新推文");
        option.value.isNetWorkError = false;

        // 如果当前页码超过总页码. 那么就不加载了
        if (res.data.data.current >= res.data.data.pages) {
            sendMsg("没有更多了", true);
            console.log("没有更多了");

            option.value.isBusy = true;
        } else {
            option.value.isBusy = false;
        }
    } catch (error) {
        if (retry > 1) {
            sendMsg(`获取首页推文出错${(error as Error).message}`, true);
        }
        localStorage.clear();
        if (retry < 2) {
            setTimeout(() => {
                getTeitter(true);
            }, 500);
            console.log(`第${retry}次重试`);
        }
        retry++;

        if (retry > 2) {
            option.value.isNetWorkError = true;
        }
    }
}

export async function logout() {
    return request.get("/user/logout");
}
export async function isLogin() {
    // 如果登陆了, 返回用户信息, 如果没登陆,返回false
    try {
        const res = await request.get("/user/isLogin");

        if (res.data.isLogin == true) {
            //    登陆成功后, 用户信息写入store
            const store = useTeitterStore();
            const { userInfo } = storeToRefs(store);
            userInfo.value.isLogin = true;
            userInfo.value.avatarUrl = res.data.userInfo.avatarUrl;
            userInfo.value.nickName = res.data.userInfo.nickName;
            userInfo.value.userName = res.data.userInfo.userName;
            userInfo.value.uid = res.data.userInfo.uid;
        }
    } catch (error) {
        console.log((error as Error).message);
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
        if (res.data.status === 200) {
            //    登陆成功后, 用户信息写入store
            const store = useTeitterStore();
            const { userInfo } = storeToRefs(store);
            userInfo.value.isLogin = true;
            userInfo.value.avatarUrl = res.data.data.avatarUrl;
            userInfo.value.nickName = res.data.data.nickName;
            userInfo.value.userName = res.data.data.userName;
            userInfo.value.uid = res.data.data.uid;

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

export async function publish(fd: FormData): Promise<string> {
    try {
        const res = await request.post("/tweet/sendTwt", fd, {
            headers: {
                "Content-Type": "multipart/form-data; ",
            },
        });
        if (res.data.status == 200) {
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

        if (res.data.status == 200) {
            return "ok";
        } else {
            return res.data.msg;
        }
    } catch (error) {
        return (error as Error).message;
    }
}
export async function getComment(tweetId: string) {
    try {
        const res = await request.get(`/comment/getComment/${tweetId}`);
        // console.log(res.data);

        return res.data;
    } catch (error) {
        sendMsg((error as Error).message);
        return {
            status: 400,
        };
    }
}
export async function publishComment(
    id: bigint,
    commentContent: string,
): Promise<string> {
    // 发送评论接口
    try {
        const data = {
            tweetId: id.toString(),
            commentContent,
        };
        const res = await request.post("/comment/addComment", data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.data.status == 200) {
            return "ok";
        } else {
            return res.data.msg;
        }
    } catch (error) {
        return (error as Error).message;
    }
}
export const reqSearch = async (
    keyWord: string,
    pageNum: number,
): Promise<AxiosResponse> => {
    try {
        const res = await request.post(
            "/tweet/getAllTweet",
            {
                keyWord,
                pageNum,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const reqUserInfo = async (uid: string) => {
    try {
        const res = await request.get(`/user/getUserInfo/${uid}`);
        if (res.data.status !== 200) {
            return Promise.reject(new Error("请求用户信息失败"));
        }
        return res.data.userInfo as userInfo;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const reqUserTweet = async (uid: string): Promise<Tweet[]> => {
    try {
        const res = await request.get(`/tweet/getUserTweet/${uid}`);
        if (res.data.status !== 200) {
            return Promise.reject(new Error("请求用户推文失败"));
        }
        return res.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const uploadFile = async (blob: Blob, fileName: string) => {
    try {
        const fd = new FormData();
        fd.append("file", blob, fileName);
        const res = await request.post("/upload", fd, {
            timeout: 10000,
            headers: {
                "Content-Type": "multipart/form-data; ",
            },
        });
        if (res.data.status == 200) {
            return res.data.data as string;
        } else {
            return Promise.reject(new Error("上传失败"));
        }
    } catch (error) {
        return Promise.reject(error);
    }
};
export const editUserInfo = async (userInfo: {
    nickName?: string;
    profile?: string;
    avatarUrl?: string;
    backgroundUrl?: string;
}) => {
    try {
        const res = await request.post("/user/editUserInfo", userInfo, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (res.data.status == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error(res.data.msg));
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

// 获取通知
export const reqNotice = async () => {
    try {
        const res = await request.get("/notice/getAllNotice");
        if (res.data.status == 200) {
            return res.data.data as noticeData[];
        } else {
            return Promise.reject(new Error(res.data.msg));
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

// 通知已读
export const reqHaveRead = async (noticeId: bigint) => {
    try {
        const res = await request.post(
            "/notice/editStatus",
            {
                msgId: noticeId.toString(),
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );

        if (res.data.status == 200) {
            return "ok";
        } else {
            return Promise.reject(res.data.msg);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

// 关注系列
// 关注某个用户
export const reqFollowSomeOne = async (uid: bigint, isFollow: boolean) => {
    try {
        const res = await request.post(
            "/follows/follow",
            {
                userId: uid.toString(),
                isFollow: isFollow ? 1 : 0,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );

        if (res.data.status == 200) {
            return "ok";
        } else {
            return Promise.reject(res.data.msg);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};
// 获取关注者
export const reqFollower = async (uid: string) => {
    try {
        const res = await request.get(`/follows/getAllFans?uid=${uid}`);
        if (res.data.status == 200) {
            return res.data.data as followerType[];
        } else {
            return Promise.reject(new Error(res.data.msg));
        }
    } catch (error) {
        return Promise.reject(error);
    }
};
// 获取正在关注
export const reqFollowing = async (uid: string) => {
    try {
        const res = await request.get(`/follows/getAllFollow?uid=${uid}`);
        if (res.data.status == 200) {
            return res.data.data as followingType[];
        } else {
            return Promise.reject(new Error(res.data.msg));
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

// 删除推文
export const reqDelTweet = async (tweetId: bigint) => {
    try {
        const res = await request.post(
            `/tweet/delTweet`,
            {
                tweetId: tweetId.toString(),
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );
        if (res.data.status == 200) {
            return res.data.data as followingType[];
        } else {
            return Promise.reject(new Error(res.data.msg));
        }
    } catch (error) {
        return Promise.reject(error);
    }
};
