<script lang="ts" setup>
import { useToast } from "vue-toastification";

definePageMeta({
    layout: "account",
});

const route = useRoute();
const $toast = useToast();

onMounted(() => {
    const query = route.query as any;
    $toast.error(query.message);
});
</script>

<template>
    <div class="w-full h-full">
        <div
            class="flex flex-col justify-center items-center gap-y-10 min-h-[calc(100vh-4.875rem)]"
        >
            <div class="flex flex-col items-center gap-y-2.5">
                <h1 class="text-[2.5rem] font-bold">Error:</h1>
                <h2 class="text-[2.5rem] font-bold">
                    {{ $route.query.message }}
                </h2>
            </div>
            <div class="flex items-center gap-x-2.5">
                <NuxtLink
                    :to="{
                        name: 'login',
                    }"
                    class="flex justify-center items-center bg-cl-main text-white hover:bg-white hover:text-cl-main border-cl-main border-2 w-46 text-size_20/16 px-6 py-3 rounded-md transition-colors duration-150"
                >
                    Sign in
                </NuxtLink>
                <NuxtLink
                    :to="`${$config.public.LANDING_PAGE_URL}/account/sign-up`"
                    class="flex justify-center items-center bg-cl-main text-white hover:bg-white hover:text-cl-main border-cl-main border-2 w-46 text-size_20/16 px-6 py-3 rounded-md transition-colors duration-150"
                >
                    Sign up
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
