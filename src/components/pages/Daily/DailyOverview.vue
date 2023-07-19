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
    <div class="pt-7.5 pb-5 px-7.5 rounded-[20px] border shadow-lg bg-white">
        <div class="flex items-center justify-between px-7.5 py-6 border-b">
            <div class="flex gap-x-4">
                <div class="flex flex-col">
                    <span
                        class="text-[4.375rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >{{
                            overviewData.average_dau > 1000
                                ? `${(overviewData.average_dau / 1000).toFixed(1)}K`
                                : overviewData.average_dau
                        }}</span
                    >
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main text-size_14/16"
                        >Average DAU</span
                    >
                </div>
                <div class="flex-start">
                    <div class="border border-cl-red">
                        <div class="bg-white px-1 text-cl-red border-l-3 border-cl-red">
                            {{ overviewData.average_dau_change }}%
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex gap-x-4">
                <div class="flex flex-col">
                    <span
                        class="text-[4.375rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >{{ overviewData.retention_rate }}%</span
                    >
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main text-size_14/16"
                        >Retention Rate</span
                    >
                </div>
                <div class="flex-start">
                    <div class="border border-cl-green">
                        <div class="bg-white px-1 text-cl-green border-l-3 border-cl-green">
                            {{ overviewData.retention_rate_change }}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-3 pt-7.5 px-4">
            <div class="flex flex-col gap-y-2.5">
                <span
                    class="text-[2.5rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                    >{{
                        overviewData.total_active_users
                            ? `${(overviewData.total_active_users / 1000).toFixed(1)}K`
                            : overviewData.total_active_users
                    }}</span
                >
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                >
                    Total Active Users
                </span>
            </div>
            <div class="flex flex-col gap-y-2.5">
                <span
                    class="text-[2.5rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                    >{{
                        overviewData.average_daily_new_user
                            ? `${(overviewData.average_daily_new_user / 1000).toFixed(1)}K`
                            : overviewData.average_daily_new_user
                    }}</span
                >
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                >
                    Avg Daily New User
                </span>
            </div>
            <div class="flex flex-col gap-y-2.5">
                <span
                    class="text-[2.5rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                    >{{ overviewData.churn_rate }}%</span
                >
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                >
                    Churn Rate
                </span>
            </div>
        </div>
    </div>
</template>
