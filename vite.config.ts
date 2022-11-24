import { fileURLToPath, URL } from "node:url";
import sftpUploader from "sftp-uploader";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    base: "/teitter/",
    // 配置代理
    server: {
        cors: true,
        proxy: {
            "/teitter/api": {
                target: "https://www.heron.love:8090/teitter/api",
                changeOrigin: true,
            },
        },
    },
});
