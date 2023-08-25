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

defineEmits(["select", "delete"]);
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
                    <div
                        v-for="(item, index) in data"
                        :key="index"
                        class="relative border p-2 transition-colors duration-150"
                        :class="{
                            'bg-cl-main': currentId === item.id,
                        }"
                    >
                        <button class="flex items-center w-full" @click="$emit('select', item.id)">
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

                        <button
                            class="absolute top-1/2 -translate-y-1/2 right-0 w-8.5 text-red-500"
                            @click="$emit('delete', index)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 37" fill="none">
                                <path
                                    d="M9.99992 29.2917C9.99992 30.9875 11.4999 32.375 13.3333 32.375H26.6666C28.4999 32.375 29.9999 30.9875 29.9999 29.2917V13.875C29.9999 12.1792 28.4999 10.7917 26.6666 10.7917H13.3333C11.4999 10.7917 9.99992 12.1792 9.99992 13.875V29.2917ZM29.9999 6.16667H25.8333L24.6499 5.07208C24.3499 4.79458 23.9166 4.625 23.4833 4.625H16.5166C16.0833 4.625 15.6499 4.79458 15.3499 5.07208L14.1666 6.16667H9.99992C9.08325 6.16667 8.33325 6.86042 8.33325 7.70833C8.33325 8.55625 9.08325 9.25 9.99992 9.25H29.9999C30.9166 9.25 31.6666 8.55625 31.6666 7.70833C31.6666 6.86042 30.9166 6.16667 29.9999 6.16667Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
