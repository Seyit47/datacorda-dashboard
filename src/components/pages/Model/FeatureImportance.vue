<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { useGameStore } from "~/store/game";

const gameStore = useGameStore();
const { isModelReady } = gameStore;

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
                tooltip: {
                    bodyFont: {
                        size:
                            window.innerWidth >= 2560
                                ? 20
                                : window.innerWidth > 1920
                                ? 16
                                : window.innerWidth > 1280
                                ? 14
                                : 12,
                    },
                    titleFont: {
                        size:
                            window.innerWidth >= 2560
                                ? 20
                                : window.innerWidth > 1920
                                ? 16
                                : window.innerWidth > 1280
                                ? 14
                                : 12,
                    },
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
                            size:
                                window.innerWidth >= 2560
                                    ? 16
                                    : window.innerWidth > 1920
                                    ? 14
                                    : window.innerWidth > 1280
                                    ? 10
                                    : 8,
                        },
                        autoSkip: false,
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size:
                                window.innerWidth >= 2560
                                    ? 16
                                    : window.innerWidth > 1920
                                    ? 14
                                    : window.innerWidth > 1280
                                    ? 10
                                    : 8,
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
    if (!isModelReady || featureImportance.value.length === 0) {
        return;
    }
    initChart();
});
</script>

<template>
    <div class="flex flex-col justify-center gap-y-5 h-full">
        <h2
            class="text-[1.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
        >
            Feature Importance
        </h2>
        <canvas
            v-if="isModelReady && featureImportance.length > 0"
            ref="barChart"
            v-bind="$attrs"
            style="height: 100%; width: 100%"
        ></canvas>

        <div
            v-else
            class="flex justify-center items-center aspect-[19/9] w-full h-full text-[1.5rem] text-cl-main"
        >
            No data
        </div>
    </div>
</template>
