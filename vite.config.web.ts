import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
import path from "path";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

dns.setDefaultResultOrder("verbatim");

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/webchat-plugin" : "";

export default defineConfig({
    // { fastRefresh: false }
    plugins: [
        cssInjectedByJsPlugin(),
        ViteEjsPlugin((viteConfig) => ({
            // viteConfig is the current Vite resolved config
            basePath: basePath,
        })),
        react({
            jsxRuntime: "classic",
        }),
    ],
    mode: isProduction ? "production" : "development",
    publicDir: "public",
    base: basePath,
    build: {
        // minify: "terser",
        // manifest: false,
        target: "es2015",
        ssr: false,
        emptyOutDir: true,
        copyPublicDir: true,
        rollupOptions: {
            input: {
                "spinoco-webchat-plugin": path.resolve(__dirname, "src/spinoco-webchat-plugin.tsx"),
                index: path.resolve(__dirname, "index.html"),
                basic: path.resolve(__dirname, "examples/basic.html"),
                mockbot: path.resolve(__dirname, "examples/mockbot.html"),
                lottie: path.resolve(__dirname, "examples/lottie.html"),
                slevomat: path.resolve(__dirname, "examples/slevomat.html"),
                zasilkovna: path.resolve(__dirname, "examples/border-only.html"),
                zasilkovna_minified: path.resolve(__dirname, "examples/border-only-minified.html"),
            },
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },
    server: {
        https: false,
        cors: false,
        hmr: true,
        port: 4444,
        host: "0.0.0.0",
    },
    preview: {
        cors: false,
        port: 4444,
        host: "0.0.0.0",
    },
});
