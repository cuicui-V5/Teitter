<template>
    <div class="container">
        <div class="title">关于忒特</div>
        <div class="main">
            <p><strong>社交网站 忒特</strong></p>
            <p>
                项目地址:
                <a href="https://teitter.cuijunyu.win">
                    https://teitter.cuijunyu.win
                </a>
            </p>
            <p>
                Github地址:
                <a href="https://github.com/cuicui-V5/Teitter">
                    https://github.com/cuicui-V5/Teitter
                </a>
            </p>
            <p>
                这是一个基于Vue构建的现代社交网站。前端由我个人独立完成，后端由我工作室的小伙伴使用Java完成。
            </p>
            <p>
                该网站具有完善的功能，包括用户注册登录、个人资料修改、用户互相关注、用户私信、推文的发送、点赞、评论、搜索和消息通知等。
            </p>
            <p>
                项目的亮点在于采用了现代前端技术构建，拥有精心设计的用户界面、流畅的动画效果以及自动切换深色模式的功能。同时支持推文嵌套评论和基于Websocket的实时私信等特性。
            </p>
            <p>技术栈：Vite+Vue+TypeScript+Pinia+Axios+WebSocket+Animate.css</p>
            <ul>
                <li>
                    封装了Axios拦截器，实现请求携带Token并处理Token失效的情况。
                </li>
                <li>
                    使用vue-virtual-scroller虚拟列表优化主页信息流加载，确保即使加载大量数据也没有卡顿。
                </li>
                <li>
                    针对不同屏幕比例进行UI适配，并通过媒体查询与CSS变量来实现深色模式的自动切换。
                </li>
                <li>
                    图片上传采用Canvas导出Webp格式的图片压缩方案，在保持画质不变的情况下大幅提高传输速度（1Mb=>100k）。
                </li>
                <li>
                    使用lottie-web动画库实现清晰、流畅的动画效果，使用dayjs进行时间戳转换，qrcode生成分享二维码，animate.css实现动画效果，vue-lazyload实现图片的懒加载，marked配合dompurify实现markdown渲染并防止XSS攻击。
                </li>
                <li>基于WebSocket封装了通信模块，实现私信系统的实时通信。</li>
                <li>
                    使用Vercel进行自动化部署，启用brotli压缩算法优化传输大小，并使用CloudFlare
                    CDN加快访问速度（国内可能是减速）。
                </li>
                <li>
                    进行Electron和PWA改造，并使用Uni-app制作小程序端应用，实现多端适配。
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "",
    };
</script>
<script setup lang="ts"></script>

<style scoped lang="less">
    .container {
        flex: 605;
        .title {
            z-index: 2;
            position: fixed;
            top: 0;
            // left: 8.3vmax;
            height: 5vmax;
            // width: 59.3vmax;
            width: 100%;
            font-weight: bold;
            font-size: 2vmax;
            line-height: 5vmax;
            user-select: none;
            text-indent: 2vmax;
            backdrop-filter: blur(30px);
            background-color: rgba(255, 255, 255, 0.8);
        }
        .main {
            padding: 5vmax 0;
            font-size: 1.2vmax;
            color: var(--text-main);
            text-indent: 2vmax;
            ul {
                list-style-type: "\1F44D";
            }
        }
    }
</style>
