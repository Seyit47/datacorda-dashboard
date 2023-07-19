<script lang="ts" setup>
import { storeToRefs } from "pinia";
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import DailyOverview from "@/components/pages/Daily/DailyOverview.vue";
import ChartCountry from "@/components/pages/Daily/ChartCountry.vue";
import DailyChart from "@/components/pages/Daily/DailyChart.vue";
import DailyIncome from "@/components/pages/Daily/DailyIncome.vue";
import DoughnutChart from "@/components/pages/Daily/DoughnutChart.vue";
import EmptyChart from "@/components/pages/Daily/EmptyChart.vue";
import AverageSession from "@/components/pages/Daily/AverageSession.vue";
import { useAuthStore } from "@/store/auth";

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const activeUsers = ref<any[]>([]);
const newUsers = ref<any[]>([]);
const sessionNumber = ref<any[]>([]);
const overViewData = ref<any>(null);

async function fetchRequests() {
    const response = await Promise.all([
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/daily-active-user-number/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/daily-new-user-number/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/daily-session-number/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/overview/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
    ]);
    activeUsers.value = response[0] as any[];
    newUsers.value = response[1] as any[];
    sessionNumber.value = response[2] as any[];
    overViewData.value = response[3];
}

await fetchRequests();
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Overview</h2>
                    <div class="flex items-center gap-x-7.5 ml-auto">
                        <div class="w-36">
                            <BaseSelect placeholder="Platform" />
                        </div>
                        <div class="w-36">
                            <BaseSelect placeholder="Date" />
                        </div>
                        <div class="w-36">
                            <BaseSelect placeholder="Range" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-x-3">
                    <div class="col-span-5 flex flex-col gap-y-2.5">
                        <DailyOverview :overview-data="overViewData" />

                        <div class="flex items-center gap-x-2.5">
                            <div class="w-1/2 border rounded-[20px] shadow-lg">
                                <AverageSession />
                            </div>
                            <div class="w-1/2 shrink-0 border rounded-[20px] shadow-lg">
                                <EmptyChart />
                            </div>
                        </div>

                        <div class="rounded-[20px] shadow-xl bg-white border p-6">
                            <ChartCountry :session-number="sessionNumber" />
                        </div>
                    </div>
                    <div class="col-span-9 flex flex-col gap-y-2.5">
                        <div class="flex items-center gap-x-2.5">
                            <div class="w-1/2 border rounded-[20px] shadow-lg">
                                <DoughnutChart />
                            </div>
                            <div class="w-1/2 shrink-0 border rounded-[20px] shadow-lg">
                                <DailyIncome />
                            </div>
                        </div>
                        <div class="w-full h-full rounded-[20px] shadow-xl bg-white border p-14">
                            <DailyChart
                                :active-users="activeUsers"
                                :new-users="newUsers"
                                class="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
