<script lang="ts" setup>
import { Chart } from "chart.js/auto";

import data from "@/chart_data_test/daily_active_users-line_chart.json";

defineOptions({
    name: "DailyChart",
});

onMounted(() => {
    const sortedData = data.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
    const latestData = sortedData.slice(-30); // Take the last 30 observations

    const dates = latestData.map((entry) => entry.date);
    const users = latestData.map((entry) => +entry.daily_active_users);

    const canvas = document.getElementById("lineChart_DAU") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const colors = {
        purple: {
            default: "rgba(120, 31, 211, 1)",
            half: "rgba(120, 31, 211, 0.9)",
            quarter: "rgba(120, 31, 211, 0.7)",
            zero: "rgba(120, 31, 211, 0.3)",
        },
    };

    const gradient = ctx.createLinearGradient(0, 25, 0, 300);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.35, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Daily Active Users (DAU)",
                    data: users,
                    // backgroundColor: 'rgba(120, 31, 211, 0.5)',
                    borderColor: "rgba(120, 31, 211, 0)",
                    backgroundColor: gradient,
                    borderWidth: 1.5,
                    fill: true,
                    pointStyle: "circle",
                    pointRadius: 0,
                    pointHoverRadius: 7,
                    tension: 0.4,
                },
            ],
        },
        options: {
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
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
        },
    });

    onBeforeUnmount(() => {
        chart.destroy();
    });
});
</script>

<template>
    <div>
        <canvas id="lineChart_DAU" style="height: auto"></canvas>
    </div>
</template>
