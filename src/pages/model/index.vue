<script lang="ts" setup>
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import DecisionTree from "@/components/pages/Model/DecisionTree.vue";
import AnimationLine from "@/components/pages/Model/AnimationLine.vue";
import Filter from "@/components/pages/Model/Filter.vue";

definePageMeta({
    layout: "model",
});
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-5 h-full">
                <Filter />

                <div class="bg-white shadow-xl px-[3%] pt-[1%] overflow-hidden">
                    <div class="relative w-full">
                        <div class="mx-auto w-full">
                            <AnimationLine />
                        </div>
                        <div class="absolute top-[38%] left-0 w-[20%]">
                            <div class="relative pt-[55.89%]">
                                <div
                                    class="absolute top-0 left-0 w-full h-full bg-white"
                                    style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                >
                                    <div
                                        class="flex flex-col items-center justify-center h-full gap-y-2.5"
                                    >
                                        <span class="text-[1.2vw] font-bold"># Players</span>

                                        <span class="text-[2.5vw] font-bold text-cl-main"
                                            >1000</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="absolute top-[38%] left-[40%] w-[20%]">
                            <div class="relative pt-[55.89%]">
                                <div
                                    class="absolute top-0 left-0 w-full h-full bg-white"
                                    style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                >
                                    <div class="flex flex-col items-center gap-y-2.5">
                                        <div class="w-[60%]">
                                            <div class="relative pt-[53.84%]">
                                                <img
                                                    src="@/assets/img/datacorda.png"
                                                    alt=""
                                                    class="absolute top-0 left-0 w-full h-full"
                                                />
                                            </div>
                                        </div>

                                        <span class="text-[1.3vw] italic">AI-Model</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="absolute top-[5%] right-0 w-[20%]">
                            <div class="relative pt-[55.89%]">
                                <div
                                    class="absolute top-0 left-0 w-full h-full bg-white"
                                    style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                >
                                    <div
                                        class="flex flex-col items-center h-full justify-center gap-y-2.5"
                                    >
                                        <span class="text-[1.7vw] leading-none text-cl-main"
                                            >Churn</span
                                        >

                                        <span class="text-[2.3vw] leading-none text-red-500"
                                            >68%</span
                                        >

                                        <span class="self-start pl-[1vw] text-[0.8vw]"
                                            ># of players: <b>680</b></span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="absolute bottom-[5%] right-0 w-[20%]">
                            <div class="relative pt-[55.89%]">
                                <div
                                    class="absolute top-0 left-0 w-full h-full bg-white"
                                    style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                >
                                    <div
                                        class="flex flex-col items-center h-full justify-center gap-y-2.5"
                                    >
                                        <span class="text-[1.7vw] leading-none text-cl-main"
                                            >Retain</span
                                        >

                                        <span class="text-[2.3vw] leading-none text-green-500"
                                            >32%</span
                                        >

                                        <span class="self-start pl-[1vw] text-[0.8vw]"
                                            ># of players: <b>320</b></span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="absolute top-[5%] left-0">
                            <span class="text-[2vw]">Accuracy: <b>93%</b></span>
                        </div>
                    </div>
                </div>
                <div class="w-full">
                    <DecisionTree class="w-full" />
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
