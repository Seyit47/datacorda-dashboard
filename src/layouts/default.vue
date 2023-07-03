<script lang="ts" setup>
import AppSidebar from "@/components/core/app/AppSidebar.vue";
import IconAnalytics from "~/components/icons/IconAnalytics.vue";
import IconModel from "~/components/icons/IconModel.vue";

const line = ref<HTMLElement | null>(null);

const navbarEl1 = ref<HTMLElement | null>(null);
const navbarEl2 = ref<HTMLElement | null>(null);

const route = useRoute();

function initLine(el: HTMLElement) {
    const width = el.clientWidth;
    const left = el.offsetLeft;
    const lineEl = line.value as HTMLElement;
    lineEl.style.left = `${left}px`;
    lineEl.style.width = `${width}px`;
}

onMounted(() => {
    moveLine();
});

const navbarList = computed(() => {
    return [
        {
            label: "Daily",
            icon: defineAsyncComponent(() => import("@/components/icons/IconDaily.vue")),
            name: "analytics",
        },
        {
            label: "Dashboard",
            icon: defineAsyncComponent(() => import("@/components/icons/IconDashboard.vue")),
            name: "analytics-dashboard",
        },
        {
            label: "Funnels",
            icon: defineAsyncComponent(() => import("@/components/icons/IconFunnel.vue")),
            name: "",
        },
        {
            label: "Level-flow",
            icon: defineAsyncComponent(() => import("@/components/icons/IconLevelFlow.vue")),
            name: "",
        },
        {
            label: "xyz",
            icon: defineAsyncComponent(() => import("@/components/icons/IconDaily.vue")),
            name: "",
        },
        {
            label: "qwerty",
            icon: defineAsyncComponent(() => import("@/components/icons/IconDashboard.vue")),
            name: "",
        },
    ];
});

function moveLine() {
    if (route.path.includes("analytics")) {
        if (navbarEl1.value && line.value) {
            initLine(navbarEl1.value);
        }
    }
    if (route.path.includes("model")) {
        if (navbarEl2.value && line.value) {
            initLine(navbarEl2.value);
        }
    }
}

watch(route, () => {
    moveLine();
});
</script>

<template>
    <div class="relative min-h-screen w-full bg-cl-main">
        <div class="grid grid-cols-[repeat(15,minmax(0,1fr))]">
            <div class="col-span-2 relative">
                <AppSidebar class="sticky top-0 left-0 h-screen" :list="navbarList" />
            </div>
            <div style="grid-column: span 13 / span 13">
                <div class="relative min-h-screen bg-white">
                    <div class="flex items-center shadow-lg px-6">
                        <div class="relative flex items-center gap-x-3.75 py-2.5">
                            <div ref="navbarEl1">
                                <NuxtLink
                                    :to="{
                                        name: 'analytics',
                                    }"
                                    class="group flex items-center gap-x-2.5 px-6 py-3.75 rounded-xl"
                                    :class="{
                                        'hover:bg-cl-main': !$route.path.includes('analytics'),
                                    }"
                                >
                                    <div
                                        class="w-8.5 transition-colors duration-150"
                                        :class="{
                                            'text-cl-main group-hover:text-white':
                                                !$route.path.includes('analytics'),
                                            'text-cl-blue': $route.path.includes('analytics'),
                                        }"
                                    >
                                        <IconAnalytics />
                                    </div>
                                    <span
                                        class="text-size_20/16 font-bold transition-colors duration-150"
                                        :class="{
                                            'text-cl-main group-hover:text-white':
                                                !$route.path.includes('analytics'),
                                            'text-cl-blue': $route.path.includes('analytics'),
                                        }"
                                        >ANALYTICS</span
                                    >
                                </NuxtLink>
                            </div>

                            <div ref="navbarEl2">
                                <NuxtLink
                                    ref="navbarEl2"
                                    :to="{
                                        name: 'model',
                                    }"
                                    class="group flex items-center gap-x-2.5 px-6 py-3.75 rounded-xl"
                                    :class="{
                                        'hover:bg-cl-main': !$route.path.includes('model'),
                                    }"
                                >
                                    <div
                                        class="w-8.5 transition-colors duration-150"
                                        :class="{
                                            'text-cl-main group-hover:text-white':
                                                !$route.path.includes('model'),
                                            'text-cl-blue': $route.path.includes('model'),
                                        }"
                                    >
                                        <IconModel />
                                    </div>
                                    <span
                                        class="text-size_20/16 font-bold transition-colors duration-150"
                                        :class="{
                                            'text-cl-main group-hover:text-white':
                                                !$route.path.includes('model'),
                                            'text-cl-blue': $route.path.includes('model'),
                                        }"
                                        >MODEL</span
                                    >
                                </NuxtLink>
                            </div>

                            <div
                                ref="line"
                                class="absolute bottom-0 left-0 w-full h-0.75 bg-cl-blue transition-all"
                            ></div>
                        </div>

                        <div class="ml-auto pr-2.5">
                            <div class="flex items-center gap-x-6">
                                <span class="text-size_18/16">Username</span>
                                <div class="px-6 py-4 border text-size_18/16 font-bold">U</div>
                                <div class="px-6 py-4 border text-size_18/16 font-bold">Game</div>
                            </div>
                        </div>
                    </div>
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
