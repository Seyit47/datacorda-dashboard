<script lang="ts" setup>
import { useToast } from "vue-toastification";
import ConfirmationLoading from "@/components/pages/Confirmation/Loading.vue";
import { useAuthStore } from "@/store/auth";
import { useGameStore } from "@/store/game";

const $toast = useToast();

const gameStore = useGameStore();
const { setGame, setGameId } = gameStore;
const authStore = useAuthStore();
const { setUser, setAccessToken } = authStore;

definePageMeta({
    layout: "account",
});

const route = useRoute();

onMounted(() => {
    setTimeout(() => {
        authenticationHandler();
    }, 1000);
});

async function authenticationHandler() {
    try {
        const query = route.query as any;

        setGame(null);
        setGameId(null);
        setUser(null);
        setAccessToken(null);

        setUser({ id: query.id, username: query.username, email: query.email });

        setAccessToken(query.access_token);

        $toast.success("Authentication successfull!");

        await navigateTo({
            name: "analytics",
        });
    } catch (err: any) {
        $toast.error("Authentication failed!");
        await navigateTo({
            name: "analytics",
        });
    }
}
</script>

<template>
    <div class="w-full h-full">
        <div
            class="flex flex-col justify-center items-center gap-y-10 w-full min-h-[calc(100vh-4.875rem)]"
        >
            <h2 class="text-[2.5rem] font-bold">Please wait...</h2>
            <div class="w-20">
                <div class="relative pt-[100%]">
                    <div class="absolute top-0 left-0 w-full h-full">
                        <ConfirmationLoading />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
