export default defineNuxtConfig({
    ssr: false,

    srcDir: "src/",

    devServer: {
        host: process.env.HOST || "127.0.0.1",
        port: Number(process.env.PORT) || 8080,
    },

    vite: {
        server: {
            proxy: {
                "/api": {
                    target: process.env.BACKEND_SERVER_ORIGIN || "http://localhost:3009",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
                "/s3-api": {
                    target:
                        process.env.S3_API_URL ||
                        "https://4rz544nea7.execute-api.eu-central-1.amazonaws.com",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/s3-api/, "api"),
                },
            },
        },
    },

    runtimeConfig: {
        public: {
            LANDING_PAGE_URL: process.env.LANDING_PAGE_URL,
            BACKEND_URL: process.env.BACKEND_URL,
            S3_API_URL: process.env.S3_API_URL,
        },
    },

    typescript: {
        shim: false,
        strict: true,
        typeCheck: true,
    },

    pwa: {
        registerType: "autoUpdate",
        srcDir: "",
        filename: "service-worker.ts",
        strategies: "injectManifest",
        manifest: false,
        injectRegister: false,
        injectManifest: {
            injectionPoint: undefined,
        },
        devOptions: {
            enabled: true,
            type: "module",
        },
    },

    experimental: {
        payloadExtraction: false,
    },

    css: ["@/assets/scss/style.scss"],

    modules: [
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
        "@nuxtjs/tailwindcss",
        "@vueuse/nuxt",
        "@vite-pwa/nuxt",
        "nuxt-headlessui",
    ],

    headlessui: {
        prefix: "Headless",
    },

    app: {
        pageTransition: { name: "page", mode: "out-in" },
        layoutTransition: { name: "layout", mode: "out-in" },
    },

    tailwindcss: {
        configPath: "../tailwind.config.js",
    },

    vueuse: {
        ssrHandlers: true,
    },

    build: {
        transpile: ["gsap", "vue-toastification", "vue-datepicker"],
    },
});
