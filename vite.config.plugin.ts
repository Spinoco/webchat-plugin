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
    mode: "production",
    publicDir: "public",
    base: basePath,
    build: {
        // minify: "terser",
        // manifest: false,
        target: "es2015",
        ssr: false,
        emptyOutDir: false,
        copyPublicDir: false,
        rollupOptions: {
            input: {
                "spinoco-webchat-plugin": path.resolve(__dirname, "src/spinoco-webchat-plugin.tsx"),
            },
            output: {
                entryFileNames: `dist/[name].js`,
                chunkFileNames: `dist/[name].js`,
                assetFileNames: `dist/[name].[ext]`,
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
