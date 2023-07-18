<script lang="ts" setup>
const props = defineProps({
    overviewData: {
        type: [Object, null] as PropType<any>,
        default: null,
    },
});

const { overviewData } = toRefs(props);
</script>

<template>
    <div
        class="pt-12 pb-5 px-7.5 rounded-[20px] bg-gradient-to-l from-cl-purple-to via-cl-purple-from to-cl-purple-to"
    >
        <div class="flex items-center justify-between px-7.5 py-6 border-b">
            <div class="flex gap-x-4">
                <div class="flex flex-col">
                    <span class="text-[4.375rem] leading-none text-cl-bg-shade">{{
                        overviewData.average_dau
                    }}</span>
                    <span class="text-cl-bg-shade text-size_14/16">Average DAU</span>
                </div>
                <div class="flex-start">
                    <div class="bg-cl-bg-shade px-1 text-cl-red border-l-3 border-cl-red">
                        {{ overviewData.average_dau_change }}%
                    </div>
                </div>
            </div>
            <div class="flex gap-x-4">
                <div class="flex flex-col">
                    <span class="text-[4.375rem] leading-none text-cl-bg-shade"
                        >{{ overviewData.retention_rate }}%</span
                    >
                    <span class="text-cl-bg-shade text-size_14/16">Retention Rate</span>
                </div>
                <div class="flex-start">
                    <div class="bg-cl-bg-shade px-1 text-cl-green border-l-3 border-cl-green">
                        {{ overviewData.retention_rate_change }}%
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-3 pt-7.5 px-4">
            <div class="flex flex-col gap-y-2.5">
                <span class="text-[2.5rem] leading-none text-cl-bg-shade">{{
                    overviewData.total_active_users
                }}</span>
                <span class="text-cl-bg-shade"> Total Active Users </span>
            </div>
            <div class="flex flex-col gap-y-2.5">
                <span class="text-[2.5rem] leading-none text-cl-bg-shade">{{
                    overviewData.average_daily_new_user
                }}</span>
                <span class="text-cl-bg-shade"> Avg Daily New User </span>
            </div>
            <div class="flex flex-col gap-y-2.5">
                <span class="text-[2.5rem] leading-none text-cl-bg-shade"
                    >{{ overviewData.churn_rate }}%</span
                >
                <span class="text-cl-bg-shade"> Churn Rate </span>
            </div>
        </div>
    </div>
</template>
