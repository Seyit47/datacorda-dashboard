<script setup lang="ts">
import { Chart } from "chart.js/auto";

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

    const countries = sortedData.map((entry) => entry.date);
    const users = sortedData.map((entry) => +entry.count);

    const ctx = barChart.value as HTMLCanvasElement;

    const canvas = ctx.getContext("2d") as CanvasRenderingContext2D;

    const gradient = canvas.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgb(53, 39, 94)");
    gradient.addColorStop(1, "rgb(154, 73, 174)");

    Chart.defaults.color = gradient;

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
                        autoSkip: false,
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size: window.innerWidth > 1280 ? 9 : 6,
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
            Number of Sessions
        </h2>
        <canvas ref="barChart" v-bind="$attrs" class="h-full"></canvas>
    </div>
</template>
