<script lang="ts" setup>
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";

definePageMeta({
    layout: "documentation",
});

const data = ref([
    {
        name: "earn_virtual_currency",
        trigger: "when user earns virtual currency (coins, gems, tokens, etc.)",
    },
    {
        name: "spend_virtual_currency",
        trigger: "when user spends virtual currency (coins, gems, tokens, etc.)",
    },
    {
        name: "session_start",
        trigger: "when user starts session",
    },
    {
        name: "session_end",
        trigger: "when user ends session",
    },
    {
        name: "screen_view",
        trigger: "when new scene is navigated",
    },
    {
        name: "user_engagement",
        trigger: "This event is always triggered automatically ",
    },
    {
        name: "app_remove",
        trigger: "when app is removed",
    },
    {
        name: "first_open",
        trigger: "when app is opened first time or first session first event",
    },
    {
        name: "os_update",
        trigger: "os update",
    },
    {
        name: "ad_reward",
        trigger: "when user gets reward after ad",
    },
    {
        name: "level_start",
        trigger: "when user starts level",
    },
    {
        name: "level_end",
        trigger: "when user ends level",
    },
    {
        name: "game_pause",
        trigger: "when user pauses game",
    },
]);
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="max-w-[76rem] px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Event Design Taxonomy</h2>
                </div>

                <div class="flex items-center">
                    <div class="w-1/2">
                        <div class="flex justify-center items-center">
                            <span
                                class="text-[1.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                                >Event Name</span
                            >
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="flex justify-center items-center">
                            <span
                                class="text-[1.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                                >Trigger</span
                            >
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-y-2.5">
                    <div v-for="(item, index) in data" :key="index" class="relative border p-2">
                        <div class="flex items-center">
                            <div class="w-1/2">
                                <div class="flex justify-center items-center">
                                    <span
                                        class="text-[1.2rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                                        >{{ item.name }}</span
                                    >
                                </div>
                            </div>
                            <div class="w-1/2">
                                <div class="flex justify-center items-center">
                                    <span
                                        class="text-[1.2rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                                        >{{ item.trigger }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
