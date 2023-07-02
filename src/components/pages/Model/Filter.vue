<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import BaseSelect from "@/components/core/base/BaseSelect.vue";

const model = ref("");
const date = ref("");
</script>

<template>
    <div class="w-full bg-cl-bg rounded-3xl">
        <div class="flex items-center gap-x-16 px-6 py-6">
            <div class="flex flex-col items-center gap-y-2.5">
                <span class="text-cl-main text-[1.5rem] leading-none font-bold">Select Model:</span>
                <div class="w-52">
                    <BaseSelect v-model="model" placeholder="Churn 3" />
                </div>
            </div>
            <div class="flex flex-col items-center gap-y-3">
                <span class="text-cl-main text-[1.5rem] leading-none font-bold">Date Range:</span>
                <div class="flex items-center gap-x-2.5">
                    <div class="w-52">
                        <VueDatePicker
                            v-model="date"
                            placeholder="Start date"
                            :auto-apply="true"
                            format="dd.MM.yyyy"
                            :enable-time-picker="false"
                        >
                        </VueDatePicker>
                    </div>
                    <span class="text-cl-main text-size_18/16 font-bold">To:</span>
                    <div class="w-52">
                        <VueDatePicker
                            v-model="date"
                            placeholder="End date"
                            :auto-apply="true"
                            format="dd.MM.yyyy"
                            :enable-time-picker="false"
                        >
                        </VueDatePicker>
                    </div>
                </div>
            </div>
            <div class="ml-auto">
                <button
                    class="py-1 px-12 bg-cl-blue-button text-white text-size_24/16 font-semibold rounded-xl hover:text-cl-blue-button hover:bg-white border-cl-blue-button border-2 transition-colors duration-150"
                >
                    PREDICT
                </button>
            </div>
        </div>
    </div>
</template>
