<script lang="ts" setup>
import { useField, useForm, useIsFormDirty } from "vee-validate";
import { object, string } from "yup";
import { useToast, TYPE } from "vue-toastification";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import LoginInput from "@/components/pages/Login/Input.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconMessage from "@/components/icons/IconMessage.vue";

definePageMeta({
    layout: "login",
});

const showPassword = ref(false);

const router = useRouter();

const toast = useToast();

onBeforeRouteLeave((_, __, next) => {
    if (isFormDirty.value) {
        const confirmed = window.confirm("Do you really want to leave? you have unsaved changes!");
        if (confirmed) {
            next();
            return;
        }
        return next(false);
    }
    next();
});

function refreshHandler(e: BeforeUnloadEvent) {
    if (isFormDirty.value) {
        e.returnValue = "Do you really want to leave? you have unsaved changes!";
    }
}

onMounted(() => {
    window.addEventListener("beforeunload", refreshHandler);
});

onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", refreshHandler);
});

const form = useForm({
    validationSchema: object({
        email: string().required("Required field!").email("Entered invalid email!"),
        password: string()
            .required("Required field!")
            .min(8, "Password must be at least 8 characters long!")
            .matches(/[A-Z]/, "Password must contain at least 1 uppercase characters!")
            .matches(/[a-z]/, "Password must contain at least 1 lowercase character!")
            .matches(/\d+/, "Password must contain at least 1 digit!")
            .matches(/[@#$!%*^?()&]/, "Password must contain at least 1 special character!"),
    }),
});

const isFormDirty = useIsFormDirty();

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

async function onSubmit() {
    try {
        const errors = await form.validate();
        if (!errors.valid) {
            toast("Entered invalid information!", {
                type: TYPE.ERROR,
                timeout: 3000,
            });
            return;
        }

        const formData = new FormData();
        formData.append("email", email.value);
        formData.append("password", password.value);

        // await $fetch("/api/user/signin", {
        //     method: "POST",
        //     body: formData,
        // });

        if (!(email.value === "datacorda@gmail.com" && password.value === "Datacorda2023!")) {
            toast("Entered invalid information!", {
                type: TYPE.ERROR,
                timeout: 3000,
            });
            return;
        }

        toast("You are logged in successfully!", {
            type: TYPE.SUCCESS,
            timeout: 3000,
        });

        form.resetForm();

        router.push({
            name: "analytics",
        });
    } catch (err: any) {
        const res = err.response?._data;
        toast(res?.message, {
            type: TYPE.ERROR,
            timeout: 3000,
        });
    }
}
</script>

<template>
    <div class="w-full min-h-[calc(100vh-5rem)] flex justify-center items-center">
        <div class="flex flex-col items-center gap-y-15 w-145.75 py-10 px-8.5 bg-white rounded-xl">
            <div class="flex flex-col items-center gap-y-3">
                <img src="@/assets/img/sign-in-logo.png" alt="Datacorda logo" />
                <span class="text-cl-gray text-size_17/16">Login to your account</span>
            </div>

            <form class="w-full flex flex-col gap-y-10 items-center" @submit.prevent="onSubmit">
                <div class="w-full flex flex-col gap-y-3">
                    <div class="flex flex-col gap-y-9 -mx-1">
                        <LoginInput
                            v-model="email"
                            placeholder="Email address"
                            :errors="form.errors.value.email"
                        >
                            <template #prepend>
                                <div class="h-full flex items-center px-4.75">
                                    <div class="w-7.25">
                                        <IconMessage />
                                    </div>
                                </div>
                            </template>
                        </LoginInput>
                        <LoginInput
                            v-model="password"
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="Password"
                            :errors="form.errors.value.password"
                        >
                            <template #prepend>
                                <div class="h-full flex items-center px-4.75">
                                    <div class="w-7.25">
                                        <IconLock />
                                    </div>
                                </div>
                            </template>
                            <template #append>
                                <div class="h-full flex items-center px-4.75">
                                    <button
                                        type="button"
                                        class="w-6"
                                        @click="showPassword = !showPassword"
                                    >
                                        <EyeSlashIcon v-if="!showPassword" />
                                        <EyeIcon v-else />
                                    </button>
                                </div>
                            </template>
                        </LoginInput>
                    </div>
                    <NuxtLink
                        :to="{
                            name: '',
                        }"
                        class="ml-auto text-cl-blue text-size_17/16"
                    >
                        Recover password
                    </NuxtLink>
                </div>

                <div class="">
                    <span class="text-size_17/16 text-cl-gray"> Don’t have an account? </span>
                    <NuxtLink
                        :to="`${$config.public.LANDING_PAGE_URL}/account/sign-up`"
                        :external="true"
                        class="text-cl-blue text-size_17/16"
                        >Sign Up</NuxtLink
                    >
                </div>

                <button
                    type="submit"
                    class="bg-cl-main text-white hover:bg-white hover:text-cl-main border-cl-main border-2 w-46 text-size_20/16 px-6 py-3 rounded-md transition-colors duration-150"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
</template>
