<script lang="ts" setup>
defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    modelValue: {
        type: [String, Number, null] as PropType<string | number | null>,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    errors: {
        type: [String, Boolean],
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    noError: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue"]);

const localValue = useSyncProps(props, "modelValue", emit);

const inputEl = ref<HTMLInputElement | null>(null);

const prependEl = ref<HTMLElement | null>(null);
const appendEl = ref<HTMLElement | null>(null);

const padLeft = ref("");
const padRight = ref("");

onMounted(() => {
    evaluatePaddings();
});

onUpdated(() => {
    evaluatePaddings();
});

function focus() {
    if (inputEl.value) {
        inputEl.value.focus();
    }
}

function evaluatePaddings() {
    if (prependEl.value) {
        const w = prependEl.value.clientWidth;
        padLeft.value = w > 0 ? `${prependEl.value.clientWidth}px` : "3.5rem";
    }
    if (appendEl.value) {
        const w = appendEl.value.clientWidth;
        padRight.value = w > 0 ? `${appendEl.value.clientWidth}px` : "3.5rem";
    }
}
</script>

<template>
    <div
        class="px-1 transition-all"
        :class="{
            'pb-3': !noError && errors,
        }"
    >
        <div class="relative">
            <input
                ref="inputEl"
                v-bind="$attrs"
                v-model="localValue"
                class="relative w-full focus:outline-none bg-cl-default rounded-md text-size_17/16 placeholder:text-size_17/16 py-4.5 px-5"
                :placeholder="placeholder"
                :style="{
                    paddingLeft: padLeft,
                    paddingRight: padRight,
                }"
            />

            <div
                v-if="$slots['prepend']"
                ref="prependEl"
                class="absolute top-0 left-0 h-full"
                @click="focus"
            >
                <slot name="prepend" />
            </div>

            <div
                v-if="$slots['append']"
                ref="appendEl"
                class="absolute top-0 right-0 h-full"
                @click="focus"
            >
                <slot name="append" />
            </div>

            <template v-if="!noError">
                <Transition name="error">
                    <span
                        v-if="errors"
                        class="w-[calc(100%-0.1rem)] absolute top-[calc(100%+0.3rem)] left-[0.05rem] font-medium text-size_14/16 leading-[1.3] text-red-500"
                    >
                        {{ errors }}
                    </span>
                </Transition>
            </template>
        </div>
    </div>
</template>
