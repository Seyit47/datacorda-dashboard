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

definePageMeta({
    layout: "model",
});

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const modelList = ref<any[]>([]);

const filter = reactive<any>({
    model: null,
    start: null,
    end: null,
});

watch(
    filter,
    () => {
        const router = useRouter();
        router.replace({
            name: "model",
            query: {
                platform: filter.platform || undefined,
                start: filter.start || undefined,
                end: filter.end || undefined,
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
    const route = useRoute();
    const query = new URLSearchParams();

    if (route.query.model) {
        filter.model = route.query.model;
    }

    if (route.query.start) {
        query.append("start", `${route.query.start}`);
        filter.start = route.query.start;
    }

    if (route.query.end) {
        query.append("end", `${route.query.end}`);
        filter.end = route.query.end;
    }

    const response = await Promise.all([
        $fetch(
            `${$config.public.BACKEND_URL}/ai/feature-importance/${
                filter.model
            }?game_id=567767bf-65e0-4c08-80fe-3e2885f8dce8&${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/prediction/analytics/${
                filter.model
            }?game_id=567767bf-65e0-4c08-80fe-3e2885f8dce8&${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/ai/model-performance/${
                filter.model
            }?game_id=567767bf-65e0-4c08-80fe-3e2885f8dce8&${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
    ]);

    featureImportance.value = response[0] as any[];
    predictionAnalytics.value = response[1];
    modelPerformance.value = response[2];
}

async function fetchModelList() {
    const response = await $fetch(
        `
        ${$config.public.BACKEND_URL}/game/models/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }
    );

    modelList.value = response as any[];
    filter.model = modelList.value[0];
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
                            <BaseDatePicker v-model="filter.start" placeholder="Date" />
                        </div>
                        <div class="w-42">
                            <BaseDatePicker v-model="filter.end" placeholder="Range" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-7 flex flex-col gap-y-7.5">
                        <div class="grid grid-cols-12 p-6">
                            <div class="col-span-8">
                                <CircleChart :data="predictionAnalytics" />
                            </div>
                            <div class="col-span-4 flex flex-col items-end justify-center">
                                <h2
                                    class="text-[2.5rem] text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                                >
                                    Accuracy: {{ modelPerformance.accuracy }}%
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-5">
                        <ModelCodeBlock />
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
