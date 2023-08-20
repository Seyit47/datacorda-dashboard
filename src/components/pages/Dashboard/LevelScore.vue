<script lang="ts" setup>
import PlayabilityScore from "./playability_score.json";

function numberToPercent(value: number) {
    return value * 100;
}
</script>

<template>
    <div class="p-6 rounded-[20px] border shadow-lg">
        <div class="flex flex-col gap-y-3.75">
            <div class="flex items-center">
                <div class="w-[30%] flex justify-center items-center">
                    <span
                        class="text-size_20/16 font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >Levels</span
                    >
                </div>
                <div class="w-[70%] flex justify-center items-center">
                    <span
                        class="text-size_20/16 font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >Playability score</span
                    >
                </div>
            </div>
            <div class="flex flex-col gap-y-3 aspect-[16/5.8] overflow-y-scroll">
                <div
                    v-for="(item, index) in PlayabilityScore"
                    :key="index"
                    class="flex items-center py-4 border"
                >
                    <div class="w-[30%] flex justify-center items-center">
                        <span
                            class="text-size_20/16 text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                            >{{ item.levels }}</span
                        >
                    </div>
                    <div class="w-[70%] flex justify-center items-center gap-x-7.5 pl-[10%]">
                        <span
                            class="text-size_20/16 text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                            >{{ numberToPercent(Number(item.score)) }}%</span
                        >
                        <div class="w-[30%]">
                            <div class="relative bg-[#B6B2C2] h-[4px] rounded-full w-full">
                                <span
                                    class="absolute top-0 left-0 h-full bg-[#2EC52B] rounded-full"
                                    :style="`width: ${numberToPercent(Number(item.score))}%`"
                                ></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
