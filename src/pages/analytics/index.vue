<script lang="ts" setup>
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import BarChart from "@/components/pages/Daily/BarChart.vue";
import LineChart from "@/components/pages/Daily/LineChart.vue";
import DoughnutChart from "@/components/pages/Daily/DoughnutChart.vue";
import EmptyChart from "@/components/pages/Daily/EmptyChart.vue";
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
                        <div
                            class="pt-12 pb-5 px-7.5 rounded-[20px] bg-gradient-to-l from-cl-purple-to via-cl-purple-from to-cl-purple-to"
                        >
                            <div class="flex items-center justify-between px-7.5 py-6 border-b">
                                <div class="flex">
                                    <div class="flex flex-col">
                                        <span class="text-[4.375rem] leading-none text-cl-bg-shade"
                                            >64</span
                                        >
                                        <span class="text-cl-bg-shade text-size_14/16"
                                            >Daily Users</span
                                        >
                                    </div>
                                    <div class="flex-start">
                                        <div
                                            class="bg-cl-bg-shade px-1 text-red-500 border-l-3 border-red-500"
                                        >
                                            -3.2%
                                        </div>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div class="flex flex-col">
                                        <span class="text-[4.375rem] leading-none text-cl-bg-shade"
                                            >20%</span
                                        >
                                        <span class="text-cl-bg-shade text-size_14/16"
                                            >Retention</span
                                        >
                                    </div>
                                    <div class="flex-start">
                                        <div
                                            class="bg-cl-bg-shade px-1 text-green-500 border-l-3 border-green-500"
                                        >
                                            +3.2%
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 pt-7.5 px-4">
                                <div class="flex flex-col gap-y-2.5">
                                    <span class="text-[2.5rem] leading-none text-cl-bg-shade"
                                        >6</span
                                    >
                                    <span class="text-cl-bg-shade"> Lorem, ipsum. </span>
                                </div>
                                <div class="flex flex-col gap-y-2.5">
                                    <span class="text-[2.5rem] leading-none text-cl-bg-shade"
                                        >19</span
                                    >
                                    <span class="text-cl-bg-shade"> Lorem, ipsum. </span>
                                </div>
                                <div class="flex flex-col gap-y-2.5">
                                    <span class="text-[2.5rem] leading-none text-cl-bg-shade"
                                        >32%</span
                                    >
                                    <span class="text-cl-bg-shade"> Lorem, ipsum. </span>
                                </div>
                            </div>
                        </div>
                        <div class="rounded-[20px] shadow-xl">
                            <BarChart />
                        </div>
                        <div class="rounded-[20px] shadow-xl">
                            <EmptyChart />
                        </div>
                    </div>
                    <div class="col-span-7 flex flex-col gap-y-7.5">
                        <div class="rounded-[20px] shadow-xl">
                            <DoughnutChart />
                        </div>
                        <div class="rounded-[20px] shadow-xl">
                            <LineChart />
                        </div>
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
