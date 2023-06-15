<template>
    <div
        id="shareCard"
        class="animate__animated animate__faster animate__backInUp"
    >
        <div
            id="copyLink"
            @click.stop="copyLink"
        >
            复制链接
        </div>
        <img
            id="qrcode"
            :src="dataUrl"
            width="100"
        />
    </div>
</template>

<script lang="ts">
    export default {
        name: "",
    };
</script>
<script setup lang="ts">
    import clipboardy from "clipboardy";
    import qrcode from "qrcode";
    import { computed, inject, ref } from "vue";
    const props = defineProps<{
        tweetID: string;
    }>();
    const url = "https://teitter-v2.cuijunyu.win:8443/#/tweet/";
    const sendMsg = inject("sendMsg") as Function;

    const copyLink = () => {
        clipboardy
            .write(url + props.tweetID)
            .then(() => {
                sendMsg("复制成功");
                console.log("成功复制");
            })
            .catch(() => {
                sendMsg("复制失败", true);
                console.log("复制失败");
            });
    };
    const dataUrl = ref("");
    var opts = {
        color: {
            dark: "#1da1f2",
            light: "#f7f9f9",
        },
    };
    const convertQrcode = async () => {
        dataUrl.value = await qrcode.toDataURL(url + props.tweetID, opts);
    };
    convertQrcode();
</script>

<style scoped lang="less">
    #shareCard {
        min-width: 8vmax;
        height: 10vmax;
        background-color: #ffffff;
        border-radius: 20px;
        position: absolute;
        top: -12vmax;
        left: -4vmax;
        * {
            user-select: none;
        }
    }
    #copyLink {
        padding: 1vmax;
        border-radius: 20px;
        user-select: none;
        &:hover {
            background-color: #f7f7f7;
        }
    }
</style>
