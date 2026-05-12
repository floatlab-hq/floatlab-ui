import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const base = env.VITE_BASE || env.BASE || "/";

    return {
        base,
        plugins: [vue()],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        server: {
            proxy: {
                "/api": {
                    target: env.VITE_API_TARGET ?? "http://localhost:8080",
                    changeOrigin: true,
                },
            },
        },
    };
});
