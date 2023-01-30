import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
    plugins: [react()],
    mode: "production",
    publicDir: "public",
    build: {
        target: "es2015",
        ssr: false,
        emptyOutDir: true,
        copyPublicDir: true,
    },
    server: {
        // https: false,
        // cors: false,
        // hmr: false,
        // proxy: {
        //     "/webchat-api": {
        //         // https://directline.botframework.com/v3/directline/conversations
        //         target: "https://directline.botframework.com/v3/directline",
        //         changeOrigin: true,
        //         // rewrite: (path) => path.replace(/^\/api/, ""),
        //     },
        // },
        port: 4444,
        host: "0.0.0.0",
    },
    preview: {
        // cors: false,
        port: 4444,
        host: "0.0.0.0",
    },
});
