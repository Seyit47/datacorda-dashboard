<script lang="ts" setup>
defineProps({
    data: {
        type: Object as PropType<any>,
        required: true,
    },
});
</script>

<template>
    <div class="w-full h-full">
        <div
            class="flex px-2.5 pt-5 pb-10 rounded-[20px] w-full h-full"
            style="
                background: radial-gradient(
                    104.58% 93.89% at 47.24% 55.41%,
                    #35275e 47.78%,
                    #803294 100%
                );
            "
        >
            <h3
                class="text-[2rem] text-center text-white rotate-180"
                style="text-orientation: mixed; writing-mode: vertical-lr"
            >
                Actual
            </h3>
            <div class="flex flex-col gap-y-7.5 w-full px-6">
                <h3 class="text-[2rem] text-white text-center">Predicted</h3>
                <div class="grid grid-cols-1 divide-y w-full h-full">
                    <div class="flex divide-x">
                        <div class="w-1/2">
                            <div
                                class="flex flex-col justify-center items-center gap-y-1 w-full h-full"
                            >
                                <span class="text-white">{{ data.true_positive_number }}</span>
                                <span class="text-white">True Positive</span>
                                <span class="text-[2.5rem] text-white"
                                    >{{ data.true_positive_precision }}%</span
                                >
                            </div>
                        </div>
                        <div class="w-1/2">
                            <div
                                class="flex flex-col justify-center items-center gap-y-1 w-full h-full"
                            >
                                <span class="text-white">{{ data.false_positive_number }}</span>
                                <span class="text-white">False Positive</span>
                                <span class="text-[2.5rem] text-white"
                                    >{{ data.false_positive_precision }}%</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="flex divide-x">
                        <div class="w-1/2">
                            <div
                                class="flex flex-col justify-center items-center gap-y-1 w-full h-full"
                            >
                                <span class="text-white">{{ data.false_negative_number }}</span>
                                <span class="text-white">False Negative</span>
                                <span class="text-[2.5rem] text-white"
                                    >{{ data.false_negative_precision }}%</span
                                >
                            </div>
                        </div>
                        <div class="w-1/2">
                            <div
                                class="flex flex-col justify-center items-center gap-y-1 w-full h-full"
                            >
                                <span class="text-white">{{ data.true_negative_number }}</span>
                                <span class="text-white">True Negative</span>
                                <span class="text-[2.5rem] text-white"
                                    >{{ data.true_negative_precision }}%</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
