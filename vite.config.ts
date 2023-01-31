import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
import path from "path";

dns.setDefaultResultOrder("verbatim");

console.log(`We are in ${process.env.NODE_ENV}`);

export default defineConfig({
    // { fastRefresh: false }
    plugins: [react()],
    mode: "production",
    publicDir: "public",
    build: {
        minify: "terser",
        manifest: false,
        target: "es2015",
        ssr: false,
        emptyOutDir: true,
        copyPublicDir: true,
        rollupOptions: {
            input: {
                basic: path.resolve(__dirname, "examples/basic.html"),
                slevomat: path.resolve(__dirname, "examples/slevomat.html"),
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
