<script lang="ts" setup>
import { useField, useForm, useIsFormDirty } from "vee-validate";
import { object, string } from "yup";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import ModalConfirm from "@/components/core/app/ModalConfirm/Wrapper.vue";
import { useAuthStore } from "@/store/auth";
import { ApiGame } from "@/types/api/game";
import { useGameStore } from "~/store/game";

const { $config } = useNuxtApp();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const gameStore = useGameStore();
const { setGame, setGameId } = gameStore;
const { game, gameId } = storeToRefs(gameStore);

const modalConfirm = ref<any>(null);

const $toast = useToast();

const router = useRouter();

const currentGame = ref<ApiGame | null>(null);

definePageMeta({
    layout: "game",
});

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
        name: string().required("Required field!"),
    }),
});

const isFormDirty = useIsFormDirty();

const { value: name } = useField<string>("name");

const gameList = ref<ApiGame[]>([]);

async function fetchRequests() {
    if (game.value && gameId.value) {
        currentGame.value = {
            id: gameId.value,
            game_name: game.value.game_name,
            project_id: game.value.project_id,
            analytics_ready: game.value.analytics_ready,
            model_ready: game.value.model_ready,
        };
    }
    const response = await $fetch<ApiGame[]>(`${$config.public.BACKEND_URL}/game-list`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${accessToken.value}`,
        },
    });

    gameList.value = response;
}

async function onSubmit() {
    try {
        const errors = await form.validate();
        if (!errors.valid) {
            $toast.error("Entered invalid information!");
            return;
        }

        const formData = new FormData();
        formData.append("game_name", name.value);

        await $fetch<ApiGame>(`${$config.public.BACKEND_URL}/game/create`, {
            method: "POST",
            body: formData,
            headers: {
                authorization: `Bearer ${accessToken.value}`,
            },
        });

        $toast.success("Game created successfully!");

        form.resetForm();

        await fetchRequests();
    } catch (err: any) {
        const res = err.response?._data;
        $toast.error(res?.message);
    }
}

function onSelect(item: ApiGame) {
    if (currentGame.value && currentGame.value.id === item.id) {
        currentGame.value = null;
        return;
    }
    currentGame.value = item;
}

function goToDashboard(item: ApiGame) {
    setGame({
        game_name: item.game_name,
        project_id: item.project_id,
        analytics_ready: item.analytics_ready,
        model_ready: item.model_ready,
    });

    setGameId(item.id);

    router.push({
        name: "analytics",
    });
}

async function onDeleteGame(index: number) {
    const id = gameList.value[index].id;
    const { isSubmit } = await modalConfirm.value.open("Are you really want to delete this game?");

    if (!isSubmit) {
        return;
    }

    await $fetch(`${$config.public.BACKEND_URL}/game/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${accessToken.value}`,
        },
    });

    if (currentGame.value && currentGame.value.id === id) {
        currentGame.value = null;
    }

    gameList.value.splice(index, 1);
    $toast.success("Game deleted successfully!");
}

await fetchRequests();
</script>

<template>
    <div class="w-full min-h-[calc(100vh-5rem)] flex justify-center items-center">
        <div class="flex flex-col items-center gap-y-5 w-145.75 py-10 px-8.5 bg-white rounded-xl">
            <div class="flex flex-col items-center gap-y-3">
                <div class="w-41.5">
                    <img src="@/assets/img/sign-in-logo.png" alt="Datacorda logo" />
                </div>

                <span class="text-[2rem] text-cl-main font-bold">Your games</span>
            </div>

            <form class="w-full flex flex-col gap-y-10 items-center" @submit.prevent="onSubmit">
                <div class="flex flex-col gap-y-2.5 w-full h-full">
                    <div v-for="(item, index) in gameList" :key="index" class="relative w-full">
                        <button
                            type="button"
                            class="flex items-center justify-center w-full h-full py-3 font-bold text-[1.3rem] border rounded-[10px] transition-colors duration-150"
                            :class="{
                                'text-cl-main hover:text-white hover:border-cl-main hover:bg-cl-main':
                                    currentGame?.id !== item.id,
                                'border-cl-main bg-cl-main text-white': currentGame?.id === item.id,
                            }"
                            @click="onSelect(item)"
                        >
                            {{ item.game_name }}
                        </button>

                        <button
                            type="button"
                            class="absolute top-1/2 -translate-y-1/2 right-2.5 w-8.5 text-red-500"
                            @click="onDeleteGame(index)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 37" fill="none">
                                <path
                                    d="M9.99992 29.2917C9.99992 30.9875 11.4999 32.375 13.3333 32.375H26.6666C28.4999 32.375 29.9999 30.9875 29.9999 29.2917V13.875C29.9999 12.1792 28.4999 10.7917 26.6666 10.7917H13.3333C11.4999 10.7917 9.99992 12.1792 9.99992 13.875V29.2917ZM29.9999 6.16667H25.8333L24.6499 5.07208C24.3499 4.79458 23.9166 4.625 23.4833 4.625H16.5166C16.0833 4.625 15.6499 4.79458 15.3499 5.07208L14.1666 6.16667H9.99992C9.08325 6.16667 8.33325 6.86042 8.33325 7.70833C8.33325 8.55625 9.08325 9.25 9.99992 9.25H29.9999C30.9166 9.25 31.6666 8.55625 31.6666 7.70833C31.6666 6.86042 30.9166 6.16667 29.9999 6.16667Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        class="flex items-center border rounded-[10px] w-full"
                        :class="{
                            'border-red-500': form.errors.value.name,
                        }"
                    >
                        <input
                            v-model="name"
                            type="text"
                            placeholder="Create New Game"
                            class="w-full text-[1.3rem] py-3 rounded-l-[10px] text-center text-cl-main font-bold focus:outline-none placeholder:text-center"
                        />

                        <button
                            type="submit"
                            class="bg-cl-main px-4 py-3.5 rounded-r-[10px] ml-auto"
                        >
                            <div class="w-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                >
                                    <g clip-path="url(#clip0_1110_119)">
                                        <path
                                            d="M13.125 25C13.125 25.4973 13.3225 25.9742 13.6742 26.3258C14.0258 26.6775 14.5027 26.875 15 26.875C15.4973 26.875 15.9742 26.6775 16.3258 26.3258C16.6775 25.9742 16.875 25.4973 16.875 25V16.875H25C25.4973 16.875 25.9742 16.6775 26.3258 16.3258C26.6775 15.9742 26.875 15.4973 26.875 15C26.875 14.5027 26.6775 14.0258 26.3258 13.6742C25.9742 13.3225 25.4973 13.125 25 13.125H16.875V5C16.875 4.50272 16.6775 4.02581 16.3258 3.67417C15.9742 3.32254 15.4973 3.125 15 3.125C14.5027 3.125 14.0258 3.32254 13.6742 3.67417C13.3225 4.02581 13.125 4.50272 13.125 5V13.125H5C4.50272 13.125 4.02581 13.3225 3.67417 13.6742C3.32254 14.0258 3.125 14.5027 3.125 15C3.125 15.4973 3.32254 15.9742 3.67417 16.3258C4.02581 16.6775 4.50272 16.875 5 16.875H13.125V25Z"
                                            fill="white"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1110_119">
                                            <rect width="30" height="30" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>

                <button
                    v-if="currentGame"
                    type="button"
                    class="bg-cl-main text-white hover:bg-white hover:text-cl-main border-cl-main border-2 text-size_20/16 px-6 py-3 rounded-md transition-colors duration-150"
                    @click="goToDashboard(currentGame)"
                >
                    Go to Dashboard
                </button>
            </form>
        </div>
        <ModalConfirm ref="modalConfirm" />
    </div>
</template>
