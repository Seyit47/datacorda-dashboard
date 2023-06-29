<script lang="ts" setup>
import { ArrowUpIcon } from "@heroicons/vue/24/outline";
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import DailyChart from "@/components/pages/Daily/DailyChart.vue";
import ChartCountry from "@/components/pages/Daily/ChartCountry.vue";
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-12 h-full">
                <div class="flex items-center">
                    <h2 class="text-[3rem] text-cl-main font-bold italic">Daily</h2>
                    <div class="flex items-center gap-x-7.5 ml-auto">
                        <div class="w-63">
                            <BaseSelect placeholder="Platform" />
                        </div>
                        <div class="w-63">
                            <BaseSelect placeholder="Date" />
                        </div>
                        <div class="w-63">
                            <BaseSelect placeholder="Range" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-x-16 items-center">
                    <div class="col-span-3">
                        <div class="w-full h-full rounded-md shadow-c-select px-4 py-4">
                            <div class="border-b border-cl-main pb-2.5">
                                <div class="flex items-center w-full h-full px-4">
                                    <h2 class="text-cl-main text-size_24/16 font-bold">
                                        Retention
                                    </h2>
                                    <div class="ml-auto">
                                        <span
                                            class="px-4 py-1 bg-gray-100 text-size_14/16 font-medium"
                                            >D0</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 pt-2.5 flex flex-col gap-y-2.5">
                                <div class="flex items-center">
                                    <h1 class="text-[3rem] leading-none font-bold">20%</h1>
                                    <div class="flex items-center gap-x-2 ml-auto">
                                        <ArrowUpIcon class="w-4.5 text-green-500" />
                                        <span
                                            class="text-green-500 text-size_18/16 leading-none font-bold"
                                        >
                                            5.5%
                                        </span>
                                    </div>
                                </div>
                                <span class="text-size_18/16">Daily Average: <b>10%</b></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-3">
                        <div class="w-full h-full rounded-md shadow-c-select px-4 py-4">
                            <div class="border-b border-cl-main pb-2.5">
                                <div class="flex items-center w-full h-full px-4">
                                    <h2 class="text-cl-main text-size_24/16 font-bold">
                                        Retention
                                    </h2>
                                    <div class="ml-auto">
                                        <span
                                            class="px-4 py-1 bg-gray-100 text-size_14/16 font-medium"
                                            >D0</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 pt-2.5 flex flex-col gap-y-2.5">
                                <div class="flex items-center">
                                    <h1 class="text-[3rem] leading-none font-bold">20%</h1>
                                    <div class="flex items-center gap-x-2 ml-auto">
                                        <ArrowUpIcon class="w-4.5 text-green-500" />
                                        <span
                                            class="text-green-500 text-size_18/16 leading-none font-bold"
                                        >
                                            5.5%
                                        </span>
                                    </div>
                                </div>
                                <span class="text-size_18/16">Daily Average: <b>10%</b></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-3">
                        <div class="w-full h-full rounded-md shadow-c-select px-4 py-4">
                            <div class="border-b border-cl-main pb-2.5">
                                <div class="flex items-center w-full h-full px-4">
                                    <h2 class="text-cl-main text-size_24/16 font-bold">
                                        Retention
                                    </h2>
                                    <div class="ml-auto">
                                        <span
                                            class="px-4 py-1 bg-gray-100 text-size_14/16 font-medium"
                                            >D0</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 pt-2.5 flex flex-col gap-y-2.5">
                                <div class="flex items-center">
                                    <h1 class="text-[3rem] leading-none font-bold">20%</h1>
                                    <div class="flex items-center gap-x-2 ml-auto">
                                        <ArrowUpIcon class="w-4.5 text-green-500" />
                                        <span
                                            class="text-green-500 text-size_18/16 leading-none font-bold"
                                        >
                                            5.5%
                                        </span>
                                    </div>
                                </div>
                                <span class="text-size_18/16">Daily Average: <b>10%</b></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-3">
                        <div class="w-full h-full rounded-md shadow-c-select px-4 py-4">
                            <div class="border-b border-cl-main pb-2.5">
                                <div class="flex items-center w-full h-full px-4">
                                    <h2 class="text-cl-main text-size_24/16 font-bold">
                                        Retention
                                    </h2>
                                    <div class="ml-auto">
                                        <span
                                            class="px-4 py-1 bg-gray-100 text-size_14/16 font-medium"
                                            >D0</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 pt-2.5 flex flex-col gap-y-2.5">
                                <div class="flex items-center">
                                    <h1 class="text-[3rem] leading-none font-bold">20%</h1>
                                    <div class="flex items-center gap-x-2 ml-auto">
                                        <ArrowUpIcon class="w-4.5 text-green-500" />
                                        <span
                                            class="text-green-500 text-size_18/16 leading-none font-bold"
                                        >
                                            5.5%
                                        </span>
                                    </div>
                                </div>
                                <span class="text-size_18/16">Daily Average: <b>10%</b></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-auto">
                    <div class="grid grid-cols-2 items-center">
                        <div class="col-span-1">
                            <DailyChart />
                        </div>
                        <div class="col-span-1">
                            <ChartCountry />
                        </div>
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
