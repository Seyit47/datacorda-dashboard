<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    itemName: {
        type: Function as PropType<(item: any) => any>,
        default: (item: any) => item,
    },
});

defineOptions({
    inheritAttrs: false,
});

const emit = defineEmits(["update:modelValue"]);

const localValue = useSyncProps<string>(props, "modelValue", emit);
</script>

<template>
    <div class="w-full h-full">
        <VueDatePicker
            v-model="localValue"
            v-bind="$attrs"
            :auto-apply="true"
            :max-date="`${new Date()}`"
            model-type="format"
            format="yyyy-MM-dd"
            :enable-time-picker="false"
            position="right"
        >
            <template #trigger>
                <button
                    class="relative flex items-center w-full shadow-c-select rounded-full bg-white py-2 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-cl-main sm:text-sm"
                >
                    <div class="w-full whitespace-nowrap overflow-auto no-scrollbar">
                        <span
                            v-if="localValue"
                            class="w-full inline-block text-center text-size_base text-cl-main font-semibold"
                            >{{ itemName(localValue) }}</span
                        >
                        <span
                            v-else
                            class="w-full inline-block text-center text-size_base text-cl-main font-semibold"
                            >{{ placeholder }}</span
                        >
                    </div>
                    <span class="pointer-events-none ml-auto">
                        <ChevronDownIcon class="h-5 w-5 text-cl-main" aria-hidden="true" />
                    </span>
                </button>
            </template>
        </VueDatePicker>
    </div>
</template>

<style lang="scss">
.dp__theme_light {
    --dp-primary-color: #7f19d2;
    --dp-highlight-color: rgba(167, 25, 210, 0.1);
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
