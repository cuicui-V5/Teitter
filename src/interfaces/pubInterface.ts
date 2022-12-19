// export interface teitter {
//     avatarUrl: string;
//     tweetId: number;
//     nickName: string;
//     userName: string;
//     content: string;
//     likeCount: number;
//     commentCount: number;
//     forwardCount: number;
//     updatetime: string;
// }
export interface teitter {
    tweetId: number;
    uid: number;
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
    avatarUrl?: string;
    nickName?: string;
    userName?: string;
}
