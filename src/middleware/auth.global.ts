import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import { useGameStore } from "~/store/game";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const gameStore = useGameStore();

    const { accessToken } = storeToRefs(authStore);
    const { gameId } = storeToRefs(gameStore);

    if (
        to.name === "login" ||
        to.name === "account-confirmation" ||
        to.name === "account-confirmation-error" ||
        accessToken.value
    ) {
        if (accessToken.value && !gameId.value && to.name !== "games") {
            return navigateTo({
                name: "games",
                replace: true,
            });
        }
        return;
    }

    return navigateTo({
        name: "login",
        replace: true,
    });
});
