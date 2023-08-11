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
});

const emit = defineEmits(["update:modelValue"]);

const localValue = useSyncProps<string>(props, "modelValue", emit);
</script>

<template>
    <div>
        <VueDatePicker
            v-model="localValue"
            placeholder="Start date"
            :auto-apply="true"
            :max-date="`${new Date()}`"
            model-type="format"
            format="yyyy-MM-dd"
            :enable-time-picker="false"
            position="right"
        >
            <template #trigger>
                <button
                    class="relative w-full shadow-c-select rounded-full bg-white py-2 pl-3 pr-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-cl-main sm:text-sm"
                >
                    <span
                        v-if="localValue"
                        class="flex justify-center text-size_base text-cl-main font-semibold"
                        >{{ localValue }}</span
                    >
                    <span
                        v-else
                        class="flex justify-center text-size_base text-cl-main font-semibold"
                        >{{ placeholder }}</span
                    >
                    <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.75"
                    >
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
</style>
