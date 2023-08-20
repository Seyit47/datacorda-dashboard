<script lang="ts" setup>
import AppSidebar from "@/components/core/app/AppSidebar.vue";
import AppHeader from "@/components/core/app/AppHeader.vue";

const navbarList = computed(() => {
    return [
        {
            label: "Overview",
            icon: defineAsyncComponent(() => import("@/components/icons/IconDaily.vue")),
            name: "analytics",
        },
        {
            label: "Churn",
            icon: defineAsyncComponent(() => import("@/components/icons/IconFunnel.vue")),
            name: "analytics-dashboard",
        },
        {
            label: "Engagement",
            icon: defineAsyncComponent(() => import("@/components/icons/IconClarityEvent.vue")),
            name: "analytics-engagement",
        },
        {
            label: "Monetization",
            icon: defineAsyncComponent(() => import("@/components/icons/IconMonetization.vue")),
            name: "analytics-monetization",
        },
    ];
});
</script>

<template>
    <div class="relative min-h-screen w-full">
        <div class="grid grid-cols-[repeat(15,minmax(0,1fr))]">
            <div class="col-span-2 relative bg-cl-main">
                <AppSidebar class="sticky top-0 left-0 h-screen" :list="navbarList" />
            </div>
            <div style="grid-column: span 13 / span 13">
                <div class="relative min-h-screen">
                    <AppHeader class="sticky top-0 z-[9999]" />
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
