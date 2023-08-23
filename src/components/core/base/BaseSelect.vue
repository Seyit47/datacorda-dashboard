<script lang="ts" setup>
import { ChevronDownIcon, CheckIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    modelValue: {
        type: [String, null] as PropType<any>,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    list: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
    itemName: {
        type: Function,
        default: (item: any) => item,
    },
    itemValue: {
        type: Function,
        default: (item: any) => item,
    },
    initItemName: {
        type: Function,
        default: (item: any) => item,
    },
    initItemValue: {
        type: Function,
        default: (item: any) => item,
    },
    size: {
        type: String,
        default: "md",
    },
});

const { itemName, itemValue, initItemName, initItemValue, modelValue, list } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const localValue = ref(null);

const localName = ref("");

function onInit() {
    if (!localValue.value && modelValue.value) {
        const item = list.value.reduce((acc, curValue) => {
            if (initItemValue.value(curValue) === modelValue.value) {
                return curValue;
            }
            return acc;
        }, null);
        if (!item) {
            return;
        }
        localName.value = initItemName.value(item);
        localValue.value = item;
    }
}

function onUpdate(item: any) {
    localName.value = itemName.value(item);
    emit("update:modelValue", itemValue.value(item));
}

onInit();
</script>

<template>
    <div>
        <HeadlessListbox v-model="localValue" @update:model-value="onUpdate">
            <div class="relative mt-1">
                <HeadlessListboxButton
                    class="relative w-full shadow-c-select bg-white pl-3 pr-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-cl-main sm:text-sm"
                    :class="{
                        'py-2 rounded-full': size === 'md',
                        'py-3 rounded-[7px]': size === 'lg',
                    }"
                >
                    <span
                        v-if="localName"
                        class="flex justify-center text-size_base text-cl-main font-bold"
                        >{{ localName }}</span
                    >
                    <span
                        v-else
                        class="flex justify-center text-size_base text-cl-main font-bold"
                        >{{ placeholder }}</span
                    >
                    <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.75"
                    >
                        <ChevronDownIcon class="h-5 w-5 text-cl-main" aria-hidden="true" />
                    </span>
                </HeadlessListboxButton>

                <Transition
                    leave-active-class="transition-opacity duration-150"
                    enter-active-class="transition-opacity duration-150"
                    enter-from-class="opacity-0"
                    leave-to-class="opacity-0"
                >
                    <HeadlessListboxOptions
                        class="absolute mt-1 max-h-60 divide-y z-[9999] w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                        <HeadlessListboxOption
                            v-for="(item, index) in list"
                            v-slot="{ active, selected }"
                            :key="index"
                            :value="item"
                        >
                            <li
                                :class="[
                                    active ? 'bg-cl-main/80 text-white' : 'text-cl-main',
                                    'relative flex items-center cursor-default select-none py-4 px-9 transition-colors duration-150',
                                ]"
                            >
                                <span
                                    :class="[
                                        selected ? 'font-medium' : 'font-normal',
                                        'block truncate text-size_base',
                                    ]"
                                    >{{ itemName(item) }}</span
                                >
                                <span
                                    v-if="selected"
                                    class="absolute left-0 inset-y-0 flex items-center pl-2.5 transition-colors duration-150"
                                    :class="[active ? 'text-white' : 'text-cl-main']"
                                >
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </HeadlessListboxOption>
                    </HeadlessListboxOptions>
                </Transition>
            </div>
        </HeadlessListbox>
    </div>
</template>
