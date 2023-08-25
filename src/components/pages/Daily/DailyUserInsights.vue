<script lang="ts" setup>
import IconUser from "@/components/icons/IconUser.vue";

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
    if (value > 1000) {
        return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
}
</script>

<template>
    <div class="py-5 px-7.5 rounded-[20px] border shadow-lg bg-white">
        <div class="flex items-center justify-between px-2 pt-9 pb-6 border-b">
            <div class="flex gap-x-4">
                <div class="w-11.25 pt-3">
                    <IconUser />
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-[4.375rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >{{ truncateValue(overviewData.total_active_user) }}</span
                    >
                    <span
                        class="text-size_14/16 text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >Total Active Users</span
                    >
                </div>
            </div>
            <div class="flex gap-x-4 pr-7.5">
                <div class="flex flex-col">
                    <span
                        class="text-[4.375rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >{{ truncateValue(overviewData.daily_new_user) }}</span
                    >
                    <span
                        class="text-size_14/16 text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >Daily New Users</span
                    >
                </div>
            </div>
        </div>
        <div class="grid grid-cols-3 pt-7.5 px-4">
            <div class="flex flex-col items-center gap-y-2.5">
                <span
                    class="text-[2.5rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                    >{{ truncateValue(overviewData.daily_active_user) }}</span
                >
                <span
                    class="text-size_14/16 text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                >
                    DAU
                </span>
            </div>
            <div class="flex flex-col items-center gap-y-2.5">
                <span
                    class="text-[2.5rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                    >{{ truncateValue(overviewData.weekly_active_user) }}</span
                >
                <span
                    class="text-size_14/16 text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                >
                    WAU
                </span>
            </div>
            <div class="flex flex-col items-center gap-y-2.5">
                <span
                    class="text-[2.5rem] leading-none text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                    >{{ truncateValue(overviewData.monthly_active_user) }}</span
                >
                <span
                    class="text-size_14/16 text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                >
                    MAU
                </span>
            </div>
        </div>
    </div>
</template>
