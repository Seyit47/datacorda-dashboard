<script lang="ts" setup>
defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    hasChildren: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div class="w-full">
        <div class="w-full">
            <HeadlessDisclosure>
                <HeadlessDisclosureButton class="w-full">
                    <slot name="link" />
                </HeadlessDisclosureButton>
                <Transition
                    enter-from-class="opacity-0 -translate-y-[10%]"
                    enter-active-class="transition duration-300"
                    leave-to-class="opacity-0 -translate-y-[10%]"
                    leave-active-class="transition duration-150"
                >
                    <HeadlessDisclosurePanel
                        :static="isOpen"
                        class="flex flex-col gap-y-1 text-sm text-gray-500"
                        :class="{
                            'pt-2.5': hasChildren,
                        }"
                    >
                        <slot name="elements" />
                    </HeadlessDisclosurePanel>
                </Transition>
            </HeadlessDisclosure>
        </div>
    </div>
</template>
