<script lang="ts" setup>
import { storeToRefs } from "pinia";
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import DecisionTree from "@/components/pages/PlayersJourney/DecisionTree.vue";
import { useAuthStore } from "@/store/auth";
import { useGameStore } from "@/store/game";

definePageMeta({
    layout: "model",
});

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);
const gameStore = useGameStore();
const { isModelReady } = gameStore;
const { gameId } = storeToRefs(gameStore);

const modelList = ref<any[]>([]);
const depthList = ref([
    {
        name: "Depth 3",
        value: "depth3",
    },
    {
        name: "Depth 4",
        value: "depth4",
    },
    {
        name: "Depth 5",
        value: "depth5",
    },
]);

const filter = reactive<any>({
    model: "churn",
    depth: "depth3",
});

watch(
    filter,
    () => {
        const router = useRouter();
        router.replace({
            name: "model-players-journey",
            query: {
                model: filter.model || undefined,
                depth: filter.depth || undefined,
            },
        });
    },
    {
        deep: true,
    }
);

const decisionTree = ref<any>(null);

async function fetchRequests() {
    if (!isModelReady) {
        return;
    }

    const route = useRoute();

    if (route.query.model) {
        filter.model = route.query.model;
    }
    if (route.query.depth) {
        filter.depth = route.query.depth;
    }

    const response = await Promise.all([
        $fetch(
            `
        ${$config.public.BACKEND_URL}/game/models/${gameId.value}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.S3_API_URL}/decTree_${gameId.value}_${route.query.model || "churn"}_${
                route.query.depth || "depth3"
            }.json`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
                responseType: "json",
            }
        ),
    ]);

    modelList.value = response[0] as any[];
    decisionTree.value = response[1];
}

await fetchRequests();
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex flex-col gap-y-7.5">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Player's Journey</h2>
                    <div class="flex items-center gap-x-7.5">
                        <div class="w-42">
                            <BaseSelect
                                v-model="filter.model"
                                :list="modelList"
                                placeholder="Model"
                            />
                        </div>
                        <div class="w-42">
                            <BaseSelect
                                v-model="filter.depth"
                                :list="depthList"
                                :item-name="(item:any) => item.name"
                                :item-value="(item:any) => item.value"
                                :init-item-name="(item:any) => item.name"
                                :init-item-value="(item:any) => item.value"
                                placeholder="Number Node"
                            />
                        </div>
                    </div>
                </div>
                <div class="w-full aspect-video">
                    <DecisionTree :decision-tree="decisionTree" />
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
