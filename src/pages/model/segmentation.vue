<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import ModalConfirm from "@/components/core/app/ModalConfirm/Wrapper.vue";
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import SegmentForm from "@/components/pages/Segmentation/SegmentForm.vue";
import SavedResults from "@/components/pages/Segmentation/SavedResults.vue";
import SegmentationCodeBlock from "@/components/pages/Segmentation/CodeBlock.vue";

import { useAuthStore } from "@/store/auth";

definePageMeta({
    layout: "model",
});

const $toast = useToast();

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const modalConfirm = ref<any>(null);

const currentId = ref("");
const savedResults = ref<any[]>([]);
const segmentationInstance = ref<any>(null);

async function fetchRequests() {
    currentId.value = "";
    segmentationInstance.value = null;
    const response = await Promise.all([
        $fetch(
            `${$config.public.BACKEND_URL}/segmentation-list/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
    ]);

    savedResults.value = response[0] as any[];
}

async function fetchSegmentation(id: string) {
    if (segmentationInstance.value && segmentationInstance.value.id === id) {
        segmentationInstance.value = null;
        currentId.value = "";
        return;
    }
    currentId.value = id;
    const response = await Promise.all([
        $fetch(`${$config.public.BACKEND_URL}/segmentation/${id}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        }),
    ]);

    segmentationInstance.value = response[0];
}

async function onDeleteSegmentation(index: number) {
    const id = savedResults.value[index].id;
    const { isSubmit } = await modalConfirm.value.open(
        "Are you really want to delete this segmentation?"
    );

    if (!isSubmit) {
        return;
    }

    await $fetch(`${$config.public.BACKEND_URL}/segmentation/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${accessToken.value}`,
        },
    });

    savedResults.value.splice(index, 1);
    $toast.success("Segmentation deleted successfully!");
}

await fetchRequests();
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div class="flex flex-col gap-y-7.5 h-full">
                <div class="flex items-center">
                    <h2 class="text-[2.5rem] text-cl-main font-bold">Segmentation</h2>
                </div>
                <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-6">
                        <div class="w-[80%]">
                            <SegmentForm
                                :instance="segmentationInstance"
                                @refresh="fetchRequests"
                            />
                        </div>
                    </div>
                    <div class="col-span-6 flex flex-col gap-y-7.5">
                        <SavedResults
                            :data="savedResults"
                            :current-id="currentId"
                            @select="fetchSegmentation"
                            @delete="onDeleteSegmentation"
                        />
                        <SegmentationCodeBlock
                            v-if="currentId"
                            :model="segmentationInstance.model"
                            :segmentation-id="currentId"
                        />
                    </div>
                </div>
            </div>
        </BaseMaxContent>
        <ModalConfirm ref="modalConfirm" />
    </div>
</template>
