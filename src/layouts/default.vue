<script lang="ts" setup>
import AppSidebar from "@/components/core/app/AppSidebar.vue";
import IconAnalytics from "~/components/icons/IconAnalytics.vue";
import IconModel from "~/components/icons/IconModel.vue";
</script>

<template>
    <div class="relative min-h-screen w-full bg-cl-main">
        <div class="grid grid-cols-[repeat(15,minmax(0,1fr))]">
            <div class="col-span-2 relative">
                <AppSidebar class="sticky top-0 left-0 h-screen" />
            </div>
            <div style="grid-column: span 13 / span 13">
                <div class="py-2.5 pr-2.5">
                    <div class="min-h-screen rounded-xl bg-white">
                        <div class="flex items-center shadow-lg px-6 py-2.5">
                            <NuxtLink
                                to="/"
                                class="group flex items-center gap-x-2.5 hover:bg-cl-main rounded-xl px-6 py-3.75"
                            >
                                <div
                                    class="w-8.5 text-cl-main group-hover:text-white transition-colors duration-150"
                                >
                                    <IconAnalytics />
                                </div>
                                <span
                                    class="text-size_20/16 font-bold group-hover:text-white transition-colors duration-150"
                                    >ANALYTICS</span
                                >
                            </NuxtLink>
                            <NuxtLink
                                to="/"
                                class="group flex items-center gap-x-2.5 hover:bg-cl-main rounded-xl px-6 py-3.75"
                            >
                                <div
                                    class="w-8.5 text-cl-main group-hover:text-white transition-colors duration-150"
                                >
                                    <IconModel />
                                </div>
                                <span
                                    class="text-size_20/16 font-bold group-hover:text-white transition-colors duration-150"
                                    >MODEL</span
                                >
                            </NuxtLink>

                            <div class="ml-auto pr-2.5">
                                <div class="flex items-center gap-x-6">
                                    <span class="text-size_18/16">Username</span>
                                    <div class="px-6 py-4 border text-size_18/16 font-bold">U</div>
                                    <div class="px-6 py-4 border text-size_18/16 font-bold">
                                        Game
                                    </div>
                                </div>
                            </div>
                        </div>
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
