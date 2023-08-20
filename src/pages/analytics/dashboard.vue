<script lang="ts" setup>
import { storeToRefs } from "pinia";
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import BaseDatePicker from "@/components/core/base/BaseDatePicker.vue";
import FunnelChart from "@/components/pages/Dashboard/FunnelChart.vue";
import RetentionLevelFlow from "@/components/pages/Dashboard/RetentionLevelFlow.vue";
import ChurnVsRetention from "@/components/pages/Dashboard/ChurnVsRetention.vue";
import LevelScore from "@/components/pages/Dashboard/LevelScore.vue";
import { useAuthStore } from "@/store/auth";

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
    platform: null,
    start: null,
    end: null,
});

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const funnelData = ref<any>(null);
const levelFlow = ref<any[]>([]);
const churnRetention = ref<any[]>([]);

async function fetchRequests() {
    const response = await Promise.all([
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/ftue-funnel/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/level-flow-d1/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/distribution/567767bf-65e0-4c08-80fe-3e2885f8dce8?feature=screen_view&target=churn1`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
    ]);

    funnelData.value = response[0];
    levelFlow.value = response[1] as any[];
    churnRetention.value = response[2] as any[];
}

await useAsyncData(() => fetchRequests());
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Churn</h2>
                    <div class="flex items-center gap-x-7.5 ml-auto">
                        <div class="w-42">
                            <BaseSelect
                                v-model="filter.platform"
                                :list="platformList"
                                :item-name="(item: any) => item.name"
                                :item-value="(item: any) => item.value"
                                placeholder="Platform"
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
                <div class="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-x-5">
                    <div class="col-span-8">
                        <div class="flex flex-col gap-y-3.75">
                            <FunnelChart :data="funnelData" />

                            <div class="rounded-[20px] p-6 border shadow-lg">
                                <ChurnVsRetention :data="churnRetention" />
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
