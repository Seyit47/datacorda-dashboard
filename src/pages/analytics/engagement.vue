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

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

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

const dailyAdView = ref<any[]>([]);
const eventCount = ref<any[]>([]);
const retentionTable = ref<any[]>([]);
const dailyRetention = ref<any[]>([]);

watch(
    filter,
    () => {
        const router = useRouter();
        router.replace({
            name: "analytics",
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

async function fetchRequests() {
    const route = useRoute();
    const query = new URLSearchParams();

    if (route.query.platform) {
        query.append("platform", `${route.query.platform}`);
        filter.platform = route.query.platform;
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
            `${
                $config.public.BACKEND_URL
            }/dashboard/daily-ad-view/567767bf-65e0-4c08-80fe-3e2885f8dce8?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${
                $config.public.BACKEND_URL
            }/dashboard/event-count-by-eventname/567767bf-65e0-4c08-80fe-3e2885f8dce8?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/daily-retention/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/daily-d1-retention/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
    ]);

    dailyAdView.value = response[0] as any[];
    eventCount.value = response[1] as any[];
    retentionTable.value = response[2] as any[];
    dailyRetention.value = response[3] as any[];
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
                <div class="flex flex-col gap-y-5">
                    <div class="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-x-3">
                        <div class="col-span-8">
                            <div class="rounded-[20px] shadow-lg bg-white border p-7.5">
                                <DailyAd :daily-ad-view="dailyAdView" />
                            </div>
                        </div>
                        <div class="col-span-7">
                            <div
                                class="w-full h-full rounded-[20px] shadow-xl bg-white border p-10"
                            >
                                <EventCount :event-count="eventCount" />
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-x-3">
                        <div class="col-span-8">
                            <div class="rounded-[20px] shadow-lg border p-6">
                                <div class="relative 3xl:pt-[45%] pt-[44.7%]">
                                    <div
                                        class="absolute top-0 left-0 w-full h-full overflow-y-scroll"
                                    >
                                        <RetentionTable :list="retentionTable" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-7">
                            <div class="w-full h-full rounded-[20px] shadow-xl bg-white border p-6">
                                <DailyRetention :daily-retention="dailyRetention" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
