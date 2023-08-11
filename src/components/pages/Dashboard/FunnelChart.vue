<template>
    <div id="funnel"></div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import D3Funnel from "d3-funnel";

import funnelChartData from "@/chart_data_test/users_by_event-funnel_chart.json";

export default {
    name: "FunnelChart",
    setup() {
        const funnelData = ref<any[]>([]);

        const transformData = (data: any) => {
            const funnelSteps = Object.keys(data[0]);
            return funnelSteps.map((step) => ({
                label: step,
                value: Number(data[0][step]),
            }));
        };

        const drawFunnelChart = () => {
            const chart = new D3Funnel("#funnel");
            const options = {
                block: {
                    dynamicHeight: true,
                    dynamicSlope: true,
                    highlight: true,
                    minHeight: 15,
                },
                chart: {
                    width: 500,
                    bottomPinch: 0,
                    animate: 300,
                    bottomWidth: 0,
                },
                tooltip: {
                    enabled: true,
                },
            };
            chart.draw(funnelData.value, options);
        };

        onMounted(() => {
            funnelData.value = transformData(funnelChartData);
            drawFunnelChart();
        });

        return {
            funnelData,
        };
    },
};
</script>
