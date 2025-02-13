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
    model: null,
    range: null,
});

const featureImportance = ref<any[]>([]);
const predictionAnalytics = ref<any>(null);
const modelPerformance = ref<any>(null);

async function fetchRequests() {
    if (!isModelReady && !filter.model) {
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

    const response = await Promise.allSettled([
        $fetch(
            `${$config.public.BACKEND_URL}/ai/feature-importance/${filter.model}?game_id=${
                gameId.value
            }&${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/prediction/analytics/${filter.model}?game_id=${
                gameId.value
            }&${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/ai/model-performance/${filter.model}?game_id=${
                gameId.value
            }&${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
    ]);

    featureImportance.value =
        response[0].status === "fulfilled" ? (response[0].value as any[]) : [];
    predictionAnalytics.value = response[1].status === "fulfilled" ? response[1].value : null;
    modelPerformance.value = response[2].status === "fulfilled" ? response[2].value : null;
}

async function fetchModelList() {
    if (!isModelReady) {
        return;
    }
    const response = await $fetch(
        `
        ${$config.public.BACKEND_URL}/game/models/${gameId.value}`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }
    );

    modelList.value = response as any[];
    filter.model = (response as any[]).length > 0 ? (response as any[])[0] : null;

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
}

await fetchModelList();
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
                    <div class="col-span-5">
                        <ActualPredicted :data="modelPerformance" />
                    </div>
                    <div class="col-span-7 flex flex-col gap-y-7.5">
                        <div class="flex justify-center items-center">
                            <div
                                class="flex flex-col gap-y-7.5 w-full rounded-[20px] border shadow-md px-6 pt-6 pb-2"
                            >
                                <div class="flex items-center justify-center">
                                    <div class="w-[80%]">
                                        <CircleChart :data="predictionAnalytics" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-5">
                        <ModelCodeBlock :model="filter.model" />
                    </div>
                    <div class="col-span-7">
                        <div class="border rounded-[20px] shadow-md bg-white p-6">
                            <FeatureImportance :feature-importance="featureImportance" />
                        </div>
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
