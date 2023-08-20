<script setup lang="ts">
import { Chart } from "chart.js/auto";

const props = defineProps({
    data: {
        type: Object as PropType<any>,
        required: true,
    },
});

const { data } = toRefs(props);

const chart = ref<any>(null);

const barChart = ref<HTMLCanvasElement | null>(null);

function initChart() {
    const startSession = data.value.start_session;
    const loadingComplete = data.value.loading_complete;
    const tutorialComplete = data.value.tutorial_complete;
    const sessionMoreThan = data.value.session_more_than_five_min;
    const retain = data.value.retain;
    const funnel = [];

    funnel.push(startSession, loadingComplete, tutorialComplete, sessionMoreThan, retain);

    const ctx = barChart.value as HTMLCanvasElement;

    const canvas = ctx.getContext("2d") as CanvasRenderingContext2D;

    const colors = {
        purple: {
            default: "#35275E",
            zero: "#803693",
        },
    };

    const gradient = canvas.createLinearGradient(0, 0, 600, 0);
    gradient.addColorStop(0, colors.purple.default);
    gradient.addColorStop(1, colors.purple.zero);

    chart.value = new Chart(ctx, {
        type: "line",
        data: {
            labels: funnel,
            datasets: [
                {
                    data: funnel,
                    backgroundColor: gradient,
                    fill: true,
                    pointRadius: 0,
                    pointHoverRadius: 0,
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
                tooltip: {
                    enabled: false,
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
                        display: false,
                    },
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size: window.innerWidth > 1280 ? 8 : 6,
                        },
                        autoSkip: false,
                        display: false,
                    },
                    grid: {
                        drawOnChartArea: false,
                        drawTicks: false,
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

function numberToFixed(value: number, point: number) {
    return value.toFixed(point);
}
</script>

<template>
    <div class="flex flex-col justify-center gap-y-2.5 border rounded-[20px] shadow-lg px-6 py-4">
        <h2
            class="text-[1.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
        >
            Retain 1 Funnel
        </h2>
        <div class="relative w-full h-full border">
            <canvas ref="barChart" v-bind="$attrs" style="height: 90%; width: 100%"></canvas>
            <div class="absolute top-0 left-0 w-full h-full">
                <div class="grid grid-cols-5 divide-x h-full pt-1">
                    <div class="flex flex-col items-center">
                        <h2
                            class="text-size_14/16 font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >
                            First Open
                        </h2>
                        <div class="flex flex-col items-center gap-y-1 mt-auto mb-2.5">
                            <span class="leading-none text-size_28/16 text-white font-bold">
                                {{ data.start_session }}
                            </span>
                            <span class="leading-none text-size_20/16 text-white">
                                {{ numberToFixed(data.start_session_percentage, 1) }}%
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <h2
                            class="text-size_14/16 font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >
                            Loading Complete
                        </h2>
                        <div class="flex flex-col items-center gap-y-1 mt-auto mb-2.5">
                            <span class="leading-none text-size_28/16 text-white font-bold">
                                {{ data.loading_complete }}
                            </span>
                            <span class="leading-none text-size_20/16 text-white">
                                {{ numberToFixed(data.loading_complete_percentage, 1) }}%
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <h2
                            class="text-size_14/16 font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >
                            First Session
                        </h2>
                        <div class="flex flex-col items-center gap-y-1 mt-auto mb-2.5">
                            <span class="leading-none text-size_28/16 text-white font-bold">
                                {{ data.tutorial_complete }}
                            </span>
                            <span class="leading-none text-size_20/16 text-white">
                                {{ numberToFixed(data.tutorial_complete_percentage, 1) }}%
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <h2
                            class="text-size_14/16 font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >
                            Second Session
                        </h2>
                        <div class="flex flex-col items-center gap-y-1 mt-auto mb-2.5">
                            <span class="leading-none text-size_28/16 text-white font-bold">
                                {{ data.session_more_than_five_min }}
                            </span>
                            <span class="leading-none text-size_20/16 text-white">
                                {{ numberToFixed(data.session_more_than_five_min_percentage, 1) }}%
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <span
                            class="text-size_14/16 font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                        >
                            Retain 1
                        </span>
                        <div class="flex flex-col items-center gap-y-1 mt-auto mb-2.5">
                            <span class="leading-none text-size_28/16 text-white font-bold">
                                {{ data.retain }}
                            </span>
                            <span class="leading-none text-size_20/16 text-white">
                                {{ numberToFixed(data.retain_percentage, 1) }}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
