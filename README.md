# teitter-忒特 
基于 Vue3 的社交网站, 前端由我个人从0到1完成,  后端由我工作室的小伙伴使用Java完成, 网站功能完善, 实现了用户注册登录, 发送推文, 评论, 点赞, 搜索, 查看个人资料, 修改个人资料等功能.

项目网址: https://teitter.cuijunyu.win:8443/

技术栈:  Vue3+TypeScript+Pinia+Axios+Animate.css

- 使用 Vue-Router 实现单页应用, 使用 KeepAlive 配合路由的 meta 字段实现缓存指定组件
- 二次封装 Axios, 实现请求自动携带 Token 以及Token 失效跳转登录页
- 首页实现无限滚动无缝加载, 既减少了每次请求的数据量又不影响用户体验
- app 挂载时与窗口尺寸变化时判断设备尺寸, 对竖屏和横屏设备进行 UI 适配 
- 采用组件化思维, 复用多次使用的组件, 使用组件绑定 v-model 来实现父子组件数据的双向绑定
- 拦截剪切板黏贴事件实现图片/视频的上传, 图片上传使用 Canvas 导出 Webp 格式的图片压缩方案, 极大节省服务器空间并提高资源加载速度 (1Mb=>100k)
- 使用 dayjs 进行时间戳日期转换, qrcode 生成分享二维码 
- 使用 animate.css 实现动画效果, vue3-lazyload 实现图片的懒加载
- 使用 CloudFlare CDN 加快访问速度