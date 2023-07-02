<script setup lang="ts">
import { Chart } from "chart.js/auto";

import data from "@/chart_data_test/users_by_country-bar_chart.json";

const barChart = ref<HTMLCanvasElement | null>(null);

function initChart() {
    const sortedData = data
        .sort((a: any, b: any) => b.number_of_users - a.number_of_users)
        .slice(0, 10); // Sort in descending order and take the first 30 observations

    const countries = sortedData.map((entry) => entry.country);
    const users = sortedData.map((entry) => +entry.number_of_users);

    const ctx = barChart.value as HTMLCanvasElement;

    return new Chart(ctx, {
        type: "bar",
        data: {
            labels: countries,
            datasets: [
                {
                    label: "Users by Country",
                    data: users,
                    borderWidth: 2,
                    backgroundColor: "rgba(120, 31, 211, 0.6)",
                    borderColor: "rgba(120, 31, 211, 1)",
                    hoverBackgroundColor: "rgba(120, 31, 211, 1)",
                    borderRadius: 5,
                },
            ],
        },
        options: {
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
    if (barChart.value) {
        const chart = initChart();

        onBeforeUnmount(() => {
            chart.destroy();
        });
    }
});
</script>

<template>
    <div>
        <canvas ref="barChart" style="height: auto"></canvas>
    </div>
</template>
