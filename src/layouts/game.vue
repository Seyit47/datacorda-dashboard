<script setup>
import { useAuthStore } from "@/store/auth";
import { useGameStore } from "@/store/game";

const authStore = useAuthStore();
const { setUser, setAccessToken } = authStore;
const gameStore = useGameStore();
const { setGame, setGameId } = gameStore;

async function logout() {
    setUser(null);
    setAccessToken(null);
    setGame(null);
    setGameId(null);

    await navigateTo({
        name: "login",
        replace: true,
    });
}
</script>

<template>
    <div class="relative w-full min-h-screen">
        <header class="flex items-center w-full h-19.5 p-4.75">
            <div class="w-51">
                <NuxtLink :to="`${$config.public.LANDING_PAGE_URL}`" :external="true">
                    <img src="@/assets/img/datacorda-logo-black.png" alt="Datacorda logo" />
                </NuxtLink>
            </div>

            <div class="ml-auto">
                <button
                    class="w-51 bg-cl-main text-white rounded-full py-3 border text-[1.2rem] border-cl-main hover:bg-white hover:text-cl-main transition-colors duration-150"
                    @click="logout"
                >
                    Log out
                </button>
            </div>
        </header>
        <main class="h-full bg-cl-default">
            <slot />
        </main>
    </div>
</template>
