import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
import path from "path";

dns.setDefaultResultOrder("verbatim");

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
    // { fastRefresh: false }
    plugins: [react()],
    mode: isProduction ? "production" : "development",
    publicDir: "public",
    base: isProduction ? "https://spinoco.github.io/webchat-plugin" : undefined,
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
                slevomat: path.resolve(__dirname, "examples/slevomat.html"),
                zasilkovna: path.resolve(__dirname, "examples/zasilkovna.html"),
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
