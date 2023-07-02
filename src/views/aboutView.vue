<template>
    <div class="container">
        <div class="title">关于忒特</div>
        <div class="main">
            <p>
                欢迎来到忒特！我们为您带来了全新的社交体验，让你与世界分享瞬间、连接朋友和发现新的兴趣爱好。在这个精心设计的界面中，我们注重简洁、直观和个性化的展示。
            </p>

            <p>
                首先，忒特的主页以清晰的布局呈现，让你一目了然地浏览最新动态和与你相关的内容。顶部的导航栏提供了方便的搜索功能，让你轻松找到感兴趣的话题、用户或标签。
            </p>

            <p>
                在个人资料页面，你可以展示自己的头像、背景图片和个人简介，让其他用户更好地了解你的兴趣和个性。你还可以编辑个人设置，选择喜欢的主题颜色和字体样式，使界面更符合你的审美偏好。
            </p>

            <p>
                忒特注重用户互动，因此我们的评论系统非常简单易用。你可以对他人的动态进行点赞、转发和评论，并与其他用户展开有意义的讨论。同时，你也可以通过私信功能与好友们保持联系，分享私密的消息和照片。
            </p>

            <p>
                为了增加探索的乐趣，忒特还推出了个性化推荐功能。根据你的兴趣和关注列表，我们会向你推荐相关的用户、话题和内容，让你不断发现新的精彩。你还可以使用标签功能来组织自己的动态，并方便其他用户找到与你相似的内容。
            </p>

            <p>
                最后，忒特致力于保护用户信息和隐私安全。我们采取了严格的数据加密措施，并提供了可信赖的账号验证机制，确保你在忒特上的使用体验始终安全可靠。
            </p>

            <p>
                无论是分享生活中的美好瞬间，还是与朋友们交流想法和见解，忒特都将成为你展示个性、连接世界的理想场所。快来加入我们吧，开启一段全新的社交之旅！
            </p>
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
        }
    }
</style>
