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
            },
        },
    },

    runtimeConfig: {
        public: {
            LANDING_PAGE_URL: process.env.LANDING_PAGE_URL,
        },
    },

    typescript: {
        shim: false,
        strict: true,
        typeCheck: true,
    },

    css: ["@/assets/scss/style.scss"],

    modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-headlessui"],

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
        transpile: ["gsap", "vue-toastification"],
    },
});
