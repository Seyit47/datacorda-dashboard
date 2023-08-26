<script lang="ts" setup>
import * as d3 from "d3";
import { useGameStore } from "@/store/game";

const gameStore = useGameStore();
const { isAnalyticsReady } = gameStore;

const props = defineProps({
    data: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
});

const { data } = toRefs(props);

const margin = { top: 30, right: 30, bottom: 30, left: 50 };

onMounted(() => {
    if (!isAnalyticsReady) {
        return;
    }
    const width = parseInt(d3.select("#dataviz").style("width")) - margin.left - margin.right;
    const height = parseInt(d3.select("#dataviz").style("height")) - margin.top - margin.bottom;
    // append the svg object to the body of the page
    const svg = d3
        .select("#dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // get the data
    // add the x Axis
    const x = d3.scaleLinear().domain([-10, 15]).range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    const y = d3.scaleLinear().range([height, 0]).domain([0, 0.12]);
    svg.append("g").call(d3.axisLeft(y));

    // Compute kernel density estimation
    const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(60));
    const density1 = kde(
        data.value
            .filter(function (d: any) {
                return d.target === 0;
            })
            .map(function (d: any) {
                return d.feature;
            })
    );
    const density2 = kde(
        data.value
            .filter(function (d: any) {
                return d.target === 1;
            })
            .map(function (d: any) {
                return d.feature;
            })
    );

    // Plot the area
    svg.append("path")
        .attr("class", "mypath")
        .datum(density1)
        .attr("fill", "#F19191")
        .attr("opacity", ".6")
        .attr("stroke", "#FF4C00")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr(
            "d",
            d3
                .line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x(d[0]);
                })
                .y(function (d) {
                    return y(d[1]);
                })
        );

    // Plot the area
    svg.append("path")
        .attr("class", "mypath")
        .datum(density2)
        .attr("fill", "#B6F1B8")
        .attr("opacity", ".6")
        .attr("stroke", "#2EC52B")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr(
            "d",
            d3
                .line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x(d[0]);
                })
                .y(function (d) {
                    return y(d[1]);
                })
        );

    // Handmade legend
    svg.append("circle")
        .attr("cx", width - margin.left - margin.right - 10)
        .attr("cy", margin.top)
        .attr("r", 6)
        .style("fill", "#F19191");
    svg.append("circle")
        .attr("cx", width - margin.left - margin.right - 10)
        .attr("cy", margin.top + margin.bottom)
        .attr("r", 6)
        .style("fill", "#B6F1B8");
    svg.append("text")
        .attr("x", width - margin.left - margin.right)
        .attr("y", margin.top)
        .text("Churn")
        .style("font-size", "0.938rem")
        .attr("alignment-baseline", "middle");
    svg.append("text")
        .attr("x", width - margin.left - margin.right)
        .attr("y", margin.top + margin.bottom)
        .text("Retain")
        .style("font-size", "0.938rem")
        .attr("alignment-baseline", "middle");
});

// Function to compute density
function kernelDensityEstimator(kernel: any, X: any) {
    return function (V: any) {
        return X.map(function (x: any) {
            return [
                x,
                d3.mean(V, function (v: any) {
                    return kernel(x - v);
                }),
            ];
        });
    };
}
function kernelEpanechnikov(k: number) {
    return function (v: number) {
        return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
    };
}
</script>

<template>
    <div>
        <div v-if="isAnalyticsReady" id="dataviz" class="aspect-[16/9]"></div>
        <div
            v-else
            class="flex justify-center items-center aspect-[16/9] w-full h-full text-[1.5rem] text-cl-main"
        >
            No data
        </div>
    </div>
</template>
