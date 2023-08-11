<script lang="ts" setup>
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import ModelHeader from "@/components/pages/Model/ModelHeader.vue";
import DecisionTree from "@/components/pages/Model/DecisionTree.vue";

definePageMeta({
    layout: "model",
});
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <ModelHeader />

                <div class="w-full">
                    <DecisionTree />
                </div>
            </div>
        </BaseMaxContent>
    </div>
</template>
