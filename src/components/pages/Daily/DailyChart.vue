<script lang="ts" setup>
import { Chart } from "chart.js/auto";

defineOptions({
    name: "DailyChart",
});

const chart = ref<any>(null);

const props = defineProps({
    activeUsers: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
    newUsers: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
});

const { activeUsers, newUsers } = toRefs(props);

const lineChart = ref<HTMLCanvasElement | null>(null);

function initChart() {
    const sortedData = activeUsers.value.sort(
        (a, b) => Number(new Date(a.date)) - Number(new Date(b.date))
    );
    const latestActiveUserData = sortedData;

    const dates = latestActiveUserData.map((entry) => entry.date);
    const chartActiveUsers = latestActiveUserData.map((entry) => +entry.count);
    const sortedNewUsers = newUsers.value.sort(
        (a, b) => Number(new Date(a.date)) - Number(new Date(b.date))
    );
    const chartNewUsers = sortedNewUsers.map((entry) => entry.count);

    const canvas = lineChart.value as HTMLCanvasElement;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const colors = {
        purple: {
            default: "rgba(154, 73, 174, 1)",
            zero: "rgba(154, 73, 174, 0)",
        },
        orange: {
            zero: "rgba(225, 139, 38, 0)",
            default: "rgba(225, 139, 38, 1)",
        },
    };

    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, colors.orange.default);
    gradient.addColorStop(1, colors.orange.zero);

    const purpleGradient = ctx.createLinearGradient(0, 0, 0, 100);
    purpleGradient.addColorStop(0, colors.purple.default);
    purpleGradient.addColorStop(1, colors.purple.zero);

    chart.value = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    data: chartActiveUsers,
                    borderColor: colors.orange.default,
                    backgroundColor: gradient,
                    fill: true,
                    borderWidth: 3,
                    pointStyle: "circle",
                    pointRadius: 0,
                    pointHoverRadius: 7,
                    tension: 0.4,
                    showLine: true,
                },
                {
                    data: chartNewUsers,
                    borderColor: colors.purple.default,
                    backgroundColor: purpleGradient,
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
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size: 9,
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
    lineChart.value = null;

    if (!chart.value) {
        return;
    }

    chart.value.destroy();
    chart.value = null;
});

const route = useRoute();

watch(route, (value) => {
    if (value.path.includes("analytics")) {
        chart.value.resize();
    }
});
</script>

<template>
    <div class="flex flex-col gap-y-10">
        <div class="flex">
            <h2
                class="text-[1.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
            >
                Daily Users (Last 30 Days)
            </h2>

            <div class="flex flex-col items-end gap-y-4 ml-auto">
                <div class="flex items-center gap-x-2.5">
                    <h2 class="text-cl-orange">Daily Active Users</h2>
                    <div class="w-6 h-6 rounded-full bg-cl-orange"></div>
                </div>
                <div class="flex items-center gap-x-2.5">
                    <h2 class="text-cl-purple">Daily New Users</h2>
                    <div class="w-6 h-6 rounded-full bg-cl-purple"></div>
                </div>
            </div>
        </div>

        <canvas ref="lineChart" style="height: 90%; width: 100%"></canvas>
    </div>
</template>
