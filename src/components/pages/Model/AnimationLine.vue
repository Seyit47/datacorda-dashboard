<script lang="ts" setup>
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const line1 = ref<SVGPathElement | undefined>();
const line2 = ref<SVGPathElement | undefined>();
const circle1 = ref<HTMLElement[]>([]);
const circle2 = ref<HTMLElement[]>([]);

const animations = ref<gsap.core.Tween[]>([]);

const TIME = 10;

function initAnimation(i: number) {
    const animation = gsap.to(circle1.value[i], {
        repeat: -1,
        duration: TIME,
        motionPath: {
            path: line1.value,
            align: line1.value,
            alignOrigin: [0.5, 0.5],
        },
    });

    animations.value.push(animation);

    i += 1;
    if (i === 10) {
        return;
    }
    setTimeout(() => {
        return initAnimation(i);
    }, 500);
}

function initSecondAnimation(i: number) {
    const animation = gsap.to(circle2.value[i], {
        repeat: -1,
        duration: TIME,
        motionPath: {
            path: line2.value,
            align: line2.value,
            alignOrigin: [0.5, 0.5],
        },
    });

    animations.value.push(animation);

    i += 1;
    if (i === 10) {
        return;
    }
    setTimeout(() => {
        return initSecondAnimation(i);
    }, 500);
}

onMounted(() => {
    gsap.registerPlugin(MotionPathPlugin);

    setTimeout(() => {
        initAnimation(0);
    }, 500);
    setTimeout(() => {
        initSecondAnimation(0);
    }, 250);
});

onBeforeUnmount(() => {
    animations.value.map((tween) => tween.kill());
    animations.value = [];
    line1.value = undefined;
    line2.value = undefined;
    circle1.value = [];
    circle2.value = [];
});
</script>

<template>
    <div class="w-full">
        <svg
            id="efbFZskdJqT1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1920 800"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision"
            class="-translate-y-[15%] z-[-1]"
        >
            <path
                ref="line1"
                d="M409.342105,484.279778l701.116805-.296358c112.040552-9.783007,132.133685-165.665237,265.512425-171.725802c185.036824-.179599,27.423853-.003162,188.910935,0"
                transform="matrix(1.5 0 0 1.5-506.554-196.968)"
                fill="none"
                stroke="#35275E"
                stroke-width="8"
            />
            <path
                ref="line2"
                d="M409.342107,708.65651c241.015324-.547866,466.377067-.456057,702.560812,0c96.842043,17.391812,130.644893,167.238616,281.71743,170.152353c76.038783,0,68.559558,0,173.131727,0"
                transform="matrix(1.5 0 0 1.5-508.72-533.296)"
                fill="none"
                stroke="#35275E"
                stroke-width="8"
            />

            <circle
                v-for="(_, index) in 10"
                ref="circle1"
                :key="index"
                r="8"
                fill="white"
                class="will-change-transform"
            />
            <circle
                v-for="(_, index) in 10"
                ref="circle2"
                :key="index"
                r="8"
                fill="white"
                class="will-change-transform"
            />
        </svg>
    </div>
</template>
