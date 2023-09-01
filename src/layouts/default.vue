<script lang="ts" setup>
import { storeToRefs } from "pinia";
import AppSidebar from "@/components/core/app/AppSidebar.vue";
import AppHeader from "@/components/core/app/AppHeader.vue";
import { useAuthStore } from "@/store/auth";
import { useGameStore } from "@/store/game";
import { ApiGame } from "~/types/api/game";

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

const { $config } = useNuxtApp();

const gameStore = useGameStore();
const { gameId } = storeToRefs(gameStore);
const { setGame, setGameId } = gameStore;

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const gameList = ref<ApiGame[]>([]);

const currentGame = ref("");

watch(currentGame, (currentId) => {
    const index = gameList.value.reduce((acc, curValue, curIndex) => {
        if (curValue.id === currentId) {
            return curIndex;
        }
        return acc;
    }, -1);

    if (index < 0) {
        return;
    }

    setGame({
        game_name: gameList.value[index].game_name,
        project_id: gameList.value[index].project_id,
        analytics_ready: gameList.value[index].analytics_ready,
        model_ready: gameList.value[index].model_ready,
    });

    setGameId(gameList.value[index].id);

    reloadNuxtApp({
        force: true,
    });
});

async function fetchRequests() {
    if (gameId.value) {
        currentGame.value = gameId.value;
    }
    const response = await $fetch<ApiGame[]>(`${$config.public.BACKEND_URL}/game-list`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${accessToken.value}`,
        },
    });

    gameList.value = response;
}

await fetchRequests();
</script>

<template>
    <div class="relative min-h-screen w-full">
        <div class="grid grid-cols-[repeat(18,minmax(0,1fr))]">
            <div class="col-span-2 relative bg-cl-main">
                <AppSidebar class="sticky top-0 left-0 h-screen" :list="navbarList" />
            </div>
            <div style="grid-column: span 16 / span 16">
                <div class="relative min-h-screen">
                    <AppHeader
                        v-model:model-value="currentGame"
                        class="sticky top-0 z-[9999]"
                        :game-list="gameList"
                    />
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
