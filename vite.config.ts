import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";

// https://vitejs.dev/config/
// Configure the base path dynamically via environment variables.
// Use VITE_BASE (preferred) or BASE; default to '/'.
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const base = env.VITE_BASE || env.BASE || "/";

    return {
        base,
        plugins: [
            vue(),
            Components({
                resolvers: [PrimeVueResolver()],
            }),
        ],
    };
});
