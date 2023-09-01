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
            <ul class="flex flex-col gap-y-2.5 transition-all">
                <li v-for="(item, index) in list" :key="index">
                    <NuxtLink
                        :to="{
                            name: item.name,
                        }"
                        class="group flex items-center py-3.75 border-cl-purple-light transition-all duration-150"
                        :class="{
                            'bg-gradient-to-b from-cl-purple-to via-cl-purple-to/70 to-cl-purple-to/50 border-r-6':
                                $route.name === item.name,
                            'hover:bg-gradient-to-b from-cl-purple-to via-cl-purple-to/70 to-cl-purple-to/50':
                                $route.name !== item.name,
                            'pl-6.25 gap-x-5': tab === 'analytics',
                            'pl-6.25 gap-x-2.5': tab === 'model',
                        }"
                    >
                        <div class="w-7.5 text-white">
                            <component :is="item.icon"></component>
                        </div>
                        <span class="text-[1.2rem] font-bold text-white">{{ item.label }}</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
