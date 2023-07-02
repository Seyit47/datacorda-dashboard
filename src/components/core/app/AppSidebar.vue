<script lang="ts" setup>
import IconLogout from "@/components/icons/IconLogout.vue";

defineOptions({
    name: "AppSidebar",
});

defineProps({
    list: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
});
</script>

<template>
    <div class="w-full">
        <div class="h-full flex flex-col gap-y-3.75">
            <div class="flex items-center justify-center py-3.75">
                <NuxtLink to="/" class="w-54 px-2.5 py-4">
                    <img src="@/assets/img/datacorda-logo.png" alt="" />
                </NuxtLink>
            </div>
            <ul class="flex flex-col gap-y-2.5 px-5 transition-all">
                <li v-for="(item, index) in list" :key="index">
                    <NuxtLink
                        :to="{
                            name: item.name,
                        }"
                        class="group flex items-center gap-x-3.75 rounded-xl py-3.75 px-3.75 transition-colors duration-150"
                        :class="{
                            'text-cl-main bg-white': $route.name === item.name,
                            'text-white hover:bg-white hover:text-cl-main':
                                $route.name !== item.name,
                        }"
                    >
                        <div class="w-8.75">
                            <component :is="item.icon"></component>
                        </div>
                        <span class="text-size_20/16">{{ item.label }}</span>
                    </NuxtLink>
                </li>
            </ul>

            <div class="mt-auto px-6 pb-6">
                <NuxtLink
                    to="/"
                    class="group flex items-center gap-x-3.75 hover:bg-white rounded-xl py-3.75 px-3.75 transition-colors duration-150"
                >
                    <div
                        class="w-8.75 text-white group-hover:text-cl-main transition-colors duration-150"
                    >
                        <IconLogout />
                    </div>
                    <span
                        class="text-size_20/16 text-white group-hover:text-cl-main transition-colors duration-150"
                        >Logout</span
                    >
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
