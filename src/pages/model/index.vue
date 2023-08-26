<script lang="ts" setup>
import { storeToRefs } from "pinia";
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import BaseDatePicker from "@/components/core/base/BaseDatePicker.vue";
import CircleChart from "@/components/pages/Model/CircleChart.vue";
import ActualPredicted from "@/components/pages/Model/ActualPredicted.vue";
import FeatureImportance from "@/components/pages/Model/FeatureImportance.vue";
import ModelCodeBlock from "@/components/pages/Model/CodeBlock.vue";
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

const filter = reactive<any>({
    model: "churn",
    range: null,
});

watch(
    filter,
    () => {
        const router = useRouter();
        router.replace({
            name: "model",
            query: {
                model: filter.model || undefined,
                start: filter.range ? filter.range[0] : undefined,
                end: filter.range ? filter.range[1] : undefined,
            },
        });
    },
    {
        deep: true,
    }
);

const featureImportance = ref<any[]>([]);
const predictionAnalytics = ref<any>(null);
const modelPerformance = ref<any>(null);

async function fetchRequests() {
    if (!isModelReady) {
        return;
    }
    const route = useRoute();
    const query = new URLSearchParams();

    if (route.query.model) {
        filter.model = route.query.model;
    }

    if (route.query.start && route.query.end) {
        query.append("start", `${route.query.start}`);
        query.append("end", `${route.query.end}`);
        filter.range = [route.query.start, route.query.end];
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
            `${$config.public.BACKEND_URL}/ai/feature-importance/${
                route.query.model || "churn"
            }?game_id=${gameId.value}&${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/prediction/analytics/${
                route.query.model || "churn"
            }?game_id=${gameId.value}&${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/ai/model-performance/${
                route.query.model || "churn"
            }?game_id=${gameId.value}&${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
    ]);

    modelList.value = response[0] as any[];
    featureImportance.value = response[1] as any[];
    predictionAnalytics.value = response[2];
    modelPerformance.value = response[3];
}

await fetchRequests();
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Model</h2>
                    <div class="flex items-center gap-x-7.5 ml-auto">
                        <div class="w-42">
                            <BaseSelect
                                v-model="filter.model"
                                :list="modelList"
                                placeholder="Model"
                            />
                        </div>
                        <div class="w-42">
                            <BaseDatePicker
                                v-model="filter.range"
                                :item-name="(item:string[]) => `${item[0]}/${item[1]}`"
                                placeholder="Date Range"
                                range
                            />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-7 flex flex-col gap-y-7.5">
                        <div class="grid grid-cols-12 p-6">
                            <div
                                :class="{
                                    'col-span-8': isModelReady,
                                    'col-span-12': !isModelReady,
                                }"
                            >
                                <CircleChart :data="predictionAnalytics" />
                            </div>
                            <div
                                v-if="isModelReady"
                                class="col-span-4 flex flex-col items-end justify-center"
                            >
                                <h2
                                    class="text-[2.5rem] text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                                >
                                    Accuracy: {{ modelPerformance.accuracy }}%
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-5">
                        <ModelCodeBlock :model="filter.model" />
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-7">
                        <div class="border rounded-[20px] shadow-md bg-white p-6">
                            <FeatureImportance :feature-importance="featureImportance" />
                        </div>
                    </div>
                    <div class="col-span-5">
                        <ActualPredicted :data="modelPerformance" />
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
