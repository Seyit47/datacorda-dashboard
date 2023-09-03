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
    if (!isAnalyticsReady || data.value.length === 0) {
        return;
    }
    const width = parseInt(d3.select("#my_dataviz").style("width")) - margin.left - margin.right;
    const height = parseInt(d3.select("#my_dataviz").style("height")) - margin.top - margin.bottom;
    // append the svg object to the body of the page
    const svg = d3
        .select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const groupNames = Array.from(
        new Set(
            data.value.map((item) => {
                return item.feature;
            })
        )
    );

    const subgroupData = [];

    for (let i = 0; i < groupNames.length; i++) {
        const d = {
            name: groupNames[i],
            retain: 0,
            churn: 0,
        };
        for (let j = 0; j < data.value.length; j++) {
            if (groupNames[i] === data.value[j].feature) {
                if (data.value[j].target === 1) {
                    d.retain += 1;
                }
                if (data.value[j].target === 0) {
                    d.churn += 1;
                }
            }
        }
        subgroupData.push(d);
    }

    const maxNumber = Math.max(...subgroupData.map((item) => item.churn + item.retain));

    const subgroups = ["retain", "churn"];

    // Add X axis
    const x = d3.scaleBand().domain(groupNames).range([0, width]).padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y = d3
        .scaleLinear()
        .domain([0, maxNumber + 100])
        .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal().domain(subgroups).range(["#35275EEB", "#AD7ED2"]);

    // stack the data? --> stack per subgroup
    const stackedData = d3.stack().keys(subgroups)(subgroupData);

    const tooltip = d3
        .select("#my_dataviz")
        .append("div")
        .style("position", "absolute")
        .style("top", 0)
        .style("left", 0)
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (this: any, _: any, d: any) {
        const subgroupName = (d3.select(this.parentNode).datum() as any).key;
        const subgroupValue = d.data[subgroupName];
        tooltip
            .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
            .style("opacity", 1);
    };
    const mousemove = function (event: any) {
        tooltip
            .style("transform", "translateY(-55%)")
            .style("left", event.x / 2 + "px")
            .style("top", event.y / 2 - 30 + "px");
    };
    const mouseleave = function () {
        tooltip.style("opacity", 0);
    };

    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter()
        .append("g")
        .attr("fill", function (d): any {
            return color(d.key);
        })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function (d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d: any): any {
            return x(d.data.name);
        })
        .attr("y", function (d) {
            return y(d[1]);
        })
        .attr("height", function (d) {
            return y(d[0]) - y(d[1]);
        })
        .attr("width", x.bandwidth())
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    svg.append("circle")
        .attr("cx", width - margin.left - margin.right - 10)
        .attr("cy", margin.top)
        .attr("r", 6)
        .style("fill", "#AD7ED2");
    svg.append("circle")
        .attr("cx", width - margin.left - margin.right - 10)
        .attr("cy", margin.top + margin.bottom)
        .attr("r", 6)
        .style("fill", "#35275EEB");
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
</script>

<template>
    <div>
        <div
            v-if="isAnalyticsReady && data.length > 0"
            id="my_dataviz"
            class="relative aspect-[16/9]"
        ></div>
        <div
            v-else
            class="flex justify-center items-center aspect-[16/9] w-full h-full text-[1.5rem] text-cl-main"
        >
            No data
        </div>
    </div>
</template>
