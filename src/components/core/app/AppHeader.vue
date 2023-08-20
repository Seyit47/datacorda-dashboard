<script lang="ts" setup>
import { storeToRefs } from "pinia";
import IconAnalytics from "@/components/icons/IconAnalytics.vue";
import IconModel from "@/components/icons/IconModel.vue";
import { useAuthStore } from "@/store/auth";

const props = defineProps({
    isModel: {
        type: Boolean,
    },
});

const { isModel } = toRefs(props);

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

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const line = ref<HTMLElement | null>(null);

const navbarEl1 = ref<HTMLElement | null>(null);
const navbarEl2 = ref<HTMLElement | null>(null);

function moveLine() {
    if (!isModel.value) {
        if (navbarEl1.value && line.value) {
            initLine(navbarEl1.value);
            return;
        }
    }

    if (navbarEl2.value && line.value) {
        initLine(navbarEl2.value);
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
                        class="text-size_20/16 font-bold transition-colors duration-150"
                        :class="{
                            'text-cl-main group-hover:text-white':
                                !$route.path.includes('analytics'),
                            'text-cl-purple': $route.path.includes('analytics'),
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
                        class="text-size_20/16 font-bold transition-colors duration-150"
                        :class="{
                            'text-cl-main group-hover:text-white': !$route.path.includes('model'),
                            'text-cl-purple': $route.path.includes('model'),
                        }"
                        >AI</span
                    >
                </NuxtLink>
            </div>

            <div ref="line" class="absolute bottom-0 h-1 bg-cl-purple transition-all"></div>
        </div>

        <div class="ml-auto pr-2.5">
            <div class="flex items-center gap-x-6">
                <span class="text-size_18/16">{{ user?.username }}</span>
                <div
                    class="px-3.75 py-4 rounded-[20px] bg-cl-main text-size_18/16 text-white font-bold uppercase"
                >
                    {{ user?.username.slice(0, 1) }}{{ user?.username.slice(-1) }}
                </div>
                <div
                    class="px-3.75 py-4 rounded-[20px] border bg-cl-main text-size_18/16 text-white font-bold"
                >
                    Speed runner
                </div>
            </div>
        </div>
    </div>
</template>
