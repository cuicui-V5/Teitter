import { fileURLToPath, URL } from "node:url";
import sftpUploader from "sftp-uploader";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import compressPlugin from "vite-plugin-compression";

export function configCompressPlugin(
    compress: "gzip" | "brotli" | "none",
    deleteOriginFile = false,
) {
    const compressList = compress.split(",");

    const plugins = [];

    if (compressList.includes("gzip")) {
        plugins.push(
            compressPlugin({
                ext: ".gz",
                deleteOriginFile,
            }),
        );
    }
    if (compressList.includes("brotli")) {
        plugins.push(
            compressPlugin({
                ext: ".br",
                algorithm: "brotliCompress",
                deleteOriginFile,
            }),
        );
    }
    return plugins;
}

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: [
                "favicon.ico",
                "apple-touch-icon.png",
                "masked-icon.svg",
            ],
            manifest: {
                name: "teitter - 与世界分享你的新鲜事",
                short_name: "teitter",
                description: "teitter 大型社交网站",
                theme_color: "#1D9BF0",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-384x384.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
        configCompressPlugin("gzip"),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    base: "/",
    // 配置代理
    server: {
        cors: true,
        proxy: {
            "/teitter/api": {
                target: "https://teitter.soul87.top:8090",
                changeOrigin: true,
                secure: true,
                configure: (proxy, options) => {
                    console.log("CONFIGURE");
                    proxy.on("proxyReq", function (proxyReq, req, res): void {
                        proxyReq.removeHeader("origin");
                    });
                },
            },
        },
    },
});
