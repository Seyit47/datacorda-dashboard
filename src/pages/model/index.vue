<script lang="ts" setup>
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import ModelHeader from "@/components/pages/Model/ModelHeader.vue";
import StatisticsAnimation from "@/components/pages/Model/StatisticsAnimation.vue";
import HorizontalBarChart from "@/components/pages/Model/HorizontalBarChart.vue";
import StatisticsChart from "@/components/pages/Model/StatisticsChart.vue";

definePageMeta({
    layout: "model",
});
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <ModelHeader />

                <div class="w-full rounded-[20px] shadow-xl">
                    <StatisticsAnimation />
                </div>

                <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-7">
                        <div class="w-full h-full rounded-[20px] shadow-xl">
                            <HorizontalBarChart />
                        </div>
                    </div>
                    <div class="col-span-5">
                        <div class="w-full rounded-[20px] shadow-xl">
                            <StatisticsChart />
                        </div>
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
