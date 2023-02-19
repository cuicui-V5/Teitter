基于 Vue3 的社交⽹站, 前端由我个⼈从0到1完成, 后端由我⼯作室的⼩伙伴使⽤Java完
成, ⽹站功能完善, 实现了⽤⼾注册登录, 发送推⽂, 评论, 点赞, 搜索, 查看个⼈资料, 修改
个⼈资料等功能.


项⽬⽹址: https://teitter.cuijunyu.win:8443/
- 技术栈: Vue3+TypeScript+Pinia+Axios+Animate.css
- 使⽤ Vue-Router 实现单⻚应⽤, 使⽤ KeepAlive 配合路由的 meta 字段实现缓存指定
组件
- ⼆次封装 Axios, 实现请求⾃动携带 Token 以及Token 失效跳转登录⻚
- ⾸⻚实现⽆限滚动⽆缝加载, 既减少了每次请求的数据量⼜不影响⽤⼾体验
- app 挂载时与窗⼝尺⼨变化时判断设备尺⼨, 对竖屏和横屏设备进⾏ UI 适配
- 采⽤组件化思维, 复⽤多次使⽤的组件, 使⽤组件绑定 v-model 来实现⽗⼦组件数据的
双向绑定
- 拦截剪切板黏贴事件实现图⽚/视频的上传, 图⽚上传使⽤ Canvas 导出 Webp 格式的
- 图⽚压缩⽅案, 极⼤节省服务器空间并提⾼资源加载速度 (1Mb=>100k)
- 使⽤ dayjs 进⾏时间戳⽇期转换, qrcode ⽣成分享⼆维码
- 使⽤ animate.css 实现动画效果, vue3-lazyload 实现图⽚的懒加载
- 使⽤ CloudFlare CDN 加快访问速度