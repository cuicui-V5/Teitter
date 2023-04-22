export interface teitter {
    tweetId: bigint;
    uid: bigint;
    content: string;
    commentCount: number;
    createDate: number;
    likeCount: number;
    tweetImg: string;
    tweetVideo: string;
    avatarUrl: string;
    nickName: string;
    userName: string;
    likeStatus: boolean;
}

export interface userInfo {
    isLogin: boolean;
    userId?: bigint;
    avatarUrl?: string;
    backgroundUrl?: string;
    profile?: string;
    nickName?: string;
    userName?: string;
    createDate?: string;
    tweetCount?: number;
    followsCount?: number;
    fansCount?: number;
    ptoPRelation?: any[];
}

export interface commentRes {
    msg: string;
    comments: Comment[];
    tweet: Tweet;
    status: number;
}

export interface Comment {
    uid: bigint;
    commentContent: string;
    createDate: number;
    isDeleted: number;
    userName: string;
    nickName: string;
    avatarUrl: string;
}

export interface Tweet {
    tweetId: bigint;
    uid: bigint;
    content: string;
    createDate: number;
    likeCount: number;
    commentCount: number;
    pv: number;
    isDeleted: number;
    avatarUrl: string;
    nickName: string;
    userName: string;
    likeStatus: boolean;
    tweetImg: string;
    tweetVideo: string;
}
export interface noticeData {
    nickName: string;
    senderId: bigint;
    content: string;
    comment: string;
    tweetId: bigint;
    createDate: string;
    status: boolean;
    msgType: number;
    avatar_url: string;
    messageId: bigint;
}
export interface followingType {
    uid: number;
    fansUserNickname: string;
    fansUserAvatar: string;
    fansUsername: string;
    fansUserProfile: string;
    createDate: number;
}
