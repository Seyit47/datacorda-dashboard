<script lang="ts" setup>
const props = defineProps({
    content: {
        type: String,
        default: "",
    },
});

const { content } = toRefs(props);

const Content = () => {
    return h({
        template: `<div class="html-content">${content.value}</div>`,
    });
};
</script>

<template>
    <Content />
</template>

<style lang="scss">
.html-content {
    .lst-kix_ho9w841s8k3l-0 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_ho9w841s8k3l-1 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_ho9w841s8k3l-2 > li:before {
        content: "\0025a0   ";
    }
    ol.lst-kix_gifsi82wm6yl-2.start {
        counter-reset: lst-ctn-kix_gifsi82wm6yl-2 0;
    }
    .lst-kix_ho9w841s8k3l-4 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_ho9w841s8k3l-3 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_ho9w841s8k3l-5 > li:before {
        content: "\0025a0   ";
    }
    ol.lst-kix_le7x576qsleg-1.start {
        counter-reset: lst-ctn-kix_le7x576qsleg-1 0;
    }
    .lst-kix_ho9w841s8k3l-8 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_ho9w841s8k3l-7 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_ho9w841s8k3l-6 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_le7x576qsleg-3 > li {
        counter-increment: lst-ctn-kix_le7x576qsleg-3;
    }
    .lst-kix_d2654q24wimx-7 > li:before {
        content: "" counter(lst-ctn-kix_d2654q24wimx-7, lower-latin) ". ";
    }
    .lst-kix_d2654q24wimx-8 > li:before {
        content: "" counter(lst-ctn-kix_d2654q24wimx-8, lower-roman) ". ";
    }
    .lst-kix_d2654q24wimx-8 > li {
        counter-increment: lst-ctn-kix_d2654q24wimx-8;
    }
    ol.lst-kix_d2654q24wimx-5.start {
        counter-reset: lst-ctn-kix_d2654q24wimx-5 0;
    }
    .lst-kix_s8ir0enhd8wc-5 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_le7x576qsleg-3 > li:before {
        content: "" counter(lst-ctn-kix_le7x576qsleg-3, decimal) ". ";
    }
    .lst-kix_le7x576qsleg-4 > li:before {
        content: "" counter(lst-ctn-kix_le7x576qsleg-4, lower-latin) ". ";
    }
    .lst-kix_le7x576qsleg-2 > li:before {
        content: "" counter(lst-ctn-kix_le7x576qsleg-2, lower-roman) ". ";
    }
    .lst-kix_le7x576qsleg-6 > li:before {
        content: "" counter(lst-ctn-kix_le7x576qsleg-6, decimal) ". ";
    }
    ol.lst-kix_gifsi82wm6yl-8.start {
        counter-reset: lst-ctn-kix_gifsi82wm6yl-8 0;
    }
    .lst-kix_s8ir0enhd8wc-2 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_s8ir0enhd8wc-6 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_s8ir0enhd8wc-1 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_s8ir0enhd8wc-7 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_le7x576qsleg-5 > li:before {
        content: "" counter(lst-ctn-kix_le7x576qsleg-5, lower-roman) ". ";
    }
    .lst-kix_s8ir0enhd8wc-0 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_s8ir0enhd8wc-8 > li:before {
        content: "\0025a0   ";
    }
    ol.lst-kix_d2654q24wimx-2 {
        list-style-type: none;
    }
    ol.lst-kix_d2654q24wimx-3 {
        list-style-type: none;
    }
    ol.lst-kix_d2654q24wimx-4 {
        list-style-type: none;
    }
    ol.lst-kix_d2654q24wimx-5 {
        list-style-type: none;
    }
    ol.lst-kix_d2654q24wimx-0 {
        list-style-type: none;
    }
    ol.lst-kix_d2654q24wimx-1 {
        list-style-type: none;
    }
    .lst-kix_le7x576qsleg-5 > li {
        counter-increment: lst-ctn-kix_le7x576qsleg-5;
    }
    .lst-kix_le7x576qsleg-7 > li:before {
        content: "" counter(lst-ctn-kix_le7x576qsleg-7, lower-latin) ". ";
    }
    ol.lst-kix_d2654q24wimx-6 {
        list-style-type: none;
    }
    ul.lst-kix_p8fliyn46w3h-8 {
        list-style-type: none;
    }
    .lst-kix_s8ir0enhd8wc-3 > li:before {
        content: "\0025cf   ";
    }
    ol.lst-kix_d2654q24wimx-7 {
        list-style-type: none;
    }
    ul.lst-kix_p8fliyn46w3h-7 {
        list-style-type: none;
    }
    ol.lst-kix_d2654q24wimx-8 {
        list-style-type: none;
    }
    .lst-kix_le7x576qsleg-8 > li:before {
        content: "" counter(lst-ctn-kix_le7x576qsleg-8, lower-roman) ". ";
    }
    .lst-kix_s8ir0enhd8wc-4 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_gifsi82wm6yl-6 > li {
        counter-increment: lst-ctn-kix_gifsi82wm6yl-6;
    }
    ul.lst-kix_lhprn69g3m1z-8 {
        list-style-type: none;
    }
    .lst-kix_le7x576qsleg-1 > li {
        counter-increment: lst-ctn-kix_le7x576qsleg-1;
    }
    ul.lst-kix_lhprn69g3m1z-6 {
        list-style-type: none;
    }
    ul.lst-kix_lhprn69g3m1z-7 {
        list-style-type: none;
    }
    ul.lst-kix_lhprn69g3m1z-4 {
        list-style-type: none;
    }
    .lst-kix_le7x576qsleg-7 > li {
        counter-increment: lst-ctn-kix_le7x576qsleg-7;
    }
    ul.lst-kix_lhprn69g3m1z-5 {
        list-style-type: none;
    }
    ul.lst-kix_lhprn69g3m1z-2 {
        list-style-type: none;
    }
    ul.lst-kix_lhprn69g3m1z-3 {
        list-style-type: none;
    }
    ul.lst-kix_lhprn69g3m1z-0 {
        list-style-type: none;
    }
    ul.lst-kix_lhprn69g3m1z-1 {
        list-style-type: none;
    }
    .lst-kix_d2654q24wimx-6 > li {
        counter-increment: lst-ctn-kix_d2654q24wimx-6;
    }
    .lst-kix_gifsi82wm6yl-4 > li:before {
        content: "" counter(lst-ctn-kix_gifsi82wm6yl-4, lower-latin) ". ";
    }
    .lst-kix_gifsi82wm6yl-3 > li:before {
        content: "" counter(lst-ctn-kix_gifsi82wm6yl-3, decimal) ". ";
    }
    .lst-kix_gifsi82wm6yl-5 > li:before {
        content: "" counter(lst-ctn-kix_gifsi82wm6yl-5, lower-roman) ". ";
    }
    ol.lst-kix_d2654q24wimx-0.start {
        counter-reset: lst-ctn-kix_d2654q24wimx-0 0;
    }
    .lst-kix_gifsi82wm6yl-8 > li:before {
        content: "" counter(lst-ctn-kix_gifsi82wm6yl-8, lower-roman) ". ";
    }
    .lst-kix_gifsi82wm6yl-7 > li:before {
        content: "" counter(lst-ctn-kix_gifsi82wm6yl-7, lower-latin) ". ";
    }
    .lst-kix_gifsi82wm6yl-6 > li:before {
        content: "" counter(lst-ctn-kix_gifsi82wm6yl-6, decimal) ". ";
    }
    ul.lst-kix_ho9w841s8k3l-2 {
        list-style-type: none;
    }
    ul.lst-kix_ho9w841s8k3l-3 {
        list-style-type: none;
    }
    ul.lst-kix_ho9w841s8k3l-4 {
        list-style-type: none;
    }
    ul.lst-kix_ho9w841s8k3l-5 {
        list-style-type: none;
    }
    ul.lst-kix_ho9w841s8k3l-6 {
        list-style-type: none;
    }
    ul.lst-kix_ho9w841s8k3l-7 {
        list-style-type: none;
    }
    ul.lst-kix_ho9w841s8k3l-8 {
        list-style-type: none;
    }
    .lst-kix_gifsi82wm6yl-8 > li {
        counter-increment: lst-ctn-kix_gifsi82wm6yl-8;
    }
    ol.lst-kix_le7x576qsleg-3 {
        list-style-type: none;
    }
    ol.lst-kix_le7x576qsleg-4 {
        list-style-type: none;
    }
    ol.lst-kix_le7x576qsleg-1 {
        list-style-type: none;
    }
    ol.lst-kix_le7x576qsleg-2 {
        list-style-type: none;
    }
    ul.lst-kix_xvqgvyby5zx-1 {
        list-style-type: none;
    }
    ul.lst-kix_xvqgvyby5zx-0 {
        list-style-type: none;
    }
    ol.lst-kix_le7x576qsleg-0 {
        list-style-type: none;
    }
    ul.lst-kix_xvqgvyby5zx-3 {
        list-style-type: none;
    }
    ul.lst-kix_xvqgvyby5zx-2 {
        list-style-type: none;
    }
    .lst-kix_gifsi82wm6yl-2 > li {
        counter-increment: lst-ctn-kix_gifsi82wm6yl-2;
    }
    ul.lst-kix_xvqgvyby5zx-5 {
        list-style-type: none;
    }
    ul.lst-kix_xvqgvyby5zx-4 {
        list-style-type: none;
    }
    ul.lst-kix_xvqgvyby5zx-7 {
        list-style-type: none;
    }
    ul.lst-kix_xvqgvyby5zx-6 {
        list-style-type: none;
    }
    ol.lst-kix_le7x576qsleg-7 {
        list-style-type: none;
    }
    ul.lst-kix_xvqgvyby5zx-8 {
        list-style-type: none;
    }
    ol.lst-kix_le7x576qsleg-8 {
        list-style-type: none;
    }
    ol.lst-kix_le7x576qsleg-5 {
        list-style-type: none;
    }
    ol.lst-kix_le7x576qsleg-6 {
        list-style-type: none;
    }
    ul.lst-kix_ho9w841s8k3l-0 {
        list-style-type: none;
    }
    ol.lst-kix_gifsi82wm6yl-3.start {
        counter-reset: lst-ctn-kix_gifsi82wm6yl-3 0;
    }
    ul.lst-kix_ho9w841s8k3l-1 {
        list-style-type: none;
    }
    ul.lst-kix_s8ir0enhd8wc-3 {
        list-style-type: none;
    }
    ul.lst-kix_s8ir0enhd8wc-2 {
        list-style-type: none;
    }
    ul.lst-kix_s8ir0enhd8wc-1 {
        list-style-type: none;
    }
    .lst-kix_lhprn69g3m1z-3 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_lhprn69g3m1z-5 > li:before {
        content: "\0025a0   ";
    }
    ul.lst-kix_s8ir0enhd8wc-0 {
        list-style-type: none;
    }
    .lst-kix_d2654q24wimx-3 > li {
        counter-increment: lst-ctn-kix_d2654q24wimx-3;
    }
    .lst-kix_xvqgvyby5zx-1 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_lhprn69g3m1z-1 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_xvqgvyby5zx-3 > li:before {
        content: "\0025cf   ";
    }
    ol.lst-kix_le7x576qsleg-8.start {
        counter-reset: lst-ctn-kix_le7x576qsleg-8 0;
    }
    .lst-kix_lhprn69g3m1z-7 > li:before {
        content: "\0025cb   ";
    }
    ol.lst-kix_le7x576qsleg-5.start {
        counter-reset: lst-ctn-kix_le7x576qsleg-5 0;
    }
    .lst-kix_gzio7ttmq54r-0 > li:before {
        content: "\0025cf   ";
    }
    ol.lst-kix_gifsi82wm6yl-1.start {
        counter-reset: lst-ctn-kix_gifsi82wm6yl-1 0;
    }
    .lst-kix_gzio7ttmq54r-2 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_gifsi82wm6yl-2 > li:before {
        content: "" counter(lst-ctn-kix_gifsi82wm6yl-2, lower-roman) ". ";
    }
    .lst-kix_gzio7ttmq54r-4 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_gifsi82wm6yl-0 > li:before {
        content: "" counter(lst-ctn-kix_gifsi82wm6yl-0, decimal) ". ";
    }
    .lst-kix_gifsi82wm6yl-3 > li {
        counter-increment: lst-ctn-kix_gifsi82wm6yl-3;
    }
    .lst-kix_gzio7ttmq54r-6 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_gzio7ttmq54r-8 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_8rvfhktgtuzy-0 > li:before {
        content: "\0025cf   ";
    }
    ol.lst-kix_le7x576qsleg-6.start {
        counter-reset: lst-ctn-kix_le7x576qsleg-6 0;
    }
    .lst-kix_le7x576qsleg-0 > li {
        counter-increment: lst-ctn-kix_le7x576qsleg-0;
    }
    .lst-kix_gifsi82wm6yl-4 > li {
        counter-increment: lst-ctn-kix_gifsi82wm6yl-4;
    }
    .lst-kix_le7x576qsleg-1 > li:before {
        content: "" counter(lst-ctn-kix_le7x576qsleg-1, lower-latin) ". ";
    }
    .lst-kix_8rvfhktgtuzy-6 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_d2654q24wimx-5 > li:before {
        content: "" counter(lst-ctn-kix_d2654q24wimx-5, lower-roman) ". ";
    }
    .lst-kix_le7x576qsleg-6 > li {
        counter-increment: lst-ctn-kix_le7x576qsleg-6;
    }
    .lst-kix_8rvfhktgtuzy-8 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_d2654q24wimx-4 > li {
        counter-increment: lst-ctn-kix_d2654q24wimx-4;
    }
    ol.lst-kix_gifsi82wm6yl-0.start {
        counter-reset: lst-ctn-kix_gifsi82wm6yl-0 0;
    }
    .lst-kix_d2654q24wimx-3 > li:before {
        content: "" counter(lst-ctn-kix_d2654q24wimx-3, decimal) ". ";
    }
    ol.lst-kix_le7x576qsleg-7.start {
        counter-reset: lst-ctn-kix_le7x576qsleg-7 0;
    }
    .lst-kix_8rvfhktgtuzy-2 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_d2654q24wimx-1 > li:before {
        content: "" counter(lst-ctn-kix_d2654q24wimx-1, lower-latin) ". ";
    }
    .lst-kix_8rvfhktgtuzy-4 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_le7x576qsleg-4 > li {
        counter-increment: lst-ctn-kix_le7x576qsleg-4;
    }
    .lst-kix_gifsi82wm6yl-7 > li {
        counter-increment: lst-ctn-kix_gifsi82wm6yl-7;
    }
    ul.lst-kix_gzio7ttmq54r-4 {
        list-style-type: none;
    }
    ul.lst-kix_gzio7ttmq54r-5 {
        list-style-type: none;
    }
    ul.lst-kix_gzio7ttmq54r-6 {
        list-style-type: none;
    }
    ul.lst-kix_gzio7ttmq54r-7 {
        list-style-type: none;
    }
    ul.lst-kix_gzio7ttmq54r-0 {
        list-style-type: none;
    }
    ol.lst-kix_d2654q24wimx-2.start {
        counter-reset: lst-ctn-kix_d2654q24wimx-2 0;
    }
    ul.lst-kix_gzio7ttmq54r-1 {
        list-style-type: none;
    }
    ul.lst-kix_gzio7ttmq54r-2 {
        list-style-type: none;
    }
    ul.lst-kix_gzio7ttmq54r-3 {
        list-style-type: none;
    }
    ol.lst-kix_gifsi82wm6yl-6 {
        list-style-type: none;
    }
    ol.lst-kix_gifsi82wm6yl-7 {
        list-style-type: none;
    }
    ol.lst-kix_gifsi82wm6yl-4 {
        list-style-type: none;
    }
    ol.lst-kix_gifsi82wm6yl-5 {
        list-style-type: none;
    }
    ul.lst-kix_gzio7ttmq54r-8 {
        list-style-type: none;
    }
    ol.lst-kix_gifsi82wm6yl-2 {
        list-style-type: none;
    }
    ol.lst-kix_gifsi82wm6yl-3 {
        list-style-type: none;
    }
    ol.lst-kix_gifsi82wm6yl-0 {
        list-style-type: none;
    }
    ol.lst-kix_gifsi82wm6yl-1 {
        list-style-type: none;
    }
    .lst-kix_p8fliyn46w3h-1 > li:before {
        content: "\0025cb   ";
    }
    ul.lst-kix_k2abovvl2m00-0 {
        list-style-type: none;
    }
    .lst-kix_p8fliyn46w3h-0 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_p8fliyn46w3h-2 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_p8fliyn46w3h-6 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_p8fliyn46w3h-7 > li:before {
        content: "\0025cb   ";
    }
    ol.lst-kix_gifsi82wm6yl-5.start {
        counter-reset: lst-ctn-kix_gifsi82wm6yl-5 0;
    }
    .lst-kix_p8fliyn46w3h-5 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_d2654q24wimx-0 > li {
        counter-increment: lst-ctn-kix_d2654q24wimx-0;
    }
    .lst-kix_le7x576qsleg-2 > li {
        counter-increment: lst-ctn-kix_le7x576qsleg-2;
    }
    .lst-kix_p8fliyn46w3h-4 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_p8fliyn46w3h-3 > li:before {
        content: "\0025cf   ";
    }
    ol.lst-kix_gifsi82wm6yl-4.start {
        counter-reset: lst-ctn-kix_gifsi82wm6yl-4 0;
    }
    .lst-kix_k2abovvl2m00-0 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_k2abovvl2m00-1 > li:before {
        content: "\0025cb   ";
    }
    ol.lst-kix_d2654q24wimx-7.start {
        counter-reset: lst-ctn-kix_d2654q24wimx-7 0;
    }
    .lst-kix_p8fliyn46w3h-8 > li:before {
        content: "\0025a0   ";
    }
    ol.lst-kix_le7x576qsleg-3.start {
        counter-reset: lst-ctn-kix_le7x576qsleg-3 0;
    }
    .lst-kix_d2654q24wimx-5 > li {
        counter-increment: lst-ctn-kix_d2654q24wimx-5;
    }
    .lst-kix_gifsi82wm6yl-5 > li {
        counter-increment: lst-ctn-kix_gifsi82wm6yl-5;
    }
    .lst-kix_k2abovvl2m00-7 > li:before {
        content: "\0025cb   ";
    }
    ol.lst-kix_gifsi82wm6yl-8 {
        list-style-type: none;
    }
    ul.lst-kix_8rvfhktgtuzy-0 {
        list-style-type: none;
    }
    .lst-kix_k2abovvl2m00-8 > li:before {
        content: "\0025a0   ";
    }
    ol.lst-kix_d2654q24wimx-8.start {
        counter-reset: lst-ctn-kix_d2654q24wimx-8 0;
    }
    .lst-kix_k2abovvl2m00-2 > li:before {
        content: "\0025a0   ";
    }
    ol.lst-kix_d2654q24wimx-1.start {
        counter-reset: lst-ctn-kix_d2654q24wimx-1 0;
    }
    .lst-kix_xvqgvyby5zx-4 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_xvqgvyby5zx-5 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_k2abovvl2m00-3 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_k2abovvl2m00-6 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_xvqgvyby5zx-8 > li:before {
        content: "\0025a0   ";
    }
    ul.lst-kix_s8ir0enhd8wc-8 {
        list-style-type: none;
    }
    .lst-kix_k2abovvl2m00-4 > li:before {
        content: "\0025cb   ";
    }
    ul.lst-kix_s8ir0enhd8wc-7 {
        list-style-type: none;
    }
    .lst-kix_xvqgvyby5zx-6 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_xvqgvyby5zx-7 > li:before {
        content: "\0025cb   ";
    }
    ul.lst-kix_s8ir0enhd8wc-6 {
        list-style-type: none;
    }
    .lst-kix_k2abovvl2m00-5 > li:before {
        content: "\0025a0   ";
    }
    ol.lst-kix_le7x576qsleg-4.start {
        counter-reset: lst-ctn-kix_le7x576qsleg-4 0;
    }
    ul.lst-kix_s8ir0enhd8wc-5 {
        list-style-type: none;
    }
    ul.lst-kix_s8ir0enhd8wc-4 {
        list-style-type: none;
    }
    .lst-kix_lhprn69g3m1z-0 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_lhprn69g3m1z-4 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_xvqgvyby5zx-2 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_lhprn69g3m1z-2 > li:before {
        content: "\0025a0   ";
    }
    ul.lst-kix_8rvfhktgtuzy-6 {
        list-style-type: none;
    }
    ul.lst-kix_8rvfhktgtuzy-5 {
        list-style-type: none;
    }
    ul.lst-kix_8rvfhktgtuzy-8 {
        list-style-type: none;
    }
    ul.lst-kix_8rvfhktgtuzy-7 {
        list-style-type: none;
    }
    ul.lst-kix_8rvfhktgtuzy-2 {
        list-style-type: none;
    }
    ul.lst-kix_8rvfhktgtuzy-1 {
        list-style-type: none;
    }
    ul.lst-kix_8rvfhktgtuzy-4 {
        list-style-type: none;
    }
    ul.lst-kix_8rvfhktgtuzy-3 {
        list-style-type: none;
    }
    .lst-kix_lhprn69g3m1z-8 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_xvqgvyby5zx-0 > li:before {
        content: "\0025cf   ";
    }
    ol.lst-kix_le7x576qsleg-0.start {
        counter-reset: lst-ctn-kix_le7x576qsleg-0 0;
    }
    .lst-kix_gifsi82wm6yl-1 > li {
        counter-increment: lst-ctn-kix_gifsi82wm6yl-1;
    }
    .lst-kix_d2654q24wimx-2 > li {
        counter-increment: lst-ctn-kix_d2654q24wimx-2;
    }
    .lst-kix_lhprn69g3m1z-6 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_le7x576qsleg-8 > li {
        counter-increment: lst-ctn-kix_le7x576qsleg-8;
    }
    .lst-kix_gifsi82wm6yl-1 > li:before {
        content: "" counter(lst-ctn-kix_gifsi82wm6yl-1, lower-latin) ". ";
    }
    ol.lst-kix_d2654q24wimx-3.start {
        counter-reset: lst-ctn-kix_d2654q24wimx-3 0;
    }
    .lst-kix_gzio7ttmq54r-1 > li:before {
        content: "\0025cb   ";
    }
    ol.lst-kix_le7x576qsleg-2.start {
        counter-reset: lst-ctn-kix_le7x576qsleg-2 0;
    }
    .lst-kix_gifsi82wm6yl-0 > li {
        counter-increment: lst-ctn-kix_gifsi82wm6yl-0;
    }
    .lst-kix_gzio7ttmq54r-3 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_gzio7ttmq54r-7 > li:before {
        content: "\0025cb   ";
    }
    ol.lst-kix_d2654q24wimx-6.start {
        counter-reset: lst-ctn-kix_d2654q24wimx-6 0;
    }
    .lst-kix_gzio7ttmq54r-5 > li:before {
        content: "\0025a0   ";
    }
    ol.lst-kix_d2654q24wimx-4.start {
        counter-reset: lst-ctn-kix_d2654q24wimx-4 0;
    }
    ul.lst-kix_p8fliyn46w3h-4 {
        list-style-type: none;
    }
    ul.lst-kix_p8fliyn46w3h-3 {
        list-style-type: none;
    }
    ul.lst-kix_p8fliyn46w3h-6 {
        list-style-type: none;
    }
    ul.lst-kix_p8fliyn46w3h-5 {
        list-style-type: none;
    }
    ul.lst-kix_p8fliyn46w3h-0 {
        list-style-type: none;
    }
    ul.lst-kix_p8fliyn46w3h-2 {
        list-style-type: none;
    }
    ul.lst-kix_p8fliyn46w3h-1 {
        list-style-type: none;
    }
    ul.lst-kix_k2abovvl2m00-7 {
        list-style-type: none;
    }
    ul.lst-kix_k2abovvl2m00-8 {
        list-style-type: none;
    }
    .lst-kix_le7x576qsleg-0 > li:before {
        content: "" counter(lst-ctn-kix_le7x576qsleg-0, decimal) ". ";
    }
    ol.lst-kix_gifsi82wm6yl-7.start {
        counter-reset: lst-ctn-kix_gifsi82wm6yl-7 0;
    }
    ul.lst-kix_k2abovvl2m00-5 {
        list-style-type: none;
    }
    ul.lst-kix_k2abovvl2m00-6 {
        list-style-type: none;
    }
    ul.lst-kix_k2abovvl2m00-3 {
        list-style-type: none;
    }
    ul.lst-kix_k2abovvl2m00-4 {
        list-style-type: none;
    }
    ul.lst-kix_k2abovvl2m00-1 {
        list-style-type: none;
    }
    ul.lst-kix_k2abovvl2m00-2 {
        list-style-type: none;
    }
    .lst-kix_8rvfhktgtuzy-7 > li:before {
        content: "\0025cb   ";
    }
    .lst-kix_d2654q24wimx-6 > li:before {
        content: "" counter(lst-ctn-kix_d2654q24wimx-6, decimal) ". ";
    }
    li.li-bullet-0:before {
        margin-left: -18pt;
        white-space: nowrap;
        display: inline-block;
        min-width: 18pt;
    }
    .lst-kix_d2654q24wimx-4 > li:before {
        content: "" counter(lst-ctn-kix_d2654q24wimx-4, lower-latin) ". ";
    }
    .lst-kix_d2654q24wimx-1 > li {
        counter-increment: lst-ctn-kix_d2654q24wimx-1;
    }
    .lst-kix_d2654q24wimx-7 > li {
        counter-increment: lst-ctn-kix_d2654q24wimx-7;
    }
    .lst-kix_8rvfhktgtuzy-1 > li:before {
        content: "\0025cb   ";
    }
    ol.lst-kix_gifsi82wm6yl-6.start {
        counter-reset: lst-ctn-kix_gifsi82wm6yl-6 0;
    }
    .lst-kix_d2654q24wimx-0 > li:before {
        content: "" counter(lst-ctn-kix_d2654q24wimx-0, decimal) ". ";
    }
    .lst-kix_8rvfhktgtuzy-3 > li:before {
        content: "\0025cf   ";
    }
    .lst-kix_8rvfhktgtuzy-5 > li:before {
        content: "\0025a0   ";
    }
    .lst-kix_d2654q24wimx-2 > li:before {
        content: "" counter(lst-ctn-kix_d2654q24wimx-2, lower-roman) ". ";
    }
    ol {
        margin: 0;
        padding: 0;
    }
    table td,
    table th {
        padding: 0;
    }
    .c1 {
        color: #48346c;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 15pt;
        font-family: "Arial";
        font-style: normal;
    }
    .c2 {
        color: #000000;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 13pt;
        font-family: "Arial";
        font-style: normal;
    }
    .c0 {
        color: #111111;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 12pt;
        font-family: "Arial";
        font-style: normal;
    }
    .c3 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
        height: 11pt;
    }
    .c13 {
        color: #000000;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 15pt;
        font-family: "Arial";
        font-style: normal;
    }
    .c10 {
        color: #000000;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 18pt;
        font-family: "Arial";
        font-style: normal;
    }
    .c5 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
    }
    .c24 {
        padding-top: 9pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
    }
    .c15 {
        color: #48346c;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-family: "Arial";
        font-style: normal;
    }
    .c11 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-family: "Arial";
        font-style: normal;
    }
    .c20 {
        text-decoration-skip-ink: none;
        -webkit-text-decoration-skip: none;
        text-decoration: underline;
    }
    .c21 {
        background-color: #ffffff;
        max-width: 451.4pt;
        padding: 72pt 72pt 72pt 72pt;
    }
    .c7 {
        color: inherit;
        text-decoration: inherit;
    }
    .c4 {
        padding: 0;
        margin: 0;
    }
    .c14 {
        margin-left: 72pt;
        padding-left: 0pt;
    }
    .c6 {
        background-color: #ffff00;
        font-size: 13pt;
    }
    .c19 {
        color: #48346c;
        font-weight: 700;
    }
    .c9 {
        font-size: 13pt;
    }
    .c17 {
        color: #1155cc;
    }
    .c12 {
        font-size: 12pt;
    }
    .c8 {
        margin-left: 36pt;
    }
    .c25 {
        font-size: 15pt;
    }
    .c23 {
        font-size: 11pt;
    }
    .c22 {
        font-weight: 700;
    }
    .c16 {
        padding-left: 0pt;
    }
    .c26 {
        text-indent: 36pt;
    }
    .c28 {
        margin-left: 72pt;
    }
    .c18 {
        color: #111111;
    }
    .c27 {
        font-style: italic;
    }
    .title {
        padding-top: 0pt;
        color: #000000;
        font-size: 26pt;
        padding-bottom: 3pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
    }
    .subtitle {
        padding-top: 0pt;
        color: #666666;
        font-size: 15pt;
        padding-bottom: 16pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
    }
    li {
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
    }
    p {
        margin: 0;
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
    }
    h1 {
        padding-top: 20pt;
        color: #000000;
        font-size: 20pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
    }
    h2 {
        padding-top: 18pt;
        color: #000000;
        font-size: 16pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
    }
    h3 {
        padding-top: 16pt;
        color: #434343;
        font-size: 14pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
    }
    h4 {
        padding-top: 14pt;
        color: #666666;
        font-size: 12pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
    }
    h5 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
    }
    h6 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        font-style: italic;
        orphans: 2;
        widows: 2;
        text-align: left;
    }
}
</style>
