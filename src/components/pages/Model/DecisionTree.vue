<template>
    <div ref="chart"></div>
</template>

<script>
import * as d3 from "d3";

export default {
    mounted() {
        this.drawChart();
    },
    methods: {
        drawChart() {
            const chartContainer = d3.select(this.$refs.chart);

            // Define the decision tree data
            const treeData = {
                name: "UnlockedFactory < 1",
                children: [
                    {
                        name: "GameIntroSkip < 1",
                        children: [{ name: "Retain" }, { name: "Churn" }],
                    },
                    {
                        name: "UserEngagement < 17",
                        children: [
                            { name: "Churn" },
                            {
                                name: "UnlockedFactory < 2",
                                children: [
                                    { name: "Churn" },
                                    {
                                        name: "UserEngagement < 19",
                                        children: [{ name: "Churn" }, { name: "Retain" }],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };

            // Create a new hierarchy from the tree data
            const root = d3.hierarchy(treeData);

            const margin = { top: 20, right: 200, bottom: 20, left: 200 };
            const width = 960 + margin.right - margin.left;
            const height = 500 - margin.top - margin.bottom;
            let i = 0;

            const tree = d3.tree().size([height, width]);

            const diagonal = d3
                .linkHorizontal()
                .x((d) => d.y)
                .y((d) => d.x);

            const svg = chartContainer
                .append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            root.x0 = height / 2;
            root.y0 = 0;

            update(root);

            function update(source) {
                // Compute the new tree layout.
                const treeData = tree(root);

                const nodes = treeData.descendants();
                const links = treeData.links();

                // Normalize for fixed-depth.
                nodes.forEach((d) => {
                    d.y = d.depth * 180;
                });

                // Declare the nodes...
                const node = svg.selectAll("g.node").data(nodes, (d) => d.id || (d.id = ++i));

                // Enter the nodes.
                const nodeEnter = node
                    .enter()
                    .append("g")
                    .attr("class", "node")
                    .attr("transform", () => `translate(${source.y0},${source.x0})`)
                    .on("click", click);

                nodeEnter.append("circle").attr("r", 10).style("fill", "#fff");

                nodeEnter
                    .append("text")
                    .attr("x", (d) => (d.children || d._children ? -13 : 13))
                    .attr("dy", ".35em")
                    .attr("text-anchor", (d) => (d.children || d._children ? "end" : "start"))
                    .text((d) => d.data.name)
                    .style("fill-opacity", 1);

                // Transition nodes to their new position.
                const nodeUpdate = node
                    .merge(nodeEnter)
                    .transition()
                    .duration(1500)
                    .attr("transform", (d) => `translate(${d.y},${d.x})`);

                nodeUpdate.select("circle").attr("r", 7).style("fill", "steelblue");

                nodeUpdate.select("text").style("fill-opacity", 1);

                // Transition exiting nodes to the parent's new position.
                const nodeExit = node
                    .exit()
                    .transition()
                    .duration(1500)
                    .attr("transform", () => `translate(${source.y},${source.x})`)
                    .remove();

                nodeExit.select("circle").attr("r", 1e-6);

                nodeExit.select("text").style("fill-opacity", 1e-6);

                // Update the links...
                const link = svg.selectAll("path.link").data(links, (d) => d.target.id);

                // Enter the links.
                link.enter()
                    .insert("path", "g")
                    .attr("class", "link")
                    .attr("d", () => {
                        const o = { x: source.x0, y: source.y0 };
                        return diagonal({ source: o, target: o });
                    })
                    .style("fill", "none")
                    .style("stroke", "#ccc")
                    .style("stroke-width", "1.5px")
                    .transition()
                    .duration(1500)
                    .attr("d", diagonal);

                // Transition exiting nodes to the parent's new position.
                link.exit()
                    .transition()
                    .duration(1500)
                    .attr("d", () => {
                        const o = { x: source.x, y: source.y };
                        return diagonal({ source: o, target: o });
                    })
                    .remove();

                // Stash the old positions for transition.
                nodes.forEach((d) => {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }

            // Toggle children on click.
            function click(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }
        },
    },
};
</script>
