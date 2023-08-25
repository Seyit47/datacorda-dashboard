<script lang="ts" setup>
import Dialog from "./index.vue";
import ModalWrapper from "@/components/core/app/ModalWrapper.vue";

const modal = ref<any>(null);

function open(dt: any) {
    return modal.value.open(dt);
}

defineExpose({
    open,
});
</script>

<template>
    <ModalWrapper ref="modal" v-slot="{ modalData, submit, cancel }">
        <Dialog :modal-data="modalData" :submit="submit" :cancel="cancel" />
    </ModalWrapper>
</template>
