<script lang="ts">
import Dialog from "./index.vue";
import ModalWrapper from "@/components/core/app/ModalWrapper.vue";

export default {
    name: "ModalConfirmDialog",
};
</script>

<script lang="ts" setup>
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
