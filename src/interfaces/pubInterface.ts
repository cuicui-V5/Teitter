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
