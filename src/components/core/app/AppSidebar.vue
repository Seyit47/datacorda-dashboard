<script lang="ts" setup>
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
            <ul class="flex flex-col gap-y-2.5">
                <li v-for="(item, index) in list" :key="index">
                    <NuxtLink
                        :to="{
                            name: item.name,
                        }"
                        class="group flex items-center py-3.75 px-2.5 pl-6.25 border-cl-purple-light transition-all duration-150"
                        :class="{
                            'bg-gradient-to-b from-cl-purple-to via-cl-purple-to/70 to-cl-purple-to/50 border-r-6':
                                $route.name === item.name,
                            'hover:bg-gradient-to-b from-cl-purple-to via-cl-purple-to/70 to-cl-purple-to/50':
                                $route.name !== item.name,
                        }"
                    >
                        <div class="flex items-center gap-x-5 w-full">
                            <div class="w-9.25 text-white">
                                <component :is="item.icon"></component>
                            </div>
                            <span
                                class="w-full leading-[1.2] text-[1.2rem] text-left font-bold text-white"
                            >
                                {{ item.label }}
                            </span>
                        </div>
                    </NuxtLink>
                    <Transition
                        enter-from-class="opacity-0 -translate-y-[10%]"
                        enter-active-class="transition duration-300"
                        leave-to-class="opacity-0 -translate-y-[10%]"
                        leave-active-class="transition duration-300"
                    >
                        <div v-show="$route.name === item.name">
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
                        </div>
                    </Transition>
                </li>
            </ul>
        </div>
    </div>
</template>
