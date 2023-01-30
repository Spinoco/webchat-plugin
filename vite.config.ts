import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

console.log(process.env.NODE_ENV);

export default defineConfig({
    plugins: [react({ fastRefresh: false })],
    mode: "development",
    publicDir: "public",
    build: {
        target: "es2015",
        ssr: false,
        emptyOutDir: true,
        copyPublicDir: true,
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
