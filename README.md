# Teitter/忒特

项目网址: https://teitter.cuijunyu.win

Github 地址: https://github.com/cuicui-V5/Teitter

这是一个基于 Vue3 构建的现代社交网站。前端由我个人独立完成，后端由我工作室的小伙伴使用 Java 完成。

该网站具有完善的功能，包括用户注册登录、个人资料修改、用户互相关注、用户私信、推文的发送、点赞、评论、搜索和消息通知等。

项目的亮点在于采用了现代前端技术构建，拥有精心设计的用户界面、流畅的动画效果以及自动切换深色模式的功能。同时支持推文嵌套评论和基于 Websocket 的实时私信等特性。

技术栈：Vite+Vue3+TypeScript+Pinia+Axios+WebSocket+Animate.css

-   封装了 Axios 拦截器，实现请求携带 Token 并处理 Token 失效的情况。
-   使用 vue-virtual-scroller 虚拟列表优化主页信息流加载，确保即使加载大量数据也没有卡顿。
-   针对不同屏幕比例进行 UI 适配，并通过媒体查询与 CSS 变量来实现深色模式的自动切换。
-   图片上传采用 Canvas 导出 Webp 格式的图片压缩方案，在保持画质不变的情况下大幅提高传输速度（1Mb=>100k）。
-   使用 lottie-web 动画库实现清晰，流畅的动画效果，使用 dayjs 进行时间戳转换，qrcode 生成分享二维码，animate.css 实现动画效果，vue3-lazyload 实现图片的懒加载，marked 配合 dompurify 实现 markdown 渲染并防止 XSS 攻击。
-   基于 WebSocket 封装了通信模块，实现私信系统的实时通信。
-   使用 Vercel 进行自动化部署，启用 brotli 压缩算法优化传输大小，并使用 CloudFlare CDN 加快访问速度（国内可能是减速）。
-   进行 Electron 和 PWA 改造，并使用 Uni-app 制作小程序端应用，实现多端适配。

## 项目遇到的问题:

-   首页滚动卡顿: 经过排查是因为 触底加载新数据的滚动事件回调中读取了 offsetHeight 和 scrollTop, 引起重排导致滚动性能很差. 解决办法: 滚动事件使用节流函数, 缓存 offsetHeight 等不变的数据.
-   打包体积很大, index.js 达到了 1.5M: 经过使用 rollup-plugin-visualizer 插件查看文件大小占用. 发现是因为 lottie 动画的资源文件较大和使用了不支持 tree-shaking 的库 lodash 造成的. 解决办法: 资源文件从 CDN 加载, 使用支持 tree-shaking 的 lodash-es 库, 把压缩方式从 gzip 改为 brotli 等方法, 成功的把 index.js 的文件大小从 1.5M 优化到了 150KB. 优化程度达到了 90%之多。
