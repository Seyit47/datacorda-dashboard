<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { object, string } from "yup";
import LoginInput from "@/components/pages/Login/Input.vue";

const $toast = useToast();

const props = defineProps({
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

const { submit, cancel, modalData } = toRefs(props);

const form = useForm({
    validationSchema: object({
        name: string().required("Required field!"),
    }),
});

const { value: name } = useField<string>("name");

watch(
    modalData,
    () => {
        if (!modalData.value) {
            return;
        }
        name.value = modalData.value.segmentation_name;
    },
    {
        deep: true,
        immediate: true,
    }
);

async function onSubmit() {
    try {
        const errors = await form.validate();
        if (!errors.valid) {
            $toast.error("Entered invalid information!");
            return;
        }
        submit.value(name.value);
        form.resetForm();
    } catch (error: any) {
        $toast.error(error.message);
    }
}

function onCancel() {
    form.resetForm();
    cancel.value();
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="w-[28rem] flex flex-col gap-y-10">
            <h3 class="leading-[1.4] text-[2rem] text-center font-bold text-cl-main">
                Enter Segmentation name
            </h3>

            <div class="flex w-full">
                <LoginInput
                    v-model="name"
                    placeholder="Segmentation name"
                    :errors="form.errors.value.name"
                />
            </div>

            <div class="flex flex-col gap-y-2.5">
                <button
                    type="submit"
                    class="bg-cl-main text-white hover:bg-white hover:text-cl-main border-cl-main border-2 w-full text-size_20/16 px-6 py-3 rounded-md transition-colors duration-150"
                >
                    Submit
                </button>

                <button
                    type="button"
                    class="bg-cl-main text-white hover:bg-white hover:text-cl-main border-cl-main border-2 w-full text-size_20/16 px-6 py-3 rounded-md transition-colors duration-150"
                    @click="onCancel"
                >
                    Cancel
                </button>
            </div>
        </div>
    </form>
</template>
