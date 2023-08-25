<!-- eslint-disable import/namespace -->
<script lang="ts" setup>
import * as echarts from "echarts";

const props = defineProps({
    decisionTree: {
        type: Object as PropType<any>,
        required: true,
    },
});

const { decisionTree } = toRefs(props);

onMounted(() => {
    type EChartsOption = echarts.EChartsOption;

    const chartDom = document.getElementById("main")!;
    const myChart = echarts.init(chartDom);
    let option: EChartsOption;

    myChart.showLoading();

    myChart.hideLoading();

    decisionTree.value.children.forEach(function (datum: { collapsed: boolean }, index: number) {
        index % 2 === 0 && (datum.collapsed = true);
    });

    myChart.setOption(
        (option = {
            tooltip: {
                trigger: "item",
                triggerOn: "mousemove",
            },
            series: [
                {
                    type: "tree",

                    data: [decisionTree.value],

                    top: "1%",
                    left: "20%",
                    bottom: "1%",
                    right: "20%",

                    symbolSize: 14,

                    label: {
                        position: "left",
                        verticalAlign: "middle",
                        align: "right",
                        fontSize: "1rem",
                    },

                    leaves: {
                        label: {
                            position: "right",
                            verticalAlign: "middle",
                            align: "left",
                        },
                    },

                    emphasis: {
                        focus: "descendant",
                    },

                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750,
                },
            ],
        })
    );

    option && myChart.setOption(option);
});
</script>

<template>
    <div class="flex flex-col justify-center gap-y-5 h-full border rounded-[20px]">
        <h2
            class="px-10 py-10 text-[2rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
        >
            Decision Tree
        </h2>
        <div id="main" class="w-full h-full"></div>
    </div>
</template>
