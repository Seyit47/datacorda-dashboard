<script lang="ts" setup>
import AppSidebar from "@/components/core/app/AppSidebar.vue";
import AppHeader from "@/components/core/app/AppHeader.vue";

const navbarList = computed(() => {
    return [
        {
            label: "Model",
            icon: defineAsyncComponent(() => import("@/components/icons/IconModelResults.vue")),
            name: "model",
        },
        {
            label: "Segmentation",
            icon: defineAsyncComponent(() => import("@/components/icons/IconDecisionTree.vue")),
            name: "model-segmentation",
        },
        {
            label: "Player's Journey",
            icon: defineAsyncComponent(() => import("@/components/icons/IconPlayerJourney.vue")),
            name: "model-players-journey",
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
                    <AppHeader tab="model" class="sticky top-0 z-[9999]" />
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
