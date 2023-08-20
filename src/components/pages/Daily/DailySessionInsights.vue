<script lang="ts" setup>
import IconClock from "@/components/icons/IconClock.vue";

defineProps({
    overviewData: {
        type: [Object, null] as PropType<any>,
        default: null,
    },
});

function truncateValue(value: number) {
    if (value > 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value > 10000) {
        return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed();
}
</script>

<template>
    <div class="py-5 px-7.5 rounded-[20px] border shadow-lg bg-white">
        <div class="flex items-center justify-between px-2 pt-9 pb-6 border-b">
            <div class="flex gap-x-4">
                <div class="w-11.25 pt-3">
                    <IconClock />
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-[4.375rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >{{ truncateValue(overviewData.avg_playtime_per_session) }}</span
                    >
                    <span
                        class="text-size_14/16 text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >Avg Playtime per Session</span
                    >
                </div>
            </div>
            <div class="flex gap-x-4 pr-7.5">
                <div class="flex flex-col">
                    <span
                        class="text-[4.375rem] text-center leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >{{ truncateValue(overviewData.avg_daily_session_number_per_user) }}</span
                    >
                    <span
                        class="text-size_14/16 text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >Avg Daily Session Num per User</span
                    >
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 pt-7.5 px-4">
            <div class="flex flex-col items-center gap-y-2.5">
                <span
                    class="text-[2.5rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                    >{{ truncateValue(overviewData.avg_session_number_per_day) }}</span
                >
                <span
                    class="text-size_14/16 text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                >
                    Avg Number Of Sessions per day
                </span>
            </div>

            <div class="flex flex-col items-center gap-y-2.5">
                <span
                    class="text-[2.5rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                    >{{ truncateValue(overviewData.avg_session_playtime_per_day) }} hours</span
                >
                <span
                    class="text-size_14/16 text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                >
                    Avg Session Playtime per Day
                </span>
            </div>
        </div>
    </div>
</template>
