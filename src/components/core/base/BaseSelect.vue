<script lang="ts" setup>
import { ChevronDownIcon, CheckIcon } from "@heroicons/vue/24/outline";

defineProps({
    placeholder: {
        type: String,
        default: "",
    },
});

const selectedPerson = ref<null | { id: number; name: string }>(null);

const people = ref([
    {
        id: 1,
        name: "Alex",
    },
    {
        id: 1,
        name: "John",
    },
    {
        id: 1,
        name: "John",
    },
]);
</script>

<template>
    <div>
        <HeadlessListbox v-model="selectedPerson">
            <div class="relative mt-1">
                <HeadlessListboxButton
                    class="relative w-full shadow-c-select rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-cl-main sm:text-sm"
                    style=""
                >
                    <span
                        v-if="selectedPerson"
                        class="flex justify-center text-size_20/16 text-cl-main font-bold"
                        >{{ selectedPerson.name }}</span
                    >
                    <span
                        v-else
                        class="flex justify-center text-size_20/16 text-cl-main font-bold"
                        >{{ placeholder }}</span
                    >
                    <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
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
                        class="absolute mt-1 max-h-60 divide-y px-4 z-[9999] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                        <HeadlessListboxOption
                            v-for="(person, index) in people"
                            v-slot="{ active, selected }"
                            :key="index"
                            :value="person"
                        >
                            <li
                                :class="[
                                    active ? 'bg-cl-main/80 text-white' : 'text-cl-main',
                                    'relative cursor-default select-none py-4 pl-10 pr-4 transition-colors duration-150',
                                ]"
                            >
                                <span
                                    :class="[
                                        selected ? 'font-medium' : 'font-normal',
                                        'block truncate text-size_18/16',
                                    ]"
                                    >{{ person.name }}</span
                                >
                                <span
                                    v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 transition-colors duration-150"
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
