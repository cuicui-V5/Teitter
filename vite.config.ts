import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import compressPlugin from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

export function configCompressPlugin(
    compress: "gzip" | "brotli" | "none",
    deleteOriginFile = true,
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
        configCompressPlugin("brotli"),
        VitePWA({
            registerType: "autoUpdate",
            injectRegister: "auto",
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
            workbox: {
                cleanupOutdatedCaches: true,
                skipWaiting: true,
                globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,webm,mp4}"],
                runtimeCaching: [
                    {
                        urlPattern: /(.*?)\.(png|jpe?g|svg|gif|webp|webm|mp4)/, // 图片缓存
                        handler: "CacheFirst",
                        options: {
                            cacheName: "image-cache",
                        },
                    },
                ],
            },
        }),
        visualizer({
            gzipSize: true,
            brotliSize: true,
            emitFile: false,
            filename: "test.html", //分析图生成的文件名
            open: true, //如果存在本地服务端口，将在打包后自动展示
        }),
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
            "/teitter/v2/api": {
                target: "https://www.heron.love:8070",
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
