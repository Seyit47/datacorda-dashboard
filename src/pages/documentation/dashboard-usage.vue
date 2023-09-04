<script lang="ts" setup>
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import BaseDocumentViewer from "@/components/core/base/BaseDocumentViewer.vue";

definePageMeta({
    layout: "documentation",
});

const content = ref(`<p class="c5 c8"><span class="c2">Analytics Tab</span></p>
    <p class="c3 c8"><span class="c2"></span></p>
    <p class="c5 c8"><span class="c2">Model section</span></p>
    <p class="c3 c8"><span class="c2"></span></p>
    <p class="c5 c8"><span class="c2">Segmentation section</span></p>
    <p class="c3 c8"><span class="c2"></span></p>
    <p class="c5 c8">
      <span class="c2">Player&rsquo;s Journey &nbsp;section</span>
    </p>`);
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="max-w-[76rem] px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Dashboard Usage</h2>
                </div>

                <BaseDocumentViewer :content="content" />
            </div>
        </BaseMaxContent>
    </div>
</template>
