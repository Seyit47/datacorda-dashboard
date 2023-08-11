<script lang="ts" setup>
import { storeToRefs } from "pinia";
import BaseMaxContent from "@/components/core/base/BaseMaxContent.vue";
import RetentionTable from "@/components/pages/Dashboard/RetentionTable.vue";
import FunnelChart from "@/components/pages/Dashboard/FunnelChart.vue";
import { useAuthStore } from "@/store/auth";

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const retentionTable = ref<any[]>([]);

async function fetchRequests() {
    const response = await Promise.all([
        $fetch(
            `${$config.public.BACKEND_URL}/dashboard/daily-retention/567767bf-65e0-4c08-80fe-3e2885f8dce8`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${accessToken.value}`,
                },
            }
        ),
    ]);
    retentionTable.value = response[0] as any[];
}

await useAsyncData(() => fetchRequests());
</script>

<template>
    <div class="w-full">
        <BaseMaxContent class="px-6 py-8.75">
            <div
                class="flex flex-col gap-y-20 items-center justify-center max-w-full w-125 mx-auto"
            >
                <div class="aspect-[19/6.8] overflow-y-scroll">
                    <RetentionTable :list="retentionTable" />
                </div>
                <FunnelChart />
            </div>
        </BaseMaxContent>
    </div>
</template>
