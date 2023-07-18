<script lang="ts" setup>
import AppSidebar from "@/components/core/app/AppSidebar.vue";
import AppHeader from "@/components/core/app/AppHeader.vue";

const navbarList = computed(() => {
    return [
        {
            label: "Daily",
            icon: defineAsyncComponent(() => import("@/components/icons/IconDaily.vue")),
            name: "analytics",
        },
        {
            label: "Dashboard",
            icon: defineAsyncComponent(() => import("@/components/icons/IconDashboard.vue")),
            name: "analytics-dashboard",
        },
        {
            label: "Funnels",
            icon: defineAsyncComponent(() => import("@/components/icons/IconFunnel.vue")),
            name: "",
        },
        {
            label: "Level-flow",
            icon: defineAsyncComponent(() => import("@/components/icons/IconLevelFlow.vue")),
            name: "",
        },
    ];
});
</script>

<template>
    <div class="relative min-h-screen w-full bg-cl-main">
        <div class="grid grid-cols-[repeat(15,minmax(0,1fr))]">
            <div class="col-span-2 relative">
                <AppSidebar class="sticky top-0 left-0 h-screen" :list="navbarList" />
            </div>
            <div style="grid-column: span 13 / span 13">
                <div class="relative min-h-screen bg-cl-purple-shade">
                    <AppHeader class="sticky top-0 z-[9999]" />
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
