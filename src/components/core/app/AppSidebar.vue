<script lang="ts" setup>
import { ChevronUpIcon } from "@heroicons/vue/20/solid";
import BaseDropdown from "@/components/core/base/BaseDropdown.vue";

defineOptions({
    name: "AppSidebar",
});

defineProps({
    list: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
    tab: {
        type: String as PropType<"model" | "analytics" | "documentation">,
        default: "analytics",
    },
});
</script>

<template>
    <div class="w-full">
        <div class="h-full flex flex-col gap-y-7.5">
            <div class="max-w-38 mx-auto w-full py-7.5">
                <NuxtLink to="/" class="w-full h-full">
                    <img src="@/assets/img/datacorda-logo.png" alt="" />
                </NuxtLink>
            </div>
            <ul class="flex flex-col gap-y-2.5 transition-all">
                <li v-for="(item, index) in list" :key="index">
                    <BaseDropdown
                        :is-open="$route.name === item.name"
                        :has-children="!!item.children"
                    >
                        <template #link>
                            <NuxtLink
                                :to="{
                                    name: item.name,
                                }"
                                class="group flex items-center py-3.75 px-2.5 border-cl-purple-light transition-all duration-150"
                                :class="{
                                    'bg-gradient-to-b from-cl-purple-to via-cl-purple-to/70 to-cl-purple-to/50 border-r-6':
                                        $route.name === item.name,
                                    'hover:bg-gradient-to-b from-cl-purple-to via-cl-purple-to/70 to-cl-purple-to/50':
                                        $route.name !== item.name,
                                    'pl-6.25': tab === 'analytics',
                                    'pl-6.25 gap-x-2.5': tab === 'model',
                                }"
                            >
                                <div class="flex items-center w-full">
                                    <div class="w-7.5 text-white">
                                        <component :is="item.icon"></component>
                                    </div>
                                    <div
                                        class="leading-[1.2] text-[1.2rem] text-left font-bold text-white"
                                    >
                                        {{ item.label }}
                                    </div>
                                    <div class="ml-auto">
                                        <ChevronUpIcon
                                            :class="open ? 'rotate-180 transform' : ''"
                                            class="h-5 w-5 text-purple-500"
                                        />
                                    </div>
                                </div>
                            </NuxtLink>
                        </template>
                        <template #elements>
                            <div v-for="(child, idx) in item.children" :key="idx">
                                <NuxtLink
                                    :to="{
                                        name: item.name,
                                        hash: child.hash,
                                    }"
                                    class="group flex items-center py-3.75 px-2.5 border-cl-purple-light transition-all duration-150"
                                    :class="{
                                        'bg-gradient-to-b from-cl-purple-to via-cl-purple-to/70 to-cl-purple-to/50 border-r-6':
                                            $route.hash === child.hash,
                                        'hover:bg-gradient-to-b from-cl-purple-to via-cl-purple-to/70 to-cl-purple-to/50':
                                            $route.hash !== item.hash,
                                        'pl-6.25 gap-x-5': tab === 'analytics',
                                        'pl-6.25 gap-x-2.5': tab === 'model',
                                    }"
                                >
                                    <span class="text-[1rem] font-bold text-white">{{
                                        child.label
                                    }}</span>
                                </NuxtLink>
                            </div>
                        </template>
                    </BaseDropdown>
                </li>
            </ul>
        </div>
    </div>
</template>
