<script lang="ts" setup>
useHead({
    title: "Datacorda",
    htmlAttrs: {
        lang: "en",
    },
    meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
            hid: "description",
            name: "description",
            content: "Datacorda - Empowering Mobile Games with AI-based Prediction",
        },
        { name: "format-detection", content: "telephone=no" },
    ],
    link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://app.datacorda.com" },
    ],
});
</script>

<template>
    <NuxtLayout>
        <VitePwaManifest />
        <NuxtLoadingIndicator color="#9A49AE" :duration="3000" :throttle="200" :height="5" />
        <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
</template>
