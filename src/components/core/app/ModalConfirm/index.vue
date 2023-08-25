<script lang="ts">
export default {
    name: "ModalConfirmDialog",
};
</script>

<script lang="ts" setup>
defineProps({
    modalData: {
        type: [Object, null] as PropType<any>,
        required: true,
    },
    submit: {
        type: Function as PropType<any>,
        required: true,
    },
    cancel: {
        type: Function as PropType<any>,
        required: true,
    },
});
</script>

<template>
    <form @submit.prevent="submit">
        <div class="w-[28rem] flex flex-col gap-y-10">
            <h3 class="leading-[1.4] text-[2rem] text-center font-bold text-cl-main">
                {{ modalData }}
            </h3>

            <div class="flex items-center gap-x-5">
                <button
                    type="submit"
                    class="bg-cl-main text-white hover:bg-white hover:text-cl-main border-cl-main border-2 w-full text-size_20/16 px-6 py-3 rounded-md transition-colors duration-150"
                >
                    Submit
                </button>

                <button
                    type="button"
                    class="bg-cl-main text-white hover:bg-white hover:text-cl-main border-cl-main border-2 w-full text-size_20/16 px-6 py-3 rounded-md transition-colors duration-150"
                    @click="cancel"
                >
                    Cancel
                </button>
            </div>
        </div>
    </form>
</template>
