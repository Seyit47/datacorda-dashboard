<script lang="ts" setup>
import { storeToRefs } from "pinia";
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import DailyOverview from "@/components/pages/Daily/DailyOverview.vue";
import ChartCountry from "@/components/pages/Daily/ChartCountry.vue";
import DailyChart from "@/components/pages/Daily/DailyChart.vue";
import { useAuthStore } from "@/store/auth";

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const activeUsers = ref<any[]>([]);
const newUsers = ref<any[]>([]);
const sessionNumber = ref<any[]>([]);
const overViewData = ref<any>(null);

const activeUserResponse = await useAsyncData<any[]>(() =>
    $fetch(
        `${$config.public.BACKEND_URL}/dashboard/daily-active-user-number/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }
    )
);

const newUserResponse = await useAsyncData<any[]>(() =>
    $fetch(
        `${$config.public.BACKEND_URL}/dashboard/daily-new-user-number/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }
    )
);

const sessionNumberResponse = await useAsyncData<any[]>(() =>
    $fetch(
        `${$config.public.BACKEND_URL}/dashboard/daily-session-number/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }
    )
);

const overviewResponse = await useAsyncData<any[]>(() =>
    $fetch(
        `${$config.public.BACKEND_URL}/dashboard/overview/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }
    )
);

activeUsers.value = activeUserResponse.data.value as any[];
newUsers.value = newUserResponse.data.value as any[];
sessionNumber.value = sessionNumberResponse.data.value as any[];
overViewData.value = overviewResponse.data.value;
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-12 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Daily</h2>
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
                <div class="grid grid-cols-12 gap-x-10">
                    <div class="col-span-5 flex flex-col gap-y-7.5">
                        <DailyOverview :overview-data="overViewData" />
                        <div class="flex items-center gap-x-4">
                            <svg
                                viewBox="0 0 268 109"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g filter="url(#filter0_d_112_567)">
                                    <rect x="2" width="260" height="101" rx="20" fill="#FFFFFF" />
                                </g>
                                <rect
                                    x="93"
                                    y="18"
                                    width="95"
                                    height="19"
                                    rx="9.5"
                                    fill="#B6B2C2"
                                />
                                <rect
                                    x="93"
                                    y="39"
                                    width="146"
                                    height="19"
                                    rx="9.5"
                                    fill="#B6B2C2"
                                />
                                <rect x="18" y="18" width="65" height="65" rx="15" fill="#B6B2C2" />
                                <defs>
                                    <filter
                                        id="filter0_d_112_567"
                                        x="0"
                                        y="0"
                                        width="268"
                                        height="109"
                                        filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB"
                                    >
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dx="2" dy="4" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="BackgroundImageFix"
                                            result="effect1_dropShadow_112_567"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_112_567"
                                            result="shape"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div class="col-span-7 flex flex-col gap-y-7.5">
                        <div class="rounded-[20px] shadow-xl bg-white p-6 h-full">
                            <ChartCountry :session-number="sessionNumber" />
                        </div>
                    </div>
                </div>
                <div class="rounded-[20px] shadow-xl bg-white p-14">
                    <DailyChart :active-users="activeUsers" :new-users="newUsers" />
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
