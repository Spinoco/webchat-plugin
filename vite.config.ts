import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
import path from "path";
import { ViteEjsPlugin } from "vite-plugin-ejs";

dns.setDefaultResultOrder("verbatim");

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/webchat-plugin" : "";

export default defineConfig({
    // { fastRefresh: false }
    plugins: [
        ViteEjsPlugin((viteConfig) => ({
            // viteConfig is the current Vite resolved config
            basePath: basePath,
        })),
        react(),
    ],
    mode: isProduction ? "production" : "development",
    publicDir: "public",
    base: basePath,
    build: {
        minify: "terser",
        manifest: false,
        target: "es2015",
        ssr: false,
        emptyOutDir: true,
        copyPublicDir: true,
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, "index.html"),
                basic: path.resolve(__dirname, "examples/basic.html"),
                lottie: path.resolve(__dirname, "examples/lottie.html"),
                slevomat: path.resolve(__dirname, "examples/slevomat.html"),
                zasilkovna: path.resolve(__dirname, "examples/zasilkovna.html"),
                zasilkovna_minified: path.resolve(__dirname, "examples/zasilkovna-minified.html"),
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
