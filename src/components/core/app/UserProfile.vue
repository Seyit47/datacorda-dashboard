<script lang="ts" setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { PuzzlePieceIcon } from "@heroicons/vue/20/solid";
import IconLogout from "@/components/icons/IconLogout.vue";
import { useAuthStore } from "@/store/auth";
import { useGameStore } from "@/store/game";

const router = useRouter();

const authStore = useAuthStore();
const { setUser, setAccessToken } = authStore;
const { user } = storeToRefs(authStore);
const gameStore = useGameStore();
const { setGame, setGameId } = gameStore;
const { game } = storeToRefs(gameStore);

function logout() {
    setUser(null);
    setAccessToken(null);
    setGame(null);
    setGameId(null);

    router.push({
        name: "login",
        replace: true,
    });
}
</script>

<template>
    <div class="relative">
        <Popover v-slot="{ open }">
            <PopoverButton
                :class="open ? '' : 'text-opacity-90'"
                class="min-w-16 px-3.75 py-4 rounded-[20px] bg-cl-main hover:text-cl-main hover:bg-white border border-cl-main text-[1.2rem] text-white font-bold uppercase"
            >
                <span v-if="user"
                    >{{ user.username.slice(0, 1) }}{{ user.username.slice(-1) }}</span
                >
            </PopoverButton>

            <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-1 opacity-0"
            >
                <PopoverPanel class="absolute top-full right-0 z-[9999] bg-white">
                    <div
                        class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4"
                    >
                        <div class="bg-gray-50 rounded-lg whitespace-nowrap">
                            <button
                                v-if="game"
                                class="flow-root rounded-md p-4 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                                <span class="flex items-center">
                                    <span class="text-[1.2rem] font-bold text-cl-main">
                                        Game: {{ game.game_name }}
                                    </span>
                                </span>
                                <span v-if="game.project_id" class="block text-sm text-gray-500">
                                    Project id: {{ game.project_id }}
                                </span>
                            </button>
                        </div>
                        <div class="flex flex-col whitespace-nowrap">
                            <NuxtLink
                                :to="{
                                    name: 'games',
                                }"
                                class="flex items-center p-4 rounded-lg transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                                <div class="w-6 text-cl-main">
                                    <PuzzlePieceIcon />
                                </div>
                                <div class="ml-4">
                                    <p class="text-[1rem] font-medium text-gray-900">Games</p>
                                </div>
                            </NuxtLink>
                            <button
                                class="flex items-center p-4 rounded-lg transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                @click="logout"
                            >
                                <div class="w-6 text-cl-main">
                                    <IconLogout />
                                </div>
                                <div class="ml-4">
                                    <p class="text-[1rem] font-medium text-gray-900">Log out</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </PopoverPanel>
            </transition>
        </Popover>
    </div>
</template>
