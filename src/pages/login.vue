<script lang="ts" setup>
import { useField, useForm, useIsFormDirty } from "vee-validate";
import { object, string } from "yup";
import { storeToRefs } from "pinia";
import { useToast, TYPE } from "vue-toastification";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import LoginInput from "@/components/pages/Login/Input.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconMessage from "@/components/icons/IconMessage.vue";
import { useAuthStore } from "@/store/auth";
import { AuthUser } from "@/types/api/auth";

definePageMeta({
    layout: "login",
    middleware: [
        function () {
            const authStore = useAuthStore();
            const { accessToken } = storeToRefs(authStore);

            if (accessToken.value) {
                return navigateTo({
                    name: "analytics",
                });
            }
        },
    ],
});

const showPassword = ref(false);

const { $config } = useNuxtApp();

const router = useRouter();

const toast = useToast();

const authStore = useAuthStore();

const { setUser, setAccessToken } = authStore;

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
        password: string().required("Required field!"),
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

        const res = await $fetch<AuthUser>(`${$config.public.BACKEND_URL}/user/signin`, {
            method: "POST",
            body: formData,
        });

        setUser({ id: res.id, username: res.username, email: res.email });

        setAccessToken(res.access_token);

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
                <div class="w-41.5">
                    <img src="@/assets/img/sign-in-logo.png" alt="Datacorda logo" />
                </div>

                <span class="text-cl-gray text-size_17/16">Login to your account</span>
            </div>

            <form class="w-full flex flex-col gap-y-10 items-center" @submit.prevent="onSubmit">
                <div class="w-full flex flex-col gap-y-3">
                    <div class="flex flex-col gap-y-9 -mx-1">
                        <LoginInput
                            v-model="email"
                            name="email"
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
                            name="password"
                            placeholder="Password"
                            :type="showPassword ? 'text' : 'password'"
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

                <form :action="`${$config.public.BACKEND_URL}/user/signin-google`" method="get">
                    <button
                        type="submit"
                        class="flex items-center gap-x-2.5 border rounded-full px-4 py-2.5"
                    >
                        <div class="w-7.5">
                            <svg viewBox="0 0 24 24" fill="none" class="l">
                                <g fill-rule="evenodd" clip-rule="evenodd">
                                    <path
                                        d="M20.64 12.2c0-.63-.06-1.25-.16-1.84H12v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92a8.78 8.78 0 0 0 2.68-6.61z"
                                        fill="#4285F4"
                                    ></path>
                                    <path
                                        d="M12 21a8.6 8.6 0 0 0 5.96-2.18l-2.91-2.26a5.41 5.41 0 0 1-8.09-2.85h-3v2.33A9 9 0 0 0 12 21z"
                                        fill="#34A853"
                                    ></path>
                                    <path
                                        d="M6.96 13.71a5.41 5.41 0 0 1 0-3.42V7.96h-3a9 9 0 0 0 0 8.08l3-2.33z"
                                        fill="#FBBC05"
                                    ></path>
                                    <path
                                        d="M12 6.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 3.96 7.96l3 2.33A5.36 5.36 0 0 1 12 6.6z"
                                        fill="#EA4335"
                                    ></path>
                                </g>
                            </svg>
                        </div>

                        <span class="leading-none text-size_17/16 text-black">
                            Sign in with Google
                        </span>
                    </button>
                </form>

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
