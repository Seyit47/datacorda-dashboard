<script lang="ts" setup>
import { storeToRefs } from "pinia";
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import BaseDatePicker from "@/components/core/base/BaseDatePicker.vue";
import FunnelChart from "@/components/pages/Dashboard/FunnelChart.vue";
import RetentionLevelFlow from "@/components/pages/Dashboard/RetentionLevelFlow.vue";
import ChurnVsRetention from "@/components/pages/Dashboard/ChurnVsRetention.vue";
import ChurnVsRetentionCategoric from "@/components/pages/Dashboard/ChurnVsRetentionCategoric.vue";
import LevelScore from "@/components/pages/Dashboard/LevelScore.vue";
import { useAuthStore } from "@/store/auth";
import { useGameStore } from "@/store/game";

const platformList = ref([
    {
        name: "All",
        value: "ALL",
    },
    {
        name: "Android",
        value: "ANDROID",
    },
    {
        name: "IOS",
        value: "IOS",
    },
]);

const filter = reactive<any>({
    platform: "ALL",
    range: null,
});

const churnRetentionFilter = reactive<any>({
    feature: "screen_view",
    featureType: "numeric",
    segmentation: "churn1",
});

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);
const gameStore = useGameStore();
const { isAnalyticsReady } = gameStore;
const { gameId } = storeToRefs(gameStore);

const funnelData = ref<any>(null);
const levelFlow = ref<any[]>([]);
const churnRetention = ref<any[]>([]);
const featureList = ref<any[]>([]);

async function fetchRequests() {
    if (!isAnalyticsReady) {
        return;
    }
    const route = useRoute();
    const query = new URLSearchParams();

    if (route.query.feature) {
        query.append("feature", `${route.query.feature}`);
        churnRetentionFilter.feature = route.query.feature;
    } else {
        query.append("feature", `${churnRetentionFilter.feature}`);
    }

    if (route.query.featureType) {
        churnRetentionFilter.featureType = route.query.featureType;
    }

    if (route.query.target) {
        query.append("target", `${route.query.target}`);
        churnRetentionFilter.segmentation = route.query.target;
    } else {
        query.append("target", `${churnRetentionFilter.segmentation}`);
    }

    if (route.query.platform) {
        query.append("start", `${route.query.platform}`);
        filter.platform = route.query.platform;
    }

    if (route.query.start && route.query.end) {
        query.append("start", `${route.query.start}`);
        query.append("end", `${route.query.end}`);
        filter.range = [route.query.start, route.query.end];
    }

    const response = await Promise.all([
        $fetch(`${$config.public.BACKEND_URL}/dashboard/ftue-funnel/${gameId.value}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }),
        $fetch(`${$config.public.BACKEND_URL}/dashboard/level-flow-d1/${gameId.value}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/distribution/${
                gameId.value
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(`${$config.public.BACKEND_URL}/dashboard/distribution-features/${gameId.value}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }),
    ]);

    funnelData.value = response[0];
    levelFlow.value = response[1] as any[];
    churnRetention.value = response[2] as any[];
    const categoricFeatures = (response[3] as any)["categoric_features"].map((item: string) => {
        return {
            name: item,
            type: "categoric",
        };
    });
    const numericFeatures = (response[3] as any)["numeric_features"].map((item: string) => {
        return {
            name: item,
            type: "numeric",
        };
    });
    featureList.value = [...categoricFeatures, ...numericFeatures];
}

watch(
    churnRetentionFilter,
    () => {
        const router = useRouter();

        router.replace({
            name: "analytics-dashboard",
            query: {
                feature: churnRetentionFilter.feature || undefined,
                featureType: churnRetentionFilter.featureType || undefined,
                target: churnRetentionFilter.target || undefined,
                platform: filter.platform || undefined,
                start: filter.range ? filter.range[0] : undefined,
                end: filter.range ? filter.range[1] : undefined,
            },
        });
    },
    {
        deep: true,
    }
);

watch(
    filter,
    () => {
        const router = useRouter();

        router.replace({
            name: "analytics-dashboard",
            query: {
                feature: churnRetentionFilter.feature || undefined,
                featureType: churnRetentionFilter.featureType || undefined,
                target: churnRetentionFilter.target || undefined,
                platform: filter.platform || undefined,
                start: filter.range ? filter.range[0] : undefined,
                end: filter.range ? filter.range[1] : undefined,
            },
        });
    },
    {
        deep: true,
    }
);

function updateFeature(item: any) {
    churnRetentionFilter.feature = item.name;
    churnRetentionFilter.featureType = item.type;
}

await fetchRequests();
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Churners vs Retainers</h2>
                    <div class="flex items-center gap-x-7.5 ml-auto">
                        <div class="w-42">
                            <BaseSelect
                                v-model="filter.platform"
                                :list="platformList"
                                :item-name="(item: any) => item.name"
                                :item-value="(item: any) => item.value"
                                :init-item-name="(item: any) => item.name"
                                :init-item-value="(item: any) => item.value"
                                placeholder="Platform"
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
                <div class="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-x-5">
                    <div class="col-span-8">
                        <div class="flex flex-col gap-y-3.75">
                            <FunnelChart :data="funnelData" />

                            <div
                                class="flex flex-col gap-y-7.5 p-6 rounded-[20px] border shadow-lg"
                            >
                                <div class="flex items-center">
                                    <h2
                                        class="text-[1.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                                    >
                                        Churn vs Retention
                                    </h2>

                                    <div class="flex items-center gap-x-5 ml-auto">
                                        <div class="w-50">
                                            <BaseSelect
                                                v-model="churnRetentionFilter.target"
                                                :list="['D1']"
                                                placeholder="Segmentation"
                                                size="lg"
                                            />
                                        </div>
                                        <div class="w-50">
                                            <BaseSelect
                                                v-model="churnRetentionFilter.feature"
                                                :list="featureList"
                                                :item-name="(item: any) => item.name"
                                                :init-item-name="(item:any) => item.name"
                                                :init-item-value="(item: any) => item.name"
                                                placeholder="Select Feature"
                                                size="lg"
                                                @update:model-value="updateFeature"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <ChurnVsRetention
                                    v-if="churnRetentionFilter.featureType === 'numeric'"
                                    :data="churnRetention"
                                />

                                <ChurnVsRetentionCategoric v-else :data="churnRetention" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-7" style="grid-template-columns: span 8 / span 8">
                        <div class="flex flex-col gap-y-3.75 h-full">
                            <div class="p-6 rounded-[20px] border shadow-lg h-full">
                                <RetentionLevelFlow :level-flow="levelFlow" />
                            </div>
                            <LevelScore />
                        </div>
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
