<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { format } from "date-fns";
import { useGameStore } from "@/store/game";

const gameStore = useGameStore();
const { isAnalyticsReady } = gameStore;

const props = defineProps({
    sessionNumber: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
});

const { sessionNumber } = toRefs(props);

const chart = ref<any>(null);

const barChart = ref<HTMLCanvasElement | null>(null);

function initChart() {
    const sortedData = sessionNumber.value.sort(
        (a, b) => Number(new Date(a.date)) - Number(new Date(b.date))
    );

    const countries = sortedData.map((entry) => format(new Date(entry.date), "d MMM, yyyy"));
    const users = sortedData.map((entry) => +entry.count);

    const ctx = barChart.value as HTMLCanvasElement;

    const canvas = ctx.getContext("2d") as CanvasRenderingContext2D;

    const colors = {
        purple: {
            default: "rgba(154, 73, 174, 1)",
            zero: "rgba(154, 73, 174, 0)",
        },
    };

    const gradient = canvas.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, colors.purple.default);
    gradient.addColorStop(1, colors.purple.zero);

    const textGradient = canvas.createLinearGradient(0, 0, 0, 300);
    textGradient.addColorStop(0, "rgb(53, 39, 94)");
    textGradient.addColorStop(1, "rgb(154, 73, 174)");

    Chart.defaults.color = textGradient;

    chart.value = new Chart(ctx, {
        type: "line",
        data: {
            labels: countries,
            datasets: [
                {
                    data: users,
                    borderColor: colors.purple.default,
                    backgroundColor: gradient,
                    fill: true,
                    borderWidth: 3,
                    pointStyle: "circle",
                    pointRadius: 0,
                    pointHoverRadius: 7,
                    tension: 0.4,
                    showLine: true,
                },
            ],
        },
        options: {
            aspectRatio: 19 / 7,
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            interaction: {
                intersect: false,
                mode: "index",
            },
            scales: {
                y: {
                    ticks: {
                        font: {
                            size: window.innerWidth > 1280 ? 10 : 6,
                        },
                        autoSkip: false,
                    },
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size: window.innerWidth > 1280 ? 8 : 6,
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
    if (!isAnalyticsReady) {
        return;
    }
    initChart();
});
</script>

<template>
    <div class="flex flex-col justify-center gap-y-2.5">
        <h2
            class="text-[1.2rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
        >
            Session Number
        </h2>
        <canvas
            v-if="isAnalyticsReady"
            ref="barChart"
            v-bind="$attrs"
            style="height: 90%; width: 100%"
        ></canvas>

        <div
            v-else
            class="flex justify-center items-center w-full h-full text-[1.5rem] text-cl-main"
        >
            No data
        </div>
    </div>
</template>
