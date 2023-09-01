<script lang="ts" setup>
import { getValueFromPercetage } from "@/utils";
import { useGameStore } from "@/store/game";

const gameStore = useGameStore();
const { isModelReady } = gameStore;

defineProps({
    data: {
        type: Object as PropType<any>,
        required: true,
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
    <div class="flex">
        <div v-if="isModelReady && data" class="w-[62%]">
            <div class="relative pt-[100%]">
                <div class="absolute top-0 left-0 w-full h-full">
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h2
                            class="text-[150%] text-center font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >
                            Total Players
                        </h2>
                        <h2
                            class="text-[200%] text-center font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >
                            {{ truncateValue(data[0].user_number + data[1].user_number) }}
                        </h2>
                    </div>
                    <div
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[75%] w-[75%]"
                    >
                        <div class="relative pt-[100%]">
                            <svg viewBox="0 0 120 120">
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="54"
                                    fill="none"
                                    stroke="#e6e6e6"
                                    stroke-width="1"
                                    stroke-dasharray="100"
                                    stroke-dashoffset="25"
                                    pathLength="100"
                                />
                                <circle
                                    class="percent ninety"
                                    cx="60"
                                    cy="60"
                                    r="54"
                                    fill="none"
                                    :transform="`rotate(${
                                        270 - getValueFromPercetage(data[1].percentage, 180)
                                    } 60 60)`"
                                    stroke="#2EC52B"
                                    stroke-width="12"
                                    :stroke-dasharray="100"
                                    :stroke-dashoffset="
                                        100 - getValueFromPercetage(data[1].percentage, 50)
                                    "
                                    pathLength="100"
                                />
                            </svg>
                        </div>

                        <div
                            class="absolute top-[60.5%] left-[94.7%] border-l-2 border-t-2 border-[#e6e6e6] w-[62%] h-[15%]"
                        ></div>

                        <div class="absolute top-[55%] left-[156%] w-[40%] h-[10%]">
                            <div class="flex border w-full h-full rounded-[10px]">
                                <div
                                    class="rounded-tl-[10px] rounded-bl-[10px] bg-[#2EC52B] w-3.75 h-full"
                                ></div>
                                <div class="flex flex-col items-center w-full py-[5%]">
                                    <span class="text-[90%] text-[#2EC52B] font-bold">Retain</span>
                                    <span class="text-[160%] text-[#2EC52B] font-bold">
                                        {{ data[1].percentage }}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <svg viewBox="0 0 120 120">
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#e6e6e6"
                            stroke-width="0.7"
                            stroke-dasharray="100"
                            stroke-dashoffset="25"
                            pathLength="100"
                        />
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            :transform="`rotate(${
                                270 - getValueFromPercetage(data[0].percentage, 180)
                            } 60 60)`"
                            stroke="#FF4C00"
                            stroke-width="9"
                            :stroke-dasharray="100"
                            :stroke-dashoffset="100 - getValueFromPercetage(data[0].percentage, 50)"
                            pathLength="100"
                        />
                    </svg>

                    <div
                        class="absolute top-1/2 left-[94.7%] border-t-2 border-[#e6e6e6] w-[35%] h-[10%]"
                    ></div>

                    <div class="absolute top-[42.7%] left-[129.5%] w-[30%] h-[15%]">
                        <div class="flex border w-full h-full rounded-[10px]">
                            <div
                                class="rounded-tl-[10px] rounded-bl-[10px] bg-[#FF4C00] w-3.75 h-full"
                            ></div>
                            <div class="flex flex-col items-center w-full py-[5%]">
                                <span class="text-[90%] text-[#FF4C00] font-bold">Churn</span>
                                <span class="text-[160%] text-[#FF4C00] font-bold">
                                    {{ data[0].percentage }}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-else
            class="flex justify-center items-center aspect-[19/9] w-full h-full text-[1.5rem] text-cl-main"
        >
            No data
        </div>
    </div>
</template>
