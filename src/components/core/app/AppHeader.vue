<script lang="ts" setup>
import { storeToRefs } from "pinia";
import UserProfile from "./UserProfile.vue";
import IconAnalytics from "@/components/icons/IconAnalytics.vue";
import IconModel from "@/components/icons/IconModel.vue";
import IconDocumentation from "@/components/icons/IconDocumentation.vue";
import { useGameStore } from "@/store/game";

const props = defineProps({
    tab: {
        type: String as PropType<"model" | "analytics" | "documentation">,
        default: "analytics",
    },
});

const { tab } = toRefs(props);

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

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const line = ref<HTMLElement | null>(null);

const navbarEl1 = ref<HTMLElement | null>(null);
const navbarEl2 = ref<HTMLElement | null>(null);
const navbarEl3 = ref<HTMLElement | null>(null);

function moveLine() {
    if (tab.value === "analytics") {
        if (navbarEl1.value && line.value) {
            initLine(navbarEl1.value);
            return;
        }
    }

    if (tab.value === "model") {
        if (navbarEl2.value && line.value) {
            initLine(navbarEl2.value);
        }
    }

    if (tab.value === "documentation") {
        if (navbarEl3.value && line.value) {
            initLine(navbarEl3.value);
        }
    }
}
</script>

<template>
    <div class="flex items-center shadow-lg px-6 bg-white">
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
                            'text-cl-purple': $route.path.includes('analytics'),
                        }"
                    >
                        <IconAnalytics />
                    </div>
                    <span
                        class="leading-none text-[1.8rem] font-bold transition-colors duration-150"
                        :class="{
                            'text-cl-main group-hover:text-white':
                                !$route.path.includes('analytics'),
                            'text-cl-purple': $route.path.includes('analytics'),
                        }"
                        >Analytics</span
                    >
                </NuxtLink>
            </div>

            <div ref="navbarEl2">
                <NuxtLink
                    :to="{
                        name: 'model',
                    }"
                    class="group flex justify-center items-center gap-x-2.5 px-6 py-3.75 min-w-46 rounded-xl"
                    :class="{
                        'hover:bg-cl-main': !$route.path.includes('model'),
                    }"
                >
                    <div
                        class="w-8.5 transition-colors duration-150"
                        :class="{
                            'text-cl-main group-hover:text-white': !$route.path.includes('model'),
                            'text-cl-purple': $route.path.includes('model'),
                        }"
                    >
                        <IconModel />
                    </div>
                    <span
                        class="leading-none text-[1.8rem] font-bold transition-colors duration-150"
                        :class="{
                            'text-cl-main group-hover:text-white': !$route.path.includes('model'),
                            'text-cl-purple': $route.path.includes('model'),
                        }"
                        >AI</span
                    >
                </NuxtLink>
            </div>

            <div ref="navbarEl3">
                <NuxtLink
                    :to="{
                        name: 'documentation',
                    }"
                    class="group flex justify-center items-center gap-x-2.5 px-6 py-3.75 min-w-46 rounded-xl"
                    :class="{
                        'hover:bg-cl-main': !$route.path.includes('documentation'),
                    }"
                >
                    <div
                        class="w-8.5 transition-colors duration-150"
                        :class="{
                            'text-cl-main group-hover:text-white':
                                !$route.path.includes('documentation'),
                            'text-cl-purple': $route.path.includes('documentation'),
                        }"
                    >
                        <IconDocumentation />
                    </div>
                    <span
                        class="leading-none text-[1.8rem] font-bold transition-colors duration-150"
                        :class="{
                            'text-cl-main group-hover:text-white':
                                !$route.path.includes('documentation'),
                            'text-cl-purple': $route.path.includes('documentation'),
                        }"
                        >Documentation</span
                    >
                </NuxtLink>
            </div>

            <div ref="line" class="absolute bottom-0 h-1 bg-cl-purple transition-all"></div>
        </div>

        <div class="ml-auto pr-2.5">
            <div class="flex items-center gap-x-6">
                <span v-if="game" class="text-[1.3rem] text-cl-main font-bold">{{
                    game.game_name
                }}</span>
                <UserProfile />
            </div>
        </div>
    </div>
</template>
