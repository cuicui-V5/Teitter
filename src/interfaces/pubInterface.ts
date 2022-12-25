export interface teitter {
    tweetId: bigint;
    uid: bigint;
    content: string;
    createDate: number;
    likeCount: number;
    tweetImg: string;
    avatarUrl: string;
    nickName: string;
    userName: string;
    likeStatus: boolean;
}

export interface userInfo {
    isLogin: boolean;
    userId?: bigint;
    avatarUrl?: string;
    nickName?: string;
    userName?: string;
}

export interface commentRes {
    msg: string;
    comments: Comment[];
    tweet: Tweet;
    status: number;
}

export interface Comment {
    uid: number;
    commentContent: string;
    createDate: number;
    isDeleted: number;
    userName: string;
    nickName: string;
    avatarUrl: string;
}

export interface Tweet {
    tweetId: number;
    uid: number;
    content: string;
    createDate: number;
    likeCount: number;
    commentCount: number;
    pv: number;
    isDeleted: number;
}
