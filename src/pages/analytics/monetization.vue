<script lang="ts" setup>
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseSelect from "@/components/core/base/BaseSelect.vue";
import BaseDatePicker from "@/components/core/base/BaseDatePicker.vue";
import DailyRevenue from "@/components/pages/Monetization/DailyRevenue.vue";

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

const revenueList = ref([
    {
        name: "Total Purchase Revenue",
        icon: defineAsyncComponent(() => import("@/components/icons/IconCoin.vue")),
    },
    {
        name: "Daily Purchase Revenue",
        icon: defineAsyncComponent(() => import("@/components/icons/IconCashHand.vue")),
    },
    {
        name: "ARPPU",
        icon: defineAsyncComponent(() => import("@/components/icons/IconUserCash.vue")),
    },
    {
        name: "ARPU",
        icon: defineAsyncComponent(() => import("@/components/icons/IconUserMonetization.vue")),
    },
]);
</script>

<template>
    <div class="w-full overflow-hidden">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Monetization</h2>
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
                    <div class="grid grid-cols-12 gap-x-2">
                        <div v-for="(item, index) in revenueList" :key="index" class="col-span-3">
                            <div class="px-7.5 py-5 border shadow-lg rounded-[20px]">
                                <div class="flex items-center">
                                    <span class="w-[60%] text-size_28/16 font-medium text-cl-main">
                                        {{ item.name }}
                                    </span>
                                    <div class="w-15 ml-auto">
                                        <component :is="item.icon" />
                                    </div>
                                </div>
                                <div class="flex flex-col justify-center items-center py-15">
                                    <h3 class="text-[1.875rem] text-cl-main">
                                        $
                                        <span class="text-[4.375rem]">---</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rounded-[20px] shadow-lg border px-14 py-10">
                        <DailyRevenue />
                    </div>
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
