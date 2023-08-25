<script setup lang="ts">
import { Chart } from "chart.js/auto";

const props = defineProps({
    featureImportance: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
});

const { featureImportance } = toRefs(props);

const chart = ref<any>(null);

const barChart = ref<HTMLCanvasElement | null>(null);

function initChart() {
    const countries = featureImportance.value.map((entry) => entry.feature);
    const users = featureImportance.value.map((entry) => Math.round(entry.gain * 100));

    const ctx = barChart.value as HTMLCanvasElement;

    const canvas = ctx.getContext("2d") as CanvasRenderingContext2D;

    const gradient = canvas.createLinearGradient(300, 0, 0, 0);
    gradient.addColorStop(0, "rgb(53, 39, 94)");
    gradient.addColorStop(1, "rgb(154, 73, 174)");

    chart.value = new Chart(ctx, {
        type: "bar",
        data: {
            labels: countries,
            datasets: [
                {
                    data: users,
                    backgroundColor: gradient,
                    borderRadius: Number.MAX_VALUE,
                    borderSkipped: false,
                },
            ],
        },
        options: {
            aspectRatio: 19 / 9,
            indexAxis: "y",
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        font: {
                            size: window.innerWidth > 1280 ? 12 : 6,
                        },
                        autoSkip: false,
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size: window.innerWidth > 1280 ? 12 : 6,
                        },
                        autoSkip: false,
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
        },
    });
}

onMounted(() => {
    initChart();
});

onBeforeUnmount(() => {
    barChart.value = null;

    if (!chart.value) {
        return;
    }

    chart.value.destroy();
    chart.value = null;
});
</script>

<template>
    <div class="flex flex-col justify-center gap-y-5 h-full">
        <h2
            class="text-[1.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
        >
            Feature Importance
        </h2>
        <canvas ref="barChart" v-bind="$attrs" style="height: 100%; width: 100%"></canvas>
    </div>
</template>
