<script lang="ts" setup>
const isOpen = ref(false);
const modalData = ref(null);
const submitResolve = ref<any>(null);

function onCancel() {
    isOpen.value = false;
    submitResolve.value({
        isSubmit: false,
    });
}

function open(dt: any) {
    isOpen.value = true;
    return new Promise((resolve) => {
        submitResolve.value = resolve;
        modalData.value = dt;
    });
}

function onSubmit(dt: any) {
    isOpen.value = false;
    submitResolve.value({
        isSubmit: true,
        data: dt,
    });
}

defineExpose({
    open,
});
</script>

<template>
    <ClientOnly>
        <HeadlessTransitionRoot appear :show="isOpen" as="template">
            <HeadlessDialog as="div" class="relative z-[9999]" @close="onCancel">
                <HeadlessTransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black bg-opacity-25"></div>
                </HeadlessTransitionChild>

                <div
                    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto"
                >
                    <div class="flex w-full min-h-full items-center justify-center p-4">
                        <HeadlessTransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <HeadlessDialogPanel class="w-full p-6 bg-white shadow">
                                <slot
                                    :modal-data="modalData"
                                    :cancel="onCancel"
                                    :submit="onSubmit"
                                />
                            </HeadlessDialogPanel>
                        </HeadlessTransitionChild>
                    </div>
                </div>
            </HeadlessDialog>
        </HeadlessTransitionRoot>
    </ClientOnly>
</template>
