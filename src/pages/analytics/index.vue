<script lang="ts" setup>
import { storeToRefs } from "pinia";
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import BaseDatePicker from "@/components/core/base/BaseDatePicker.vue";
import DailyUserInsights from "@/components/pages/Daily/DailyUserInsights.vue";
import DailySessionInsights from "@/components/pages/Daily/DailySessionInsights.vue";
import SessionNumber from "@/components/pages/Daily/SessionNumber.vue";
import DailyChart from "@/components/pages/Daily/DailyChart.vue";
import UserByCountry from "@/components/pages/Daily/UserByCountry.vue";
import { useAuthStore } from "@/store/auth";
import { useGameStore } from "~/store/game";

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);
const gameStore = useGameStore();
const { isAnalyticsReady } = gameStore;
const { gameId } = storeToRefs(gameStore);

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

const activeUsers = ref<any[]>([]);
const newUsers = ref<any[]>([]);
const sessionNumber = ref<any[]>([]);
const userByCountry = ref<any[]>([]);
const userInsights = ref<any>(null);
const sessionInsights = ref<any>(null);

watch(
    filter,
    () => {
        const router = useRouter();
        router.replace({
            name: "analytics",
            query: {
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

async function fetchRequests() {
    if (!isAnalyticsReady) {
        return;
    }

    const route = useRoute();
    const query = new URLSearchParams();

    if (route.query.platform) {
        query.append("platform", `${route.query.platform}`);
        filter.platform = route.query.platform;
    }

    if (route.query.start && route.query.end) {
        query.append("start", `${route.query.start}`);
        query.append("end", `${route.query.end}`);
        filter.range = [route.query.start, route.query.end];
    }

    const response = await Promise.allSettled([
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/daily-active-user-number/${
                gameId.value
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/daily-new-user-number/${
                gameId.value
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/daily-session-number/${
                gameId.value
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/user-insights/${
                gameId.value
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/session-insights/${
                gameId.value
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/user-per-country/${
                gameId.value
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
    ]);

    activeUsers.value = response[0].status === "fulfilled" ? (response[0].value as any[]) : [];
    newUsers.value = response[1].status === "fulfilled" ? (response[1].value as any[]) : [];
    sessionNumber.value = response[2].status === "fulfilled" ? (response[2].value as any[]) : [];
    userInsights.value = response[3].status === "fulfilled" ? response[3].value : null;
    sessionInsights.value = response[4].status === "fulfilled" ? response[4].value : null;
    userByCountry.value = response[5].status === "fulfilled" ? (response[5].value as any[]) : [];
}

await useAsyncData(() => fetchRequests());
</script>

<template>
    <div class="w-full overflow-hidden">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Overview</h2>
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
                <div class="flex flex-col gap-y-2.5">
                    <div class="grid grid-cols-3 gap-x-2.5">
                        <DailyUserInsights :overview-data="userInsights" />
                        <DailySessionInsights :overview-data="sessionInsights" />
                        <div class="w-full h-full border rounded-[20px] shadow-lg p-6">
                            <SessionNumber :session-number="sessionNumber" class="w-full h-full" />
                        </div>
                    </div>
                    <div class="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-x-3">
                        <div class="col-span-10 flex flex-col gap-y-2.5">
                            <div
                                class="w-full h-full rounded-[20px] shadow-xl bg-white border p-14"
                            >
                                <DailyChart
                                    :active-users="activeUsers"
                                    :new-users="newUsers"
                                    class="w-full h-full"
                                />
                            </div>
                        </div>
                        <div class="col-span-5 flex flex-col gap-y-2.5">
                            <div
                                class="w-full h-full rounded-[20px] shadow-xl bg-white border py-10 px-6"
                            >
                                <UserByCountry :country-list="userByCountry" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
