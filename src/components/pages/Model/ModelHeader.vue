<script lang="ts" setup>
import BaseSelect from "@/components/core/base/BaseSelect.vue";

const model = ref("");
</script>

<template>
    <div class="w-full">
        <div class="flex items-center gap-x-10">
            <div class="flex flex-col gap-y-2.5">
                <span class="text-size_26/16 text-cl-main font-bold">Select Model</span>
                <div class="w-40">
                    <BaseSelect v-model="model" placeholder="Churn 3" />
                </div>
            </div>
            <div class="flex flex-col gap-y-2.5 items-center">
                <span class="text-size_26/16 text-cl-main font-bold">Date Range</span>
                <div class="flex items-center gap-x-2.5">
                    <div class="w-36.5">
                        <BaseSelect v-model="model" placeholder="Date" />
                    </div>
                    <span class="text-cl-main font-bold">To:</span>
                    <div class="w-36.5">
                        <BaseSelect v-model="model" placeholder="Range" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
