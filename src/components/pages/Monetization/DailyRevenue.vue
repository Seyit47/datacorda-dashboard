<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { format } from "date-fns";
import dailyPurchase from "./daily_purchase_revenue.json";

// const props = defineProps({
//     dailyPurchase: {
//         type: Array as PropType<any[]>,
//         default: () => [],
//     },
// });

// const { dailyPurchase } = toRefs(props);

const chart = ref<any>(null);

const barChart = ref<HTMLCanvasElement | null>(null);

function initChart() {
    const sortedData = dailyPurchase.sort(
        (a, b) => Number(new Date(a.date)) - Number(new Date(b.date))
    );

    const countries = sortedData.map((entry) => format(new Date(entry.date), "d MMM, yyyy"));
    const users = sortedData.map((entry) => entry.revenue);

    const ctx = barChart.value as HTMLCanvasElement;

    const canvas = ctx.getContext("2d") as CanvasRenderingContext2D;

    const colors = {
        purple: {
            default: "rgb(53, 39, 94)",
            zero: "rgba(174, 90, 195, 0.65)",
        },
    };

    const gradient = canvas.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, colors.purple.default);
    gradient.addColorStop(1, colors.purple.zero);

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
                    borderWidth: 1,
                    pointStyle: "circle",
                    pointRadius: 0,
                    pointHoverRadius: 7,
                    tension: 0.4,
                    showLine: true,
                },
            ],
        },
        options: {
            aspectRatio: 16 / 4,
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
    initChart();
});
</script>

<template>
    <div class="flex flex-col justify-center gap-y-7.5">
        <h2
            class="text-[1.2rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
        >
            Daily Purchase Revenue
        </h2>
        <canvas ref="barChart" v-bind="$attrs"></canvas>
    </div>
</template>
