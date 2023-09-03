<script lang="ts" setup>
import { storeToRefs } from "pinia";
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import BaseDatePicker from "@/components/core/base/BaseDatePicker.vue";
import DailyAd from "@/components/pages/Engagement/DailyAd.vue";
import EventCount from "@/components/pages/Engagement/EventCount.vue";
import RetentionTable from "@/components/pages/Engagement/RetentionTable.vue";
import DailyRetention from "@/components/pages/Engagement/DailyRetention.vue";
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

const dailyAdView = ref<any[]>([]);
const eventCount = ref<any[]>([]);
const retentionTable = ref<any[]>([]);
const dailyRetention = ref<any[]>([]);

watch(
    filter,
    () => {
        const router = useRouter();
        router.replace({
            name: "analytics-engagement",
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
        $fetch<any[]>(
            `${$config.public.BACKEND_URL}/dashboard/daily-ad-view/${
                gameId.value
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch<any[]>(
            `${$config.public.BACKEND_URL}/dashboard/event-count-by-eventname/${
                gameId.value
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch<any[]>(`${$config.public.BACKEND_URL}/dashboard/daily-retention/${gameId.value}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }),
        $fetch<any[]>(
            `${$config.public.BACKEND_URL}/dashboard/daily-d1-retention/${gameId.value}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
    ]);

    dailyAdView.value = response[0].status === "fulfilled" ? response[0].value : [];
    eventCount.value = response[1].status === "fulfilled" ? response[1].value : [];
    retentionTable.value = response[2].status === "fulfilled" ? response[2].value : [];
    dailyRetention.value = response[3].status === "fulfilled" ? response[3].value : [];
}

await fetchRequests();
</script>

<template>
    <div class="w-full overflow-hidden">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Engagement</h2>
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
                <div class="flex flex-col gap-y-5">
                    <div class="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-x-3">
                        <div class="col-span-7">
                            <div class="w-full h-full rounded-[20px] shadow-xl bg-white border p-6">
                                <DailyRetention :daily-retention="dailyRetention" />
                            </div>
                        </div>
                        <div class="col-span-8">
                            <div
                                class="flex flex-col gap-y-4.5 rounded-[20px] shadow-lg border p-6"
                            >
                                <h2
                                    class="text-[1.2rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                                >
                                    Retention Table
                                </h2>

                                <div
                                    v-if="isAnalyticsReady && retentionTable.length > 0"
                                    class="relative 3xl:pt-[45%] pt-[44.7%]"
                                >
                                    <div
                                        class="absolute top-0 left-0 w-full h-full overflow-y-scroll"
                                    >
                                        <RetentionTable :list="retentionTable" />
                                    </div>
                                </div>
                                <div
                                    v-else
                                    class="flex justify-center items-center aspect-[16/7] w-full h-full text-[1.5rem] text-cl-main"
                                >
                                    No data
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-x-3">
                        <div class="col-span-7">
                            <div
                                class="w-full h-full rounded-[20px] shadow-xl bg-white border p-10"
                            >
                                <EventCount :event-count="eventCount" />
                            </div>
                        </div>
                        <div class="col-span-8">
                            <div
                                class="rounded-[20px] shadow-lg bg-white border p-7.5 w-full h-full"
                            >
                                <DailyAd :daily-ad-view="dailyAdView" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
