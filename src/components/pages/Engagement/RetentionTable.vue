<script lang="ts" setup>
import { format } from "date-fns";

const props = defineProps({
    list: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
});

const { list } = toRefs(props);

const curIndex = ref<number | undefined>();

function getPercentage(partial: number | string, total: number): string {
    const per = (100 * Number(partial)) / total;
    return per.toFixed(2);
}

function getFormattedDate(date: string) {
    return format(new Date(date), "MMM d, yyyy");
}

function onMouseEnter(index: number) {
    curIndex.value = index;
}

function onMouseLeave() {
    curIndex.value = undefined;
}
</script>

<template>
    <table class="w-full border-collapse">
        <thead class="sticky top-0 z-[9999] bg-white">
            <tr class="text-[0.7vw] whitespace-nowrap">
                <th class="px-2.5 py-[0.5vw]">Date</th>
                <th class="px-2.5 py-[0.5vw]">Users</th>
                <th class="px-2.5 py-[0.5vw] font-normal">Day 1</th>
                <th class="px-2.5 py-[0.5vw] font-normal">Day 2</th>
                <th class="px-2.5 py-[0.5vw] font-normal">Day 3</th>
                <th class="px-2.5 py-[0.5vw] font-normal">Day 4</th>
                <th class="px-2.5 py-[0.5vw] font-normal">Day 5</th>
                <th class="px-2.5 py-[0.5vw] font-normal">Day 6</th>
                <th class="px-2.5 py-[0.5vw] font-normal">Day 7</th>
                <th class="px-2.5 py-[0.5vw] font-normal">Day 14</th>
                <th class="px-2.5 py-[0.5vw] font-normal">Day 30</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(item, index) in list"
                :key="index"
                class="text-center divide-x-2 divide-white divide-y-2 whitespace-nowrap text-[0.7vw]"
            >
                <td
                    class="px-2.5 py-[0.3vw] cursor-default font-semibold"
                    @mouseenter="onMouseEnter(index)"
                    @mouseleave="onMouseLeave"
                >
                    {{ getFormattedDate(item.date) }}
                </td>
                <td
                    class="px-2.5 whitespace-nowrap font-medium"
                    :class="{
                        'opacity-20': curIndex !== undefined && curIndex !== index,
                    }"
                >
                    {{ item["D0"] }}
                </td>
                <td
                    class="px-2.5"
                    :class="{
                        'opacity-20': curIndex !== undefined && curIndex !== index,
                    }"
                    :style="`background-color: rgba(3, 255, 24, ${item['D1']})`"
                >
                    <span v-show="item['D1'] !== 0"
                        >{{ getPercentage(Number(item["D1"]), 1) }}%</span
                    >
                </td>
                <td
                    class="px-2.5"
                    :class="{
                        'opacity-20': curIndex !== undefined && curIndex !== index,
                    }"
                    :style="`background-color: rgba(3, 255, 24, ${item['D2']})`"
                >
                    <span v-show="item['D2'] !== 0"
                        >{{ getPercentage(Number(item["D2"]), 1) }}%</span
                    >
                </td>
                <td
                    class="px-2.5"
                    :class="{
                        'opacity-20': curIndex !== undefined && curIndex !== index,
                    }"
                    :style="`background-color: rgba(3, 255, 24, ${item['D3']})`"
                >
                    <span v-show="item['D3'] !== 0">
                        {{ getPercentage(Number(item["D3"]), 1) }}%
                    </span>
                </td>
                <td
                    class="px-2.5"
                    :class="{
                        'opacity-20': curIndex !== undefined && curIndex !== index,
                    }"
                    :style="`background-color: rgba(3, 255, 24, ${item['D4']})`"
                >
                    <span v-show="item['D4'] !== 0">
                        {{ getPercentage(Number(item["D4"]), 1) }}%
                    </span>
                </td>
                <td
                    class="px-2.5"
                    :class="{
                        'opacity-20': curIndex !== undefined && curIndex !== index,
                    }"
                    :style="`background-color: rgba(3, 255, 24, ${item['D5']})`"
                >
                    <span v-show="item['D5'] !== 0">
                        {{ getPercentage(Number(item["D5"]), 1) }}%
                    </span>
                </td>
                <td
                    class="px-2.5"
                    :class="{
                        'opacity-20': curIndex !== undefined && curIndex !== index,
                    }"
                    :style="`background-color: rgba(3, 255, 24, ${item['D6']})`"
                >
                    <span v-show="item['D6'] !== 0">
                        {{ getPercentage(Number(item["D6"]), 1) }}%
                    </span>
                </td>
                <td
                    class="px-2.5"
                    :class="{
                        'opacity-20': curIndex !== undefined && curIndex !== index,
                    }"
                    :style="`background-color: rgba(3, 255, 24, ${item['D7']})`"
                >
                    <span v-show="item['D7'] !== 0">
                        {{ getPercentage(Number(item["D7"]), 1) }}%
                    </span>
                </td>
                <td
                    class="px-2.5"
                    :class="{
                        'opacity-20': curIndex !== undefined && curIndex !== index,
                    }"
                    :style="`background-color: rgba(3, 255, 24, ${item['D14']})`"
                >
                    <span
                        v-show="item['D14'] !== 0"
                        :class="{
                            'select-none opacity-0': item['D14'] === 0,
                        }"
                    >
                        {{ getPercentage(Number(item["D14"]), 1) }}%
                    </span>
                </td>
                <td
                    class="px-2.5"
                    :class="{
                        'opacity-20': curIndex !== undefined && curIndex !== index,
                    }"
                    :style="`background-color: rgba(3, 255, 24, ${item['D30']})`"
                >
                    <span
                        v-show="item['D30'] !== 0"
                        :class="{
                            'select-none opacity-0': item['D30'] === 0,
                        }"
                    >
                        {{ getPercentage(Number(item["D30"]), 1) }}%
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>
