<script lang="ts" setup>
defineProps({
    data: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
    currentId: {
        type: String,
        default: "",
    },
});

defineEmits(["select"]);
</script>

<template>
    <div class="w-full">
        <div class="flex flex-col w-full h-full">
            <div class="flex items-center rounded-t-[10px] border px-10 py-3 bg-cl-main">
                <span class="text-[2rem] text-white">Saved Results</span>
            </div>
            <div
                class="flex flex-col gap-y-2.5 border-l border-r border-b rounded-b-[10px] h-full overflow-hidden p-6"
            >
                <div class="flex items-center">
                    <div class="flex items-center justify-center w-1/3">
                        <span
                            class="text-[1.2rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                            >Segment Name</span
                        >
                    </div>
                    <div class="flex items-center justify-center w-1/3">
                        <span
                            class="text-[1.2rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                            >Number of Segments</span
                        >
                    </div>
                    <div class="flex items-center justify-center w-1/3">
                        <span
                            class="text-[1.2rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main"
                            >Model</span
                        >
                    </div>
                </div>

                <div class="flex flex-col gap-y-2.5 h-[13rem] overflow-auto">
                    <button
                        v-for="(item, index) in data"
                        :key="index"
                        class="flex items-center border p-2 transition-colors duration-150"
                        :class="{
                            'bg-cl-main': currentId === item.id,
                        }"
                        @click="$emit('select', item.id)"
                    >
                        <div class="flex items-center justify-center w-1/3">
                            <span
                                class="text-[1.2rem] transition-colors duration-150"
                                :class="{
                                    'text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main':
                                        currentId !== item.id,
                                    'text-white': currentId === item.id,
                                }"
                                >{{ item.segmentation_name }}</span
                            >
                        </div>
                        <div class="flex items-center justify-center w-1/3">
                            <span
                                class="text-[1.2rem]"
                                :class="{
                                    'text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main':
                                        currentId !== item.id,
                                    'text-white': currentId === item.id,
                                }"
                                >{{ item.size }}</span
                            >
                        </div>
                        <div class="flex items-center justify-center w-1/3">
                            <span
                                class="text-[1.2rem]"
                                :class="{
                                    'text-transparent bg-clip-text bg-gradient-to-t from-cl-purple to-cl-main':
                                        currentId !== item.id,
                                    'text-white': currentId === item.id,
                                }"
                                >{{ item.model }}</span
                            >
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
