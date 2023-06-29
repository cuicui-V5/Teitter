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
    uid?: bigint;
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
    tweetId: bigint;
    uid: bigint;
    parentTweetId: bigint;
    content: string;
    nickName: string;
    createDate: number;
    likeCount: number;
    commentCount: number;
    pv: number;
    isDeleted: number;
    userName: string;
    avatarUrl: string;
    likeStatus: boolean;
}

export interface Tweet {
    tweetId: bigint;
    uid: bigint;
    level: number;
    parentTweetId: bigint;
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
    repliedNickNameTo: string;
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
export interface followerType {
    uid: bigint;
    fansUserNickname: string;
    fansUserAvatar: string;
    fansUsername: string;
    fansUserProfile: string;
    createDate: number;
}
export interface followingType {
    uid: bigint;
    followUserNickname: string;
    followUserAvatar: string;
    followsUsername: string;
    followsUserProfile: string;
    createDate: number;
}
export interface hotNews {
    status: number;
    msg: string;
    data: hotNewsDataType[];
}

export interface hotNewsDataType {
    type: string;
    style_type: string;
    id: string;
    card_id: string;
    card_label?: CardLabel;
    target: Target;
    attached_info: string;
    detail_text: string;
    trend: number;
    debut: boolean;
    children: Children[];
}

export interface CardLabel {
    type: string;
    icon: string;
    night_icon: string;
}

export interface Target {
    id: number;
    title: string;
    url: string;
    type: string;
    created: number;
    answer_count: number;
    follower_count: number;
    author: Author;
    bound_topic_ids: number[];
    comment_count: number;
    is_following: boolean;
    excerpt: string;
}

export interface Author {
    type: string;
    user_type: string;
    id: string;
    url_token: string;
    url: string;
    name: string;
    headline: string;
    avatar_url: string;
}

export interface Children {
    type: string;
    thumbnail: string;
}
