<script lang="ts" setup>
import { storeToRefs } from "pinia";
import AppSidebar from "@/components/core/app/AppSidebar.vue";
import AppHeader from "@/components/core/app/AppHeader.vue";
import { useAuthStore } from "@/store/auth";
import { useGameStore } from "@/store/game";
import { ApiGame } from "~/types/api/game";

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

    const router = useRouter();
    const route = useRoute();

    router.push({
        name: String(route.name),
        query: {
            game: String(gameList.value[index].id),
        },
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

const navbarList = computed(() => {
    return [
        {
            label: "Introduction",
            icon: defineAsyncComponent(() => import("@/components/icons/IconIntroduction.vue")),
            name: "documentation",
            children: [
                {
                    label: "What is Datacorda?",
                    hash: "#what-is-datacorda",
                },
                {
                    label: "Why Datacorda?",
                    hash: "#why-datacorda",
                },
                {
                    label: "How Datacorda works?",
                    hash: "#how-datacorda-works",
                },
            ],
        },
        {
            label: "Event Design Taxonomy",
            icon: defineAsyncComponent(() => import("@/components/icons/IconDesignTaxonomy.vue")),
            name: "documentation-event-design-taxonomy",
        },
        {
            label: "Integration",
            icon: defineAsyncComponent(() => import("@/components/icons/IconIntegration.vue")),
            name: "documentation-integration",
            children: [
                {
                    label: "Data collection",
                    hash: "#data-collection",
                },
                {
                    label: "Access for Datacorda",
                    hash: "#access-datacorda",
                },
            ],
        },
    ];
});
</script>

<template>
    <div class="relative min-h-screen w-full">
        <div class="grid grid-cols-[repeat(18,minmax(0,1fr))]">
            <div class="col-span-2 relative bg-cl-main">
                <AppSidebar :list="navbarList" class="sticky top-0 left-0 h-screen" />
            </div>
            <div style="grid-column: span 16 / span 16">
                <div class="relative min-h-screen">
                    <AppHeader
                        v-model="currentGame"
                        :game-list="gameList"
                        tab="documentation"
                        class="sticky top-0 z-[9999]"
                    />
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
