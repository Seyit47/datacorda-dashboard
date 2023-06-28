<script lang="ts" setup>
useHead({
    title: "Nuxt 3 Starter",
    htmlAttrs: {
        lang: "en",
    },
    meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "Millipay website" },
        { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
</script>

<template>
    <NuxtLayout>
        <NuxtLoadingIndicator color="#4287f5" :duration="3000" :throttle="200" :height="5" />
        <NuxtPage />
    </NuxtLayout>
</template>
